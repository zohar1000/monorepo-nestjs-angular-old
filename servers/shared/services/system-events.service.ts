import { timer } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { SystemEvent } from '@shared/models/system-event.model';
import { DbService } from './db.service';
import { SystemEvents } from '../entities/system-events.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SystemEventsService {
	// readonly TABLE_NAME = 'server-events';
	// readonly DAY_IN_MS = 86400000; //60000 * 60 * 24
	// readonly OLD_DAYS = 7;
	// readonly OLD_DAYS_IN_MS = this.OLD_DAYS * this.DAY_IN_MS;
	 readonly createdTime = new Date();

	constructor(@InjectRepository(SystemEvents)
	             private systemEventRepository: Repository<SystemEvents>) {
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

	async getSystemEvents() {
			return await this.systemEventRepository.find();
	}

	async addSystemEvent(systemEvent: Partial<SystemEvent>) {
		try {
			const newSystemEvents = new SystemEvents();
			const date = new Date();
			newSystemEvents.time = date;
			newSystemEvents.epochTime = date.getTime();
			newSystemEvents.data = systemEvent.data;
			newSystemEvents.type = systemEvent.type;
			newSystemEvents.serverName = systemEvent.server;
			await this.systemEventRepository.save(newSystemEvents);
			console.log('to @@ ', newSystemEvents);
		} catch (error) {
			console.log('error adding system event, message:', error.message, ', system event:', systemEvent);
			return Promise.resolve();
		}
	}

	// async deleteSystemEvent(systemEventId: number) {
	// 	return this.dbService.delete(this.TABLE_NAME, systemEventId, 1000);
	// }
}
