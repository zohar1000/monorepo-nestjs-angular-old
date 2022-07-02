import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
  constructor() {
    Error.stackTraceLimit = 30;

    process.on('uncaughtException', (err: Error) =>  {
      console.log('==> Global Error Handler ********************************************************');
      console.log('Uncaught system exception:', err);
      console.log('Stack trace:', this.getStackTrace(err));
      console.log('******************************************************************************************');
    });

    process.on('unhandledRejection', (reason: any, promise) => {
      console.log('==> Global Error Handler ********************************************************');
      console.log('Unhandled promise rejection, reason:', reason, ', promise:', promise);
      console.log('Stack trace:', this.getStackTrace(reason));
      console.log('******************************************************************************************');
    });

    process.on('SIGINT', () => {
      // console.log('SIGINT signal received');
      // Stops the server from accepting new connections and finishes existing connections.
      // this.close();
    });

    process.on('message', (msg) => {
      if (msg === 'shutdown') {
        console.log('Closing all connections...');
        setTimeout(() => {
          console.log('Finished closing connections');
          process.exit(0);
        }, 1500);
      }
    });
  }

	async handleError(errorType, message) {
    if (typeof message !== 'string') {
      console.log('reason:', message);
      message = 'Unhandled Rejection';
    }
		console.error(`======= There was an ${errorType} =========`, message);
	}

  getStackTrace(error: Error, loggingServiceClassName = '') {
    let e = error;
    if (!e || !e.stack) e = new Error();
    if (typeof e.stack !== 'string') {
      return String(e.stack);
    } else {
      const lines =  e.stack
        .split('\n')
        .filter(line => !line.startsWith('Error'))
        .map(line => line.trim());
      if (loggingServiceClassName !== '') {
        loggingServiceClassName += '.';
        let i;
        for (i = lines.length - 1; i >= 0 && !lines[i].includes(loggingServiceClassName); i--) {}
        if (i >= 0) lines.splice(0, i + 1);
      }
      return lines;
    }
  }

}
