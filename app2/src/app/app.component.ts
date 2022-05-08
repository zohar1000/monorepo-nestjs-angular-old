import { Component } from '@angular/core';
import { TestModel } from '@apps-shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Test: TestModel;

  title = 'login';
}
