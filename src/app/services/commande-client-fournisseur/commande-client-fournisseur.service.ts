import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientDto } from 'src/app/dto/client-dto';
import { CommandeClientDto } from 'src/app/dto/commande-client-dto';
import { CommandeFournisseurDto } from 'src/app/dto/commande-fournisseur-dto';
import { EtatCommande } from 'src/app/dto/etat-commande';
import { LigneCommandeClientDto } from 'src/app/dto/ligne-commande-client-dto';
import { LigneCommandeFournisseurDto } from 'src/app/dto/ligne-commande-fournisseur-dto';

@Injectable({
  providedIn: 'root'
})
export class CommandeClientFournisseurService {

  private apiUrlCC = 'http://localhost:3000/commande-client';
  private apiUrlCF = 'http://localhost:3000/commande-fournisseur';

  constructor(private http: HttpClient) {}


  createCC(commandeClientDto: CommandeClientDto): Observable<CommandeClientDto> {
    return this.http.post<CommandeClientDto>(`${this.apiUrlCC}/create`, commandeClientDto);
  }

  updateEtatCommandeCC(idCommande: number, etatCommande: EtatCommande): Observable<CommandeClientDto> {
    return this.http.put<CommandeClientDto>(`${this.apiUrlCC}/${idCommande}/update-etat`, { etatCommande });
  }

  updateQuantiteCommandeCC(idCommande: number, idLigneCommande: number, quantite: number): Observable<CommandeClientDto> {
    return this.http.put<CommandeClientDto>(`${this.apiUrlCC}/${idCommande}/update-quantite/${idLigneCommande}`, { quantite });
  }

  updateClientCC(idCommande: number, idClient: number): Observable<CommandeClientDto> {
    return this.http.put<CommandeClientDto>(`${this.apiUrlCC}/${idCommande}/update-client/${idClient}`, {});
  }

  updateArticleCC(idCommande: number, idLigneCommande: number, newIdArticle: number): Observable<CommandeClientDto> {
    return this.http.put<CommandeClientDto>(`${this.apiUrlCC}/${idCommande}/update-article/${idLigneCommande}`, { newIdArticle });
  }

  deleteArticleCC(idCommande: number, idLigneCommande: number): Observable<CommandeClientDto> {
    return this.http.delete<CommandeClientDto>(`${this.apiUrlCC}/${idCommande}/delete-article/${idLigneCommande}`);
  }

  findOneCC(id: number): Observable<CommandeClientDto> {
    return this.http.get<CommandeClientDto>(`${this.apiUrlCC}/find/${id}`);
  }

  findOneCCByCode(code: string): Observable<CommandeClientDto> {
    return this.http.get<CommandeClientDto>(`${this.apiUrlCC}/findByCode/${code}`);
  }

  findAllCC(): Observable<CommandeClientDto[]> {
    return this.http.get<CommandeClientDto[]>(`${this.apiUrlCC}/all`);
  }

  findAllCCByClientId(clientId: number): Observable<CommandeClientDto[]> {
    return this.http.get<CommandeClientDto[]>(`${this.apiUrlCC}/by-client/${clientId}`);
  }

  findAllLignesCC(id: number): Observable<LigneCommandeClientDto[]> {
    return this.http.get<LigneCommandeClientDto[]>(`${this.apiUrlCC}/all-lignes-commande/${id}`);
  }

  deleteCC(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlCC}/delete/${id}`);
  }

  generateCodeCC(nom: string, prenom: string): Observable<string> {
    return this.http.get<{code: string}>(`${this.apiUrlCC}/randomCode/${nom}/${prenom}`).pipe(
      map(response => response.code)
    );
  }

  updateCommandeClient(commandeClientDto: CommandeClientDto): Observable<CommandeClientDto> {
    return this.http.patch<CommandeClientDto>(`${this.apiUrlCC}/update`, commandeClientDto);
  }

  createCF(commandeFournisseurDto: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.http.post<CommandeFournisseurDto>(`${this.apiUrlCF}/create`, commandeFournisseurDto);
  }

  updateEtatCommandeCF(id: number, etatCommande: EtatCommande): Observable<CommandeFournisseurDto> {
    return this.http.put<CommandeFournisseurDto>(`${this.apiUrlCF}/${id}/update-etat`, { etatCommande });
  }

  updateQuantiteCommandeCF(idCommande: number, idLigneCommande: number, quantite: number): Observable<CommandeFournisseurDto> {
    return this.http.put<CommandeFournisseurDto>(`${this.apiUrlCF}/${idCommande}/update-quantite/${idLigneCommande}`, { quantite });
  }

  updateFournisseurCF(idCommande: number, idFournisseur: number): Observable<CommandeFournisseurDto> {
    return this.http.put<CommandeFournisseurDto>(`${this.apiUrlCF}/${idCommande}/update-fournisseur/${idFournisseur}`, {});
  }

  updateArticleCF(idCommande: number, idLigneCommande: number, newIdArticle: number): Observable<CommandeFournisseurDto> {
    return this.http.put<CommandeFournisseurDto>(`${this.apiUrlCF}/${idCommande}/update-article/${idLigneCommande}`, { newIdArticle });
  }

  deleteArticleCF(idCommande: number, idLigneCommande: number): Observable<CommandeFournisseurDto> {
    return this.http.delete<CommandeFournisseurDto>(`${this.apiUrlCF}/${idCommande}/delete-article/${idLigneCommande}`);
  }

  findByIdCF(id: number): Observable<CommandeFournisseurDto> {
    return this.http.get<any>(`${this.apiUrlCF}/find/${id}`);
  }

  findOneCFByCode(code: string): Observable<CommandeFournisseurDto> {
    return this.http.get<CommandeFournisseurDto>(`${this.apiUrlCF}/findByCode/${code}`);
  }

  findAllCF(): Observable<CommandeFournisseurDto[]> {
    return this.http.get<CommandeFournisseurDto[]>(`${this.apiUrlCF}/all`);
  }

  findAllCFByFournisseurId(fournisseurId: number): Observable<CommandeFournisseurDto[]> {
    return this.http.get<CommandeFournisseurDto[]>(`${this.apiUrlCF}/by-fournisseur/${fournisseurId}`);
  }

  findAllLignesCF(id: number): Observable<LigneCommandeFournisseurDto[]> {
    return this.http.get<LigneCommandeFournisseurDto[]>(`${this.apiUrlCF}/all-lignes-commande/${id}`);
  }

  deleteCF(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlCF}/delete/${id}`);
  }

  generateCodeCF(nom: string, prenom: string): Observable<string> {
    return this.http.get<{code: string}>(`${this.apiUrlCF}/randomCode/${nom}/${prenom}`).pipe(
      map(response => response.code)
    );
  }

  updateCommandeFournisseur(commandeFournisseurDto: CommandeFournisseurDto): Observable<CommandeFournisseurDto> {
    return this.http.put<CommandeFournisseurDto>(`${this.apiUrlCF}/update`, commandeFournisseurDto);
  }
}
