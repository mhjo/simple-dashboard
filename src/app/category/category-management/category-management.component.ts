import { Component, OnInit, Inject } from '@angular/core';
import { Categories } from '../category.model';
import { ActivatedRoute } from '@angular/router';
import { DataStoreService } from '../../shared/data-store.service';
import { CAT_LIST_PAGE_SIZE } from '../category.tokens';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'scm-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  categories: Categories;
  totalItemCnt = 0;
  pageSize: number;
  pageNo = 1;

  constructor(
    private route: ActivatedRoute,
    private database: DataStoreService,
    @Inject(CAT_LIST_PAGE_SIZE) pageSize: number
  ) {
    this.pageSize = pageSize;
  }

  ngOnInit() {
    this.database.count('category').subscribe(cnt => this.totalItemCnt = cnt);
    this.fetchResolvedData();
  }

  pageNoChanged(pageNo) {
    this.pageNo = pageNo;
    this.getPagedList();
  }

  getPagedList() {
    this.database.findLists$ByPage('category', this.pageNo, this.pageSize, this.totalItemCnt).pipe(
      map(actions => actions.map(action => action.payload.val())),
      tap((list: Categories) => list.sort((p1, p2) => p2.no - p1.no))
    ).subscribe(cats => this.categories = cats);
  }

  private fetchResolvedData() {
    const resolvedData = <{list: Categories}>this.route.snapshot.data;
    this.categories = resolvedData.list;
  }
}
