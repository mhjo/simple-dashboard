import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProdStatus } from '../product.model';
import { DataStoreService } from '../../shared/data-store.service';
import { Observable, zip } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<Product> {

  constructor(
    private database: DataStoreService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const objectSnapshot$ = this.database.findObject$<Product>('product', route.params['no']).snapshotChanges().pipe(
      take(1),
      map(action => action.payload.val()),
    );

    const usedCat$ = this.database.findLists$ByQuery('category', 'isUse', true).snapshotChanges().pipe(
      take(1),
      map(actions => actions.map(action => action.payload.val())),
    );

    const a = route.queryParams['action'];
    if (a === 'create') {
      return usedCat$.pipe(map(cats => [new Product(0, ProdStatus.WAIT_FOR_SALE), cats]));
    }

    return zip(objectSnapshot$, usedCat$).pipe(
      map(data => {
        if (data[0] === null) {
          this.router.navigate(['/product-list']);
          return null;
        }
        return data;
      })
    );
  }
}
