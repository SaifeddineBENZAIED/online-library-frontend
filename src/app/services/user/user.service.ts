import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from 'src/app/dto/change-password-dto';
import { UserDto } from 'src/app/dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  createUser(createUserDto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/create`, createUserDto);
  }

  findAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/find/all`);
  }

  findUserById(id: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/find/${id}`);
  }

  findUserByEmail(email: string): Observable<UserDto> {
    return this.http.get<any>(`${this.apiUrl}/findByEmail/${email}`);
  }

  updateUser(id: number, updateUserDto: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/update/${id}`, updateUserDto);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  changePassword(changePasswordDto: ChangePasswordDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/change-password`, changePasswordDto);
  }

}
