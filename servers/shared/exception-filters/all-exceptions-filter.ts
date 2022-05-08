import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SystemEventType } from '@shared/enums/system-event-type.enum';
import { SystemEventsService } from '../services/system-events.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {

  constructor(private httpAdapter: any, private systemEventsService: SystemEventsService) {
    super();
    // this.httpAdapterHost = httpAdapterHost;
  }

  async catch(exception: unknown, host: ArgumentsHost) {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<< IN FILTER');
    // console.log('this.httpAdapterHost:', this.httpAdapter);
    // const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    await this.addSystemEvent(responseBody);
    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  async addSystemEvent(responseBody: any) {
    return this.systemEventsService.addSystemEvent({
      time: new Date().toString(),
      type: SystemEventType.ClientFailedRequest,
      data: responseBody
    });
  }
}
