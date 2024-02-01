import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDto } from 'src/app/dto/change-password-dto';
import { ClientDto } from 'src/app/dto/client-dto';
import { FournisseurDto } from 'src/app/dto/fournisseur-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientFournisseurService {

  private apiUrlClient = 'http://localhost:3000/client';
  private apiUrlFournisseur = 'http://localhost:3000/fournisseur';

  constructor(private http: HttpClient) {}

  createClient(client: ClientDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(`${this.apiUrlClient}/create`, client);
  }

  findAllClient(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.apiUrlClient}/all`);
  }

  findOneClient(id: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrlClient}/find/${id}`);
  }

  findByEmailClient(email: string): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrlClient}/find/email/${email}`);
  }

  updateClient(id: number, updateClientDto: ClientDto): Observable<ClientDto> {
    return this.http.patch<ClientDto>(`${this.apiUrlClient}/update/${id}`, updateClientDto);
  }

  removeClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlClient}/delete/${id}`);
  }

  getTopSpendingClients(startDate?: Date, endDate?: Date): Observable<ClientDto[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.http.get<ClientDto[]>(`${this.apiUrlClient}/top-spending`, { params });
  }

  changePasswordClient(changePasswordDto: ChangePasswordDto): Observable<ClientDto> {
    return this.http.post<ClientDto>(`${this.apiUrlClient}/change-password`, changePasswordDto);
  }

  createFournisseur(fournisseur: FournisseurDto): Observable<FournisseurDto> {
    return this.http.post<FournisseurDto>(`${this.apiUrlFournisseur}/create`, fournisseur);
  }

  findAllFournisseur(): Observable<FournisseurDto[]> {
    return this.http.get<FournisseurDto[]>(`${this.apiUrlFournisseur}/find`);
  }

  findOneFournisseur(id: number): Observable<FournisseurDto> {
    return this.http.get<FournisseurDto>(`${this.apiUrlFournisseur}/find/${id}`);
  }

  updateFournisseur(id: number, updateFournisseurDto: FournisseurDto): Observable<FournisseurDto> {
    return this.http.patch<FournisseurDto>(`${this.apiUrlFournisseur}/update/${id}`, updateFournisseurDto);
  }

  removeFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlFournisseur}/delete/${id}`);
  }
}
