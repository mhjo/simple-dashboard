import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataStoreService } from '../../shared/data-store.service';
import { CAT_LIST_PAGE_SIZE } from '../category.tokens';
import { switchMap, tap, take, map } from 'rxjs/operators';
import { Categories } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryListResolverService implements Resolve<any> {

  constructor(
    private database: DataStoreService,
    @Inject(CAT_LIST_PAGE_SIZE) private pageSize: number
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.database.count('category').pipe(
      switchMap(cnt => this.database.findLists$ByPage('category', 1, this.pageSize, cnt)),
      take(1),
      map(actions => actions.map(action => action.payload.val())),
      tap((list: Categories) => list.sort((p1, p2) => p2.no - p1.no)),
    );
  }
}
