import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScmMainModule } from './scm-main/scm-main.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* Angular Modules */
    BrowserModule,
    /* App Modules */
    ScmMainModule,
    ProductModule,
    CategoryModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
