import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/dto/user-dto';
import { UserPaginationService } from 'src/app/services/user-pagination/user-pagination.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {

  listUtilisateurs: Array<UserDto> = [];

  errorMsg = '';
  paginatedUsers: Array<UserDto> = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  constructor(private router: Router , private userService: UserService, private userPaginationService: UserPaginationService){
    
  }

  ngOnInit(): void{
    this.findAllUtilisateurs();
  }

  findAllUtilisateurs(): void{
    this.userService.findAllUsers().subscribe(
      list => {
        this.listUtilisateurs = list;
        this.userPaginationService.setListUser(list);
        this.paginatedUsers = this.userPaginationService.getPaginatedUsers(this.currentPage);
      }
    )
  }

  handleSuppression(event: any): void {
    if(event === 'success'){
      this.findAllUtilisateurs();
    }else{
      this.errorMsg = event;
    }
  }

  nouveauUtilisateur(): void {
    this.router.navigate(['nouveauutilisateur']);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.userPaginationService.onPageChange(pageNumber);
    this.paginatedUsers = this.userPaginationService.getPaginatedUsers(pageNumber);
  }
}
