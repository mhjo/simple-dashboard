import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase';
import { DataStoreService } from '../../shared/data-store.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from '../../product/product.model';

@Component({
  selector: 'scm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appTitle = '상품관리 시스템';
  session$: Observable<boolean>;
  sessionBtnName = '로그인';

  constructor(
    private database: DataStoreService,
    private toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {
    this.session$ = this.afAuth.authState.pipe(
      map(user => !!user)
    );
    this.session$.subscribe(auth => this.sessionBtnName = auth ? '로그아웃' : '로그인');
  }

  checkSession() {
    this.session$.pipe(
      take(1)
    ).subscribe(s => s ? this.afAuth.auth.signOut() : this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  searchProduct(no: number) {
    console.log(`search: ${no}`);
    this.database.findObject$<Product>('product', no).valueChanges().subscribe(obj => {
      if (obj) {
        this.router.navigate(['product-list', 'product', no], { queryParams: { 'action': 'edit' } });
      } else {
        this.toastr.warning('상품 정보가 없습니다.');
      }
    });
  }
}
