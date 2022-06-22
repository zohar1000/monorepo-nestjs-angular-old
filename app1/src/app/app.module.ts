import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedAppsModule } from '@shared-apps-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Child1Component } from './shared/components/child1/child1.component';

@NgModule({
  declarations: [
    AppComponent,
    Child1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedAppsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
