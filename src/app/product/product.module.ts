import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductManagementComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  exports: []
})
export class ProductModule { }
