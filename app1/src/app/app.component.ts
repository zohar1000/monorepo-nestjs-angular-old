import { Component } from '@angular/core';
import { TestModel } from '@shared-apps/app/models/test.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Test: TestModel = {
    prop1: 'a',
    prop2: 'a'
  };

  title = 'login';
}
