import { __awaiter, __decorate, __param } from "tslib";
import { Injectable } from '@nestjs/common';
import { SystemEvents } from '../entities/system-events.entity';
import { InjectRepository } from '@nestjs/typeorm';
let SystemEventsService = class SystemEventsService {
    constructor(systemEventRepository) {
        this.systemEventRepository = systemEventRepository;
        // readonly TABLE_NAME = 'server-events';
        // readonly DAY_IN_MS = 86400000; //60000 * 60 * 24
        // readonly OLD_DAYS = 7;
        // readonly OLD_DAYS_IN_MS = this.OLD_DAYS * this.DAY_IN_MS;
        this.createdTime = new Date();
        // timer(0, this.DAY_IN_MS).subscribe(() => this.deleteOldEvents());
    }
    // async deleteOldEvents() {
    // 	try {
    // 		const systemEvents = await this.getSystemEvents();
    // 		const currentTime: any = (new Date()).getTime();
    // 		for (const systemEvent of systemEvents) {
    // 			const eventTime: any = systemEvent.epochTime || (new Date(systemEvent.time)).getTime();
    // 			if (currentTime - eventTime >= this.OLD_DAYS_IN_MS) {
    // 				try {
    // 					await this.deleteSystemEvent(systemEvent.id);
    // 				} catch (error) {
    // 					console.log('Error removing old system event, error:', error.message);
    // 				}
    // 			}
    // 		}
    // 	} catch (error) {
    // 		console.log('Error reading system event, error:', error.message);
    // 	}
    // }
    getSystemEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.systemEventRepository.find();
        });
    }
    addSystemEvent(systemEvent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSystemEvents = new SystemEvents();
                const date = new Date();
                newSystemEvents.time = date;
                newSystemEvents.epochTime = date.getTime();
                newSystemEvents.data = systemEvent.data;
                newSystemEvents.type = systemEvent.type;
                newSystemEvents.serverName = systemEvent.server;
                yield this.systemEventRepository.save(newSystemEvents);
                console.log('to @@ ', newSystemEvents);
            }
            catch (error) {
                console.log('error adding system event, message:', error.message, ', system event:', systemEvent);
                return Promise.resolve();
            }
        });
    }
};
SystemEventsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(SystemEvents))
], SystemEventsService);
export { SystemEventsService };
//# sourceMappingURL=system-events.service.js.map