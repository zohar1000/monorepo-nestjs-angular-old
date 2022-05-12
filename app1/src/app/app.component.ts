import { Component } from '@angular/core';
import { Test1Model } from '@shared-apps/models/test1.model';
import { Severity } from './enums/severity.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  test: Test1Model = {
    prop1: Severity.Error,
    prop2: 'a'
  };

  time = Date.now();
}
