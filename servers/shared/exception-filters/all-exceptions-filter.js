import { __awaiter, __decorate } from "tslib";
import { Catch, HttpException, HttpStatus, } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { SystemEventType } from '@shared/enums/system-event-type.enum';
let AllExceptionsFilter = class AllExceptionsFilter extends BaseExceptionFilter {
    constructor(httpAdapter, systemEventsService) {
        super();
        this.httpAdapter = httpAdapter;
        this.systemEventsService = systemEventsService;
        // this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<< IN FILTER');
            // console.log('this.httpAdapterHost:', this.httpAdapter);
            // const { httpAdapter } = this.httpAdapterHost;
            const ctx = host.switchToHttp();
            const httpStatus = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
            const responseBody = {
                statusCode: httpStatus,
                timestamp: new Date().toISOString(),
                path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
            };
            yield this.addSystemEvent(responseBody);
            this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        });
    }
    addSystemEvent(responseBody) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.systemEventsService.addSystemEvent({
                time: new Date().toString(),
                type: SystemEventType.ClientFailedRequest,
                data: responseBody
            });
        });
    }
};
AllExceptionsFilter = __decorate([
    Catch()
], AllExceptionsFilter);
export { AllExceptionsFilter };
//# sourceMappingURL=all-exceptions-filter.js.map