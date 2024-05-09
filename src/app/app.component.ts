import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AppInjector } from './app.module';
import { AppLoadService } from './shared/services/app-load/app-load.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  __viewType!: string;

  __appLoadService!: AppLoadService;

  title = 'angular-boilerplate';

  constructor() {
    this.__appLoadService = AppInjector.get(AppLoadService);
    this.__appLoadService.viewType$.subscribe(v => {
      this.__viewType = v;
    });
  }

}
