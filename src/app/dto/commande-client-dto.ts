import { ClientDto } from "./client-dto";
import { EtatCommande } from "./etat-commande";
import { LigneCommandeClientDto } from "./ligne-commande-client-dto";

export class CommandeClientDto {
    id?: number;
    codeCC?: string;
    dateCommande?: Date;
    etatCommande?: EtatCommande;
    client?: ClientDto;
    ligneCommandeClients?: LigneCommandeClientDto[];
}