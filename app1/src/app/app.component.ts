import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  time = Date.now();

  constructor(private apiService: ApiService) {
    console.log('app component con, serverUrl:', this.apiService.serverUrl);
  }

  ngOnInit() {
    console.log('app component on init, serverUrl:', this.apiService.serverUrl);
  }
}
