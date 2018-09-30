import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CheckedProductSetService } from '../checked-product-set.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'scm-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit {
  noneNo$: Observable<boolean>;
  @Output() clicked: EventEmitter<string> = new EventEmitter();

  constructor(
    private router: Router,
    private prodSet: CheckedProductSetService
  ) { }

  ngOnInit() {
    this.mapNoneKeyObservable();
  }

  private mapNoneKeyObservable() {
    this.noneNo$ = this.prodSet.hasNo$.pipe(
      map(hasNo => !hasNo),
    );
  }
}
