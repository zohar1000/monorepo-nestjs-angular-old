import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadComponent: () => import('../../../shared-apps/src/app/components/login/login.component').then(m => m.LoginComponent) },
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
