import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from '@shared-server/exception-filters/all-exceptions-filter';
import { globalServices } from '@shared-server/consts/global-services.const';

export class ServerBootstrap {
  static async initServer(appModuleClass, port) {
    const inst = new ServerBootstrap();
    inst.setConsoleLog();
    const app = await NestFactory.create(appModuleClass);
    app.enableCors();
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, globalServices.systemEventsService));
    await app.listen(Number(port));
  }

  setConsoleLog() {
    console['orgLog'] = console.log;
    console.log = (...params) => {
      const time = (new Date()).toISOString().replace('T', ' ').substr(0, 19);
      console['orgLog'](time, ...params);
    };
  }
}
