import { CommandeFournisseurDto } from "./commande-fournisseur-dto";

export class FournisseurDto {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    email?: string;
    numTelephone?: string;
    image?: string;
    commandes?: CommandeFournisseurDto[];
}