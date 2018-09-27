import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { NoCounterService } from '../../shared/no-counter.service';
import { ProductBulkUpdaterService } from './product-bulk-updater.service';
import { ToastrService } from 'ngx-toastr';
import { PROD_LIST_PAGE_SIZE } from '../product.tokens';

@Component({
  selector: 'scm-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  totalItemCnt = 0;
  pageNo = 1;
  pageSize: number;
  clickedHandler: {sell: () => void, stop: () => void};
  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;

  constructor(
    private counter: NoCounterService,
    private productBulkUpdater: ProductBulkUpdaterService,
    private toastr: ToastrService,
    @Inject(PROD_LIST_PAGE_SIZE) pageSize: number
  ) {
    this.pageSize = pageSize;
  }

  ngOnInit() {
    this.counter.get('product').subscribe(cnt => this.totalItemCnt = cnt);
    this.setBtnClickHandler();
  }

  private setBtnClickHandler() {
    const clickedSell = () => {};
  }

}
