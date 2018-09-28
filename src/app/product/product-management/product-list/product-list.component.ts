import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Products, Product } from '../../product.model';
import { ActivatedRoute } from '@angular/router';
import { CheckedProductSetService } from '../checked-product-set.service';
import { DataStoreService } from '../../../shared/data-store.service';
import { PROD_LIST_PAGE_SIZE } from '../../product.tokens';
import { range } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'scm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() totalItemCnt: number = 0;
  pageNo: number = 1;
  pageSize: number;
  products: Products;
  checkedStatus: boolean[];

  constructor(
    private route: ActivatedRoute,
    private prodSet: CheckedProductSetService,
    private database: DataStoreService,
    @Inject(PROD_LIST_PAGE_SIZE) pageSize: number) {
      this.pageSize = pageSize;
    }

  ngOnInit() {
    this.fetchResolvedData();
    this.initCheckedProducts();
  }

  ngOnDestroy() {
    this.prodSet.initProdNos();
  }

  pageNoChanged(pageNo) {
    this.pageNo = pageNo;
    this.initCheckedProducts();
    this.getPagedList();
  }

  pageSizeChanged(pageSize) {
    this.pageSize = +pageSize;
    this.initCheckedProducts();
    this.getPagedList();
  }

  toggleAllItem() {
    if (this.isCheckedAnyOne()) {
      this.prodSet.initProdNos();
    } else {
      this.products.map(p => p.no).forEach(no => this.prodSet.addNo(no));
    }
    this.setAllProductsCheckedStatusTo(!this.isCheckedAnyOne());
  }

  checkProduct(isChecked: boolean, idx: number, no: number) {
    this.checkedStatus[idx] = isChecked;

    if (this.checkedStatus[idx]) {
      this.prodSet.addNo(no);
    } else {
      this.prodSet.removeNo(no);
    }
  }

  isCheckedAnyOne() {
    return this.checkedStatus.reduce((acc, cur) => cur || acc, false);
  }

  getPagedList() {
    this.database.findLists$ByPage<Product>('product', this.pageNo, this.pageSize, this.totalItemCnt).pipe(
      map(actions => actions.map(action => action.payload.val())),
      tap((list: Products) => list.sort((p1, p2) => p2.no - p1.no)),
    ).subscribe(list => this.products = list);
  }

  private fetchResolvedData() {
    const resolvedData = <{list: Products}>this.route.snapshot.data;
    this.products = resolvedData.list;
  }

  private initCheckedProducts() {
    this.prodSet.initProdNos();
    this.setAllProductsCheckedStatusTo(false);
  }

  private setAllProductsCheckedStatusTo(v: boolean) {
    this.checkedStatus = [];
    const curItem = this.pageSize > this.totalItemCnt ? this.totalItemCnt : this.pageSize;
    range(0, curItem).subscribe(i => this.checkedStatus[i] = v);
  }
}
