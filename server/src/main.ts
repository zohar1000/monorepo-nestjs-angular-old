// the following 2 lines should be first - initializing appConfig
import { ConfigService } from './shared/services/config.service';
ConfigService.initProcessEnvVars();
import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/exception-filters/all-exceptions-filter';
import { appConfig } from './shared/consts/app-config';

function setConsoleLog() {
  console['orgLog'] = console.log;
  console.log = (...params) => {
    const time = (new Date()).toISOString().replace('T', ' ').substring(0, 19);
    console['orgLog'](time, ...params);
  };
}

async function bootstrap() {
  setConsoleLog();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(appConfig.port);
  console.log('server is listening on port:', appConfig.port);
}

bootstrap().then();
