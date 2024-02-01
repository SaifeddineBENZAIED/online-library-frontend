import { LigneCommandeClientDto } from "./ligne-commande-client-dto";
import { LigneCommandeFournisseurDto } from "./ligne-commande-fournisseur-dto";
import { StockDto } from "./stock-dto";
import { TypeArticle } from "./type-article";

export class ArticleDto {
    id?: number;
    nomArticle?: string;
    codeArticle?: string;
    description?: string;
    prixUnitaireHT?: number;
    tauxTVA?: number;
    prixUnitaireTTC?: number;
    type?: TypeArticle;
    image?: string;
    ligneCommandeClients?: LigneCommandeClientDto[];
    ligneCommandeFournisseurs?: LigneCommandeFournisseurDto[];
    stock?: StockDto[];
}
  