import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryItemComponent } from './category-management/category-item/category-item.component';

@NgModule({
  declarations: [CategoryManagementComponent, CategoryDetailComponent, CategoryItemComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule
  ],
  exports: []
})
export class CategoryModule { }
