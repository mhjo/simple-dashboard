import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataStoreService } from '../../shared/data-store.service';
import { ToastrService } from 'ngx-toastr';
import { ActionMode, ScmSharedUtil } from 'src/app/shared/scm-shared-util';
import { Category } from '../category.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'scm-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  subTitle: string;
  actionMode: ActionMode;
  categoryForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private database: DataStoreService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      no: [0],
      name: ['', Validators.required],
      desc: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      isUse: [true, Validators.required],
      createdTime: [ScmSharedUtil.getCurrentDateTime()],
      updatedTime: [''],
    });
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      filter(q => q['action'] !== undefined)
    );
  }

  resetForm(cat: Category) {
    this.categoryForm.reset({
      no: {value: cat.no, disabled: true},
      name: {value: cat.name, disabled: true},
      desc: {value: cat.desc, disabled: true},
      isUse: {value: cat.isUse, disabled: true},
      createdTime: {value: cat.createdTime, disabled: true},
      updatedTime: {value: cat.updatedTime, disabled: true},
    });
  }

}
