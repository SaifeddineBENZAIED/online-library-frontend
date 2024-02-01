import { CommandeClientDto } from "./commande-client-dto";
import { TokenDto } from "./token-dto";

export class ClientDto {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    email?: string;
    numTelephone?: string;
    motDePasse?: string;
    tokens?: TokenDto[];
    image?: string;
    commandes?: CommandeClientDto[];
}