import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Category } from '../category.model';
import { DataStoreService } from '../../shared/data-store.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailResolverService implements Resolve<Category> {

  constructor(
    private database: DataStoreService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.queryParams['action'] === 'create') { return null; }

    return this.database.findObject$<Category>('category', route.params['no']).snapshotChanges().pipe(
      take(1),
      map(action => {
        if (action.payload.val()) {
          return action.payload.val();
        }

        this.router.navigate(['category-list']);
        return null;
      })
    );
  }
}
