import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ScmMainModule } from './scm-main/scm-main.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { CustomToastOptions } from './custom-toast-options';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* Angular Modules */
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /* App Modules */
    ScmMainModule,
    ProductModule,
    CategoryModule,
    AppRoutingModule,
    SharedModule,
    /* 3rd Module */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    NgbPaginationModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
