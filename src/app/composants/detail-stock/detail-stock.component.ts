import { Component, Input } from '@angular/core';
import { StockDto } from 'src/app/dto/stock-dto';

@Component({
  selector: 'app-detail-stock',
  templateUrl: './detail-stock.component.html',
  styleUrls: ['./detail-stock.component.scss']
})
export class DetailStockComponent {
  mvmntNegIcon = 'minus';
  mvmntPosIcon = 'plus';

  @Input()
  stock: StockDto = {};
}
