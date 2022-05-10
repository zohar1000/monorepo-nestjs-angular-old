import { Component } from '@angular/core';
import { Test1Model } from '@shared-apps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  test: Test1Model = {
    prop1: 'a',
    prop2: 'a'
  };

  time = Date.now();
}
