import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/dto/user-dto';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  @Input()
  utilisateur: UserDto = {};

  adr2 = '';

  @Output()
  suppressionEvent = new EventEmitter();

  errorMsg = 'Impossible de supprimer cet utilisateur !!';
  
  constructor(private router: Router, private userService: UserService){

  }
  
  ngOnInit(): void {
  }

  modifierClient(): void {
    this.router.navigate(['nouveauutilisateur', this.utilisateur.id]);
  }

  confSuppressionUtilisateur(): void {
    if(this.utilisateur.id){
      this.userService.deleteUser(this.utilisateur.id).subscribe({
        next: (result) => {
          this.suppressionEvent.emit('success')
        }, error: (error) => {
          this.suppressionEvent.emit(this.errorMsg);
        }
      });
    }
  }
}
