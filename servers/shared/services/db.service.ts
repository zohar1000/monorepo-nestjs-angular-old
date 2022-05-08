import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SystemEvent } from '@shared/models/system-event.model';
import { timer, lastValueFrom } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { SystemEventType } from '@shared/enums/system-event-type.enum';

@Injectable()
export class DbService {
  dbUrl = 'http://localhost:4100';

  constructor(private httpService: HttpService) {
  }

  readOne(tableName, id) {
  //  return lastValueFrom(this.httpService.get(`${this.dbUrl}/${tableName}/${id}`).pipe(map(res => res.data)));
  }

  readAll(tableName) {
  //  return lastValueFrom(this.httpService.get(`${this.dbUrl}/${tableName}`).pipe(map(res => res.data)));
  }

  write(tableName, data) {
  //  return lastValueFrom(this.httpService.post(`${this.dbUrl}/${tableName}`, data));
  }

  delete(tableName, id, delayMs = 0) {
  //  return lastValueFrom(this.httpService.delete(`${this.dbUrl}/${tableName}/${id}`).pipe(delay(delayMs)));
  }

  saveCurrentPeopleCount(currentPeopleCountObj: any) {
   // return this.httpService.post(`${this.dbUrl}/telemetries`, currentPeopleCountObj);
  }
}
