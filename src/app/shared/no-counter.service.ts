import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ScmDomain } from './scm-shared-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoCounterService {

  constructor(private db: AngularFireDatabase) { }

  get(domain: ScmDomain): Observable<any> {
    return this._getNumber$(domain).snapshotChanges().pipe(
      map(action => action.payload.val() || 0)
    );
  }

  incAndGet(domain: ScmDomain): Observable<number> {
    const id$ = new EventEmitter<number>();

    const onComplete = (err, committed, dataSnapshot) => {
      if (err) { throw new Error(`failed to increase number`); }

      if (committed) {
        id$.emit(dataSnapshot.val());
        id$.complete();
      }
    };

    this.db.object(`/numbers/${domain}`).query.ref.transaction(
      num => (num || 0) + 1,
      onComplete
    );
    return id$;
  }

  private _getNumber$(domain: ScmDomain) {
    return this.db.object(`/numbers/${domain}`);
  }
}
