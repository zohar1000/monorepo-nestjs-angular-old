import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = '';

  constructor() {
    console.log('api service con');
  }
}
