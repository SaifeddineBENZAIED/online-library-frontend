import { ArticleDto } from "./article-dto";
import { CommandeClientDto } from "./commande-client-dto";

export class LigneCommandeClientDto {
    id?: number;
    article?: ArticleDto;
    commandeClient?: CommandeClientDto;
    quantite?: number;
    prixUnitaire?: number;
}