import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDto } from 'src/app/dto/client-dto';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';
import { ClientFournisseurService } from 'src/app/services/client-fournisseur/client-fournisseur.service';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-nouveau-client-fournisseur',
  templateUrl: './nouveau-client-fournisseur.component.html',
  styleUrls: ['./nouveau-client-fournisseur.component.scss']
})
export class NouveauClientFournisseurComponent implements OnInit {

  origin = '';

  file: File | null = null;
  imageUrl: string | ArrayBuffer = '';

  clientOrFournisseur: any = {};

  errorMsg = '';

  password: string = '';
  showPassword: boolean = false;

  editing: Boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private clientFournisseurService: ClientFournisseurService, private imageService: ImageService){

  }

  ngOnInit(): void{
    this.editing = false;
    this.activatedRoute.data.subscribe(data => {
      this.origin = data['origin'];
      this.imageUrl = 'assets/' + this.origin + 'Img.png';
    });
    this.findClientFournisseur();
  }

  findClientFournisseur(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if(id){
      this.editing = true;
      if(this.origin === 'client'){
        this.clientFournisseurService.findOneClient(id).subscribe(
          client => {
            this.clientOrFournisseur = client;
            if(this.clientOrFournisseur.image){
              this.imageUrl = this.clientOrFournisseur.image;
            }
          }
        );
      }else if(this.origin === 'fournisseur'){
        this.clientFournisseurService.findOneFournisseur(id).subscribe(
          fournisseur => {
            this.clientOrFournisseur = fournisseur;
            if(this.clientOrFournisseur.image){
              this.imageUrl = this.clientOrFournisseur.image;
            }
          }
        );
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  cancelClick(): void {
    if(this.origin === 'client'){
      this.router.navigate(['clients']);
    }else if(this.origin === 'fournisseur'){
      this.router.navigate(['fournisseurs']);
    }
  }

  selectFileImg(files: FileList | null): void {
    if(files){
      this.file = files.item(0);
      if(this.file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if(fileReader.result){
            this.imageUrl = fileReader.result;
          }
        };
      }
    }
  }

  enregistrerImage(id?: number, titre?: string): void{
    
      if(this.origin === 'client'){
        if(id && this.file && titre){
          const contextC = 'client';
          /*const formDataC = new FormData();
          formDataC.append('file', this.file);*/
  
          this.imageService.uploadImage(id,titre,contextC,this.file).subscribe(
            result => {
              this.router.navigate(['clients']);
            }
          );
        } else{
          this.router.navigate(['clients']);
        }
      
      }else if(this.origin === 'fournisseur'){
        if(id && this.file && titre){
          const contextF = 'fournisseur';
          /*const formDataF = new FormData();
          formDataF.append('file', this.file);*/
  
          this.imageService.uploadImage(id,titre,contextF,this.file).subscribe(
            result => {
              this.router.navigate(['fournisseurs']);
            }
          );
        } else{
          this.router.navigate(['fournisseurs']);
        }
      }

  }

  saveClick(): void {
    if(this.origin === 'client'){
      this.clientFournisseurService.createClient(this.mapToClient()).subscribe({
        next: (client) => {
          this.enregistrerImage(client.id, client.nom);
        }, error: (error) => {
          this.errorMsg = 'Verifier les données de ce client';
        }
      });
    }else if(this.origin === 'fournisseur'){
      this.clientFournisseurService.createFournisseur(this.mapToFournisseur()).subscribe({
        next: (fournisseur) => {
          this.enregistrerImage(fournisseur.id, fournisseur.nom);
        }, error: (error) => {
          this.errorMsg = 'Verifier les données de ce fournisseur';
        }
      });
    }
  }

  mapToClient(): ClientDto{
    const clientDto: ClientDto = this.clientOrFournisseur;
    return clientDto;
  }

  mapToFournisseur(): FournisseurDto{
    const fournisseurDto: FournisseurDto = this.clientOrFournisseur;
    return fournisseurDto;
  }
}
