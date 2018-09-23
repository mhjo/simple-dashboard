import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryDetailResolverService } from './category-detail/category-detail-resolver.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: 'category-list', children: [
    { path: '', pathMatch: 'full', component: CategoryManagementComponent },
    { path: 'category/:no', resolve: {category: CategoryDetailResolverService}, component: CategoryDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CategoryDetailResolverService]
})
export class CategoryRoutingModule {}
