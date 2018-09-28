import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';

const CORE_COMPONENTS = [NavbarComponent, SidebarComponent, FooterComponent, MainDashboardComponent, PageNotFoundComponent];

@NgModule({
  declarations: CORE_COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule,
  ],
  exports: CORE_COMPONENTS
})
export class ScmMainModule { }
