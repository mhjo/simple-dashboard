import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NoCounterService } from './no-counter.service';
import { ScmDomain } from './scm-shared-util';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(
    private db: AngularFireDatabase,
    private counter: NoCounterService) { }

  findObject$(domain: ScmDomain, no: number) {
    return this._findObject(domain, no, false);
  }

  findObjectSnapshot(domain: ScmDomain, no: number) {
    return this._findObject(domain, no, true).pipe(take(1));
  }

  findList$(domain: ScmDomain) {
    return this.db.list(`/${domain}`);
  }

  findList$ByQuery(domain: ScmDomain, queryKey: string, queryVal: any) {
    const option: FirebaseListFactoryOpts
  }

  private _findObject(domain: ScmDomain, no: number, isSnapshot: boolean) {
    if (isSnapshot) {
      return this.db.object(`/${domain}/${no}`).snapshotChanges();
    }
    return this.db.object(`/${domain}/${no}`).valueChanges();
  }

  private _findListByOpt(domain: ScmDomain, option: FirebaseListFactoryOpts) {
    return this.db.list(`/${domain}`, option);
  }
}
