import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-management/product-list/product-list.component';
import { ButtonGroupComponent } from './product-management/button-group/button-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckedProductSetService } from './product-management/checked-product-set.service';
import { ProductBulkUpdaterService } from './product-management/product-bulk-updater.service';
import { PROD_LIST_PAGE_SIZE } from './product.tokens';

@NgModule({
  declarations: [
    ProductManagementComponent,
    ProductDetailComponent,
    ProductListComponent,
    ButtonGroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    ProductRoutingModule,
  ],
  exports: [],
  providers: [
    CheckedProductSetService,
    ProductBulkUpdaterService,
    {provide: PROD_LIST_PAGE_SIZE, useValue: 6},
  ]
})
export class ProductModule { }
