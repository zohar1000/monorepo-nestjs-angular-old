import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { ConversionsComponent } from './pages/conversions/conversions.component';
// import { SimulationComponent } from './pages/simulation/simulation.component';
// import { ChartComponent } from './pages/chart/chart.component';
// import { ContentComponent } from './content.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('../../../../shared-apps/src/app/components/login/login.component').then(m => m.LoginComponent) }
    // path: '', component: HomeComponent, children: [
      // { path: 'simulation', component: SimulationComponent },
      // { path: 'result', loadChildren: () => import('./pages/result/result.module').then(m => m.ResultModule) },
      // { path: 'time-frame', loadChildren: () => import('./pages/time-frame/time-frame.module').then(m => m.TimeFrameModule) },
      // { path: 'lines', loadChildren: () => import('./pages/lines/lines.module').then(m => m.LinesModule) },
      // { path: 'chart', component: ChartComponent },
      // { path: 'conversions', component: ConversionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ContentRoutingModule { }
