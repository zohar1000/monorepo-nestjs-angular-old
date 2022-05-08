import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  constructor() {
    console.log('error service');
    process.on('uncaughtException', err => this.handleError('uncaught error', err.message));
	  process.on('unhandledRejection', (reason, promise) => this.handleError('Unhandled Rejection', reason));
  }

	async handleError(errorType, message) {
    if (typeof message !== 'string') {
      console.log('reason:', message);
      message = 'Unhandled Rejection';
    }
		console.error(`======= There was an ${errorType} =========`, message);
	}
}
