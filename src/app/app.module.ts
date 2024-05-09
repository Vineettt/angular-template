import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/elements/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './shared/elements/navbar/navbar.component';

export let AppInjector: Injector;

@NgModule({
  declarations: [AppComponent, SidebarComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule, FlexLayoutModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
