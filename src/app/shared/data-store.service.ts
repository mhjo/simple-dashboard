import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NoCounterService } from './no-counter.service';
import { ScmDomain } from './scm-shared-util';
import { take, switchMap } from 'rxjs/operators';
import { DatabaseReference } from '@angular/fire/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(
    private db: AngularFireDatabase,
    private counter: NoCounterService) { }

  create(domain: ScmDomain, modelCreatorFn: (number) => any) {
    return this.counter.incAndGet(domain).pipe(
      switchMap(no => this.findObject$(domain, no).set(modelCreatorFn(no)))
    );
  }

  update(domain: ScmDomain, model: any) {
    return this.findObject$(domain, model.no).update(model);
  }

  count(domain: ScmDomain) {
    return this.counter.get(domain);
  }

  findObject$(domain: ScmDomain, no: number) {
    return this._findObject(domain, no, false);
  }

  findObjectSnapshot(domain: ScmDomain, no: number) {
    return this._findObject(domain, no, true).pipe(take(1));
  }

  findLists$(domain: ScmDomain) {
    return this.db.list(`/${domain}`);
  }

  findLists$ByQuery(domain: ScmDomain, queryKey: string, queryVal: any) {
    const queryFn = (ref: DatabaseReference) => ref.orderByChild(queryKey).equalTo(queryVal);
    return this._findListByOpt(domain, queryFn).valueChanges().pipe(
      take(1)
    );
  }

  findLists$ByPage(domain: ScmDomain, pageNo, pageSize, totalCnt) {
    const offset = totalCnt - pageSize * (pageNo - 1);
    const queryFn = (ref: DatabaseReference) => ref.orderByChild('no').endAt(offset).limitToLast(pageSize);
    return this._findListByOpt(domain, queryFn);
  }

  private _findObject(domain: ScmDomain, no: number, isSnapshot: boolean) {
    if (isSnapshot) {
      return this.db.object(`/${domain}/${no}`).snapshotChanges();
    }
    return this.db.object(`/${domain}/${no}`);
  }

  private _findListByOpt(domain: ScmDomain, queryFn) {
    return this.db.list(`/${domain}`, queryFn);
  }
}
