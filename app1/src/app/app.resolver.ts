import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<boolean> {
  constructor(private apiService: ApiService) {
    console.log('AppResolver con, serverUrl:', this.apiService.serverUrl);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('resolve START, serverUrl:', this.apiService.serverUrl);
    return of(true);
  }
}
