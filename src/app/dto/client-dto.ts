import { CommandeClientDto } from "./commande-client-dto";
import { Role } from "./role";
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
    role?: Role;
    image?: string;
    commandes?: CommandeClientDto[];
}