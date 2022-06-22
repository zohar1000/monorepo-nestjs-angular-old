import { NgModule } from '@angular/core';
import { ConversionsComponent } from './pages/conversions/conversions.component';
import { SimulationComponent } from './pages/simulation/simulation.component';
import { ChartComponent } from './pages/chart/chart.component';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './content.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    ConversionsComponent,
    SimulationComponent,
    ChartComponent,
    ContentComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}
