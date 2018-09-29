import { NgModule } from '@angular/core';
import { NoCounterService } from './no-counter.service';
import { DataStoreService } from './data-store.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './loading-spinner/spinner.service';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { SessionAuthGuardService } from './session-auth-guard.service';

@NgModule({
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent],
  providers: [NoCounterService, DataStoreService, SpinnerService, CanDeactivateGuardService, SessionAuthGuardService],
  declarations: [LoadingSpinnerComponent]
})
export class SharedModule { }
