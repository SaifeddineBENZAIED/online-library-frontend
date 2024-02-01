import { EtatCommande } from "./etat-commande";
import { FournisseurDto } from "./fournisseur-dto";
import { LigneCommandeFournisseurDto } from "./ligne-commande-fournisseur-dto";

export class CommandeFournisseurDto {
    id?: number;
    codeCF?: string;
    dateCommande?: Date;
    etatCommande?: EtatCommande;
    fournisseur?: FournisseurDto;
    ligneCommandeFournisseurs?: LigneCommandeFournisseurDto[];
}