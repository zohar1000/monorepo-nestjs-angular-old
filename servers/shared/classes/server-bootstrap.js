import { __awaiter } from "tslib";
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from "../exception-filters/all-exceptions-filter";
import { globalServices } from "../consts/global-services.const";
export class ServerBootstrap {
    static initServer(appModuleClass, port) {
        return __awaiter(this, void 0, void 0, function* () {
            const inst = new ServerBootstrap();
            inst.setConsoleLog();
            const app = yield NestFactory.create(appModuleClass);
            app.enableCors();
            const { httpAdapter } = app.get(HttpAdapterHost);
            app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, globalServices.systemEventsService));
            yield app.listen(Number(port));
        });
    }
    setConsoleLog() {
        console['orgLog'] = console.log;
        console.log = (...params) => {
            const time = (new Date()).toISOString().replace('T', ' ').substr(0, 19);
            console['orgLog'](time, ...params);
        };
    }
}
//# sourceMappingURL=server-bootstrap.js.map