import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../shared/data-store.service';
import { ProdStatus } from '../../product/product.model';
import { map, tap, take, mergeMap, filter } from 'rxjs/operators';
import { zip, from } from 'rxjs';
import { SpinnerService } from '../../shared/loading-spinner/spinner.service';
import { Category } from '../../category/category.model';

@Component({
  selector: 'scm-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  fetchBarChartData = false;
  barData: any[];
  barChartLabels = ['판매 대기', '판매 중', '판매중지'];
  barChartOptions;

  fetchPieChartData = false;
  pieData: number[];
  pieChartLabels: string[];

  constructor(
    private database: DataStoreService,
    private spinner: SpinnerService,
  ) {
    this.barData = [];
    this.pieData = [];
    this.pieChartLabels = [];
  }

  ngOnInit() {
    this.makeBarChart();
    this.makePieChart();
  }

  private makeBarChart() {
    this.spinner.start();

    const waitForSale$ = this.database.findLists$ByQuery('product', 'status', ProdStatus.WAIT_FOR_SALE).snapshotChanges().pipe(
      map(r => r.length)
    );
    const onSale$ = this.database.findLists$ByQuery('product', 'status', ProdStatus.ON_SALE).snapshotChanges().pipe(
      map(r => r.length)
    );
    const notForSale$ = this.database.findLists$ByQuery('product', 'status', ProdStatus.NOT_FOR_SALE).snapshotChanges().pipe(
      map(r => r.length)
    );

    zip(waitForSale$, onSale$, notForSale$).pipe(
      tap(statData => this.makeBarChartDataset(statData)),
      tap(statData => this.makeBarChartOptions(statData)),
    ).subscribe(() => {
      this.spinner.stop();
      this.fetchBarChartData = true;
    });
  }

  private makeBarChartDataset(statData: number[]) {
    this.barData.push({ data: [statData[0]], label: this.barChartLabels[0] });
    this.barData.push({ data: [statData[1]], label: this.barChartLabels[1] });
    this.barData.push({ data: [statData[2]], label: this.barChartLabels[2] });
  }

  private makeBarChartOptions(statData: number[]) {
    const maxNum = statData.reduce(function(a, b) {
      return Math.max(a, b);
    });
    this.barChartOptions = {
      scales: {
        xAxes: [{ ticks: {max: maxNum, min: 0, stepSize: 1} }]
      }
    };
  }

  private makePieChart() {
    this.spinner.start();

    this.database.findLists$<Category>('category').snapshotChanges().pipe(
      take(1),
      mergeMap(actions => from(actions).pipe(map(action => action.payload.val()))),
      filter(cat => cat.isUse),
      mergeMap(cat => this.database.findLists$ByQuery('product', 'catNo', cat.no.toString()).snapshotChanges().pipe(
        take(1),
        map(products => [cat, products.length])
      )),
      tap((result: any) => {
        console.log(result);
        this.pieData.push(result[1]);
        this.pieChartLabels.push(result[0].name);
      })
    ).subscribe(null, null, () => {
      this.spinner.stop();
      this.fetchPieChartData = true;
    });
  }
}
