import { ArticleDto } from "./article-dto";
import { SourceMvmntStock } from "./source-mvmnt-stock";
import { TypeMvmntStock } from "./type-mvmnt-stock";

export class StockDto {
    id?: number;
    dateMvmnt?: Date;
    quantite?: number;
    article?: ArticleDto;
    typeMvmntStck?: TypeMvmntStock;
    sourceMvmntStck?: SourceMvmntStock;
}