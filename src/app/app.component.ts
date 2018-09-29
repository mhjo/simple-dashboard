import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SpinnerService } from './shared/loading-spinner/spinner.service';

@Component({
  selector: 'scm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    router: Router,
    spinner: SpinnerService
  ) {
    router.events.subscribe(e => this.handleRouteEvent(spinner, e));
  }

  handleRouteEvent(spinner: SpinnerService, e): void {
    if (e instanceof NavigationStart) { spinner.start(); }

    const isNavigationEnd = e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError;
    if (isNavigationEnd) { spinner.stop(); }
  }
}
