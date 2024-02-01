import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserPaginationService {

  usersSerie: Array<UserDto> = [];

  private listUserSubject = new BehaviorSubject<UserDto[]>([]);
  listUser$ = this.listUserSubject.asObservable();

  private paginatedUsersSubject = new BehaviorSubject<UserDto[]>([]);
  paginatedUsers$ = this.paginatedUsersSubject.asObservable();

  private itemsPerPage: number = 5;

  constructor() {}

  setListUser(list: UserDto[]): void {
    this.listUserSubject.next(list);
    this.paginatedUsersSubject.next(this.getPaginatedUsers(1));
  }

  getPaginatedUsers(pageNumber: number): UserDto[] {
    const startIndex = (pageNumber - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.usersSerie = this.listUserSubject.value.slice(startIndex, endIndex);
    return this.listUserSubject.value.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.paginatedUsersSubject.next(this.getPaginatedUsers(pageNumber));
  }
}
