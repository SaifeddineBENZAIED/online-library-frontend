import { ArticleDto } from "./article-dto";
import { CommandeFournisseurDto } from "./commande-fournisseur-dto";

export class LigneCommandeFournisseurDto {
    id?: number;
    article?: ArticleDto;
    commandeFournisseur?: CommandeFournisseurDto;
    quantite?: number;
    prixUnitaire?: number;
}