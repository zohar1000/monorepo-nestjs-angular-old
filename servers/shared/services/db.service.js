import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
let DbService = class DbService {
    constructor(httpService) {
        this.httpService = httpService;
        this.dbUrl = 'http://localhost:4100';
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
    saveCurrentPeopleCount(currentPeopleCountObj) {
        // return this.httpService.post(`${this.dbUrl}/telemetries`, currentPeopleCountObj);
    }
};
DbService = __decorate([
    Injectable()
], DbService);
export { DbService };
//# sourceMappingURL=db.service.js.map