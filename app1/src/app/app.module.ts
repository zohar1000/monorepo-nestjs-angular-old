import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedAppsModule } from '@shared-apps-module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Child1Component } from './components/child1/child1.component';
import { ApiService } from './services/api.service';

function initializeApp(apiService: ApiService): () => Promise<any> | undefined {
  return () => {
    return new Promise<any>((resolve, reject) => {
      console.log('==> in promise, apiService:', apiService);
      setTimeout(() => {
        apiService.serverUrl = 'app initializer server url';
        console.log('in promise resolve, apiService:', apiService, ' ==>');
        resolve(null);
      }, 3000);
    });
  }
}

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
  providers: [{ provide: APP_INITIALIZER, useFactory: initializeApp, deps: [ApiService], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('app module con');
  }
}
