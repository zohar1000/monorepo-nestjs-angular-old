import { Injectable } from '@nestjs/common';
import { SystemEventType } from '@shared/enums/system-event-type.enum';
import { SystemEventsService } from './system-events.service';

@Injectable()
export class ErrorService{
  constructor(private systemEventsService: SystemEventsService){
    console.log('error service');
    process.on('uncaughtException', err => this.handleError('uncaught error', err.message));
	  process.on('unhandledRejection', (reason, promise) =>this.handleError('Unhandled Rejection', reason));
  }

	async handleError(errorType, message) {
if (typeof message !== 'string') {
	console.log('reason:', message);
	message = 'Unhandled Rejection'
}
		console.error(`======= There was an ${errorType} =========`, message);
		await this.systemEventsService.addSystemEvent({
			time: new Date().toString(),
			type: SystemEventType.GlobalError,
			data: message
		});

	}
}
