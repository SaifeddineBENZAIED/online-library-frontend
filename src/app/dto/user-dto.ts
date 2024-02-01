import { Role } from "./role";
import { TokenDto } from "./token-dto";

export class UserDto {
    id?: number;
    nom?: string;
    prenom?: string;
    adresse?: string;
    image?: string;
    email?: string;
    numTelephone?: string;
    dateNaissance?: Date;
    motDePasse?: string;
    role?: Role;
    tokens?: TokenDto[];
}