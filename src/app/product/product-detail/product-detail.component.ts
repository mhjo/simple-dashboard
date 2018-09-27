import { Component, OnInit } from '@angular/core';
import { ActionMode } from '../../shared/scm-shared-util';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Categories } from '../../category/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStoreService } from '../../shared/data-store.service';
import { ToastrService } from 'ngx-toastr';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'scm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  subTitle;
  actionMode: ActionMode;
  productForm: FormGroup;
  usedCats: Categories;
  private prodNo: number;
  private totalItemCnt;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private database: DataStoreService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    // this.initForm();
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      filter(q => q['action'] !== undefined),
      // tap(q => this._setActionMode(q))
    );
  }

}
