import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AppInjector } from './app.module';
import { AppLoadService } from './shared/services/app-load/app-load.service';
import {
  APIRequestPayload,
  HttpMethod,
  Endpoint,
} from './shared/services/api-call/api-call';
import { ApiCallService } from './shared/services/api-call/api-call.service';
import { StorageService } from './shared/services/storage/storage.service';
import { Router } from '@angular/router';
import StatusCode from 'status-code-enum';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  __appLoadService!: AppLoadService;

  __apiCallService!: ApiCallService;

  __storageService!: StorageService;

  __router!: Router;
  
  __subscriptions: Subscription[] = [];

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__apiCallService = AppInjector.get(ApiCallService);
    this.__storageService = AppInjector.get(StorageService);
    this.__router = AppInjector.get(Router);
  }
  ngOnInit(): void {
    this.__appLoadService.loadUser();
    this.__appLoadService.loadToken();
    this.getUserDetails();
  }

  ngOnDestroy() {
    this.__subscriptions.map((item: Subscription) => {
      if (item) item.unsubscribe();
    });
  }

  getUserDetails() {
    let requestPayloadObject = new APIRequestPayload();
    requestPayloadObject.method = HttpMethod.GET;
    requestPayloadObject.endpoint = Endpoint.USER;
    let subscr = this.__apiCallService.callService(requestPayloadObject).subscribe({
      next: (res: any) => {
        this.__appLoadService.storeUserData(res.user);
      },
      error: (error) => {
        if (error.status === StatusCode?.ClientErrorConflict) {
          this.__router.navigate(['server/maintenance']);
        } else {
          if (this.__appLoadService.loggedIn()) {
            this.__appLoadService.logout();
          }else{
            this.__router.navigate(['/']);
          }
        }
      },
      complete: () => {},
    });
    this.__subscriptions.push(subscr);
  }
}
