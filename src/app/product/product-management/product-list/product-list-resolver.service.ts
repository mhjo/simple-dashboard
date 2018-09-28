import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStoreService } from '../../../shared/data-store.service';
import { PROD_LIST_PAGE_SIZE } from '../../product.tokens';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { Product, Products } from '../../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<any> {

  constructor(
    private database: DataStoreService,
    @Inject(PROD_LIST_PAGE_SIZE) private pageSize: number
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.database.count('product').pipe(
      switchMap(cnt => this.database.findLists$ByPage<Product>('product', 1, this.pageSize, cnt)),
      take(1),
      map(actions => actions.map(action => action.payload.val())),
      tap((list: Products) => list.sort((p1, p2) => p2.no - p1.no))
    );
  }
}
