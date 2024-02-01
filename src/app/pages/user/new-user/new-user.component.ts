import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/dto/role';
import { UserDto } from 'src/app/dto/user-dto';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ImageService } from 'src/app/services/image/image.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  password: string = '';
  showPassword: boolean = false;

  utilisateurDto: UserDto = {};
  errorMsg = '';
  editing: Boolean = false;

  file: File | null = null;
  imageUrl: string | ArrayBuffer = 'assets/userImg.jpg';

  roleValues: Array<Role>= [Role.USER, Role.ADMIN];
  role: Role | undefined = undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private imageService: ImageService,
    private authService: AuthenticationService
    ){}

  ngOnInit(): void {
    this.editing = false;
    const idUtilisateur = this.activatedRoute.snapshot.params['idUtilisateur'];
    if(idUtilisateur){
      this.editing = true;
      this.userService.findUserById(idUtilisateur).subscribe(
        user => {
          this.utilisateurDto = user;
          if(this.utilisateurDto.image){
            this.imageUrl = this.utilisateurDto.image;
          }
          this.role = user.role;
        }
      )
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  selectFileImg(files: FileList | null): void {
    if(files){
      this.file = files.item(0);
      console.log('myFile', this.file);
      if(this.file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if(fileReader.result){
            this.imageUrl = fileReader.result;
            console.log('imgUrl', this.imageUrl);
          }
        };
      }
    }
  }

  enregistrerImage(idUtilisateur?: number, titre?: string): void{
    if(idUtilisateur && this.file && titre){
      const id = idUtilisateur;
      const context = 'user'
      console.log('this.file',this.file)

      this.imageService.uploadImage(id,titre,context,this.file).subscribe(
        result => {
          this.router.navigate(['utilisateurs']);
        }
      );

    } else{
      this.router.navigate(['utilisateurs']);
    }
  }

  cancelClick(): void {
    this.router.navigate(['utilisateurs']);
  }

  /*saveClick(): void {
    this.utilisateurDto.role = this.role;
    this.authService.register(this.utilisateurDto).subscribe({
      next: (authResp) => {
        this.findRegistredUser();
      }, error: (error) => {
        this.errorMsg = 'Verifier les données de cet utilisateur';
      }
    });
  }*/

  saveClick(): void {
    this.utilisateurDto.role = this.role;
    this.userService.createUser(this.utilisateurDto).subscribe({
      next: (res) => {
        this.enregistrerImage(res.id, res.nom);
      }, error: (error) => {
        this.errorMsg = 'Verifier les données de cet utilisateur';
      }
    });
    /*this.userService.findUserByEmail(this.utilisateurDto.email!).subscribe(
      res => {
        if(res){
          this.userService.updateUser(res.id!, this.utilisateurDto);
          this.enregistrerImage(res.id, res.nom);
        }else{
          this.userService.createUser(this.utilisateurDto).subscribe({
            next: (res) => {
              this.enregistrerImage(res.id, res.nom);
            }, error: (error) => {
              this.errorMsg = 'Verifier les données de cet utilisateur';
            }
          });
        }
      }
    )*/
  }

  findRegistredUser(): void{
    this.userService.findUserByEmail(this.utilisateurDto.email!).subscribe(
      user => {
        this.enregistrerImage(user.id, user.nom);
      }
    )
  }
}
