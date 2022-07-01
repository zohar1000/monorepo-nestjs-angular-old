import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppResolver } from './app.resolver';
import { AppGuard } from './guards/app.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppComponent, resolve: { appData: AppResolver }, canActivate: [AppGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // APP_INITIALIZER runs and resolves, then app component is instantiated and ngOnInit runs, then gaurds and resolvers
    // initialNavigation: 'enabledNonBlocking'

    // APP_INITIALIZER, guards and resolvers runs in parallel, when APP_INITIALIZER resolves then app component is instantiated
    // initialNavigation: 'enabledBlocking'

    // APP_INITIALIZER runs and resolves, then app component is instantiated, *** guards and resolvers DO NOT RUN
    initialNavigation: 'disabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
