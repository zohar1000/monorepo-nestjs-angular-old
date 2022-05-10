// the following 2 lines should be first - initializing process.env variables
import { EnvService } from './services/env.service';
EnvService.initProcessEnvVars();
import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './exception-filters/all-exceptions-filter';

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
  await app.listen(Number(process.env.SERVER1_PORT));

  console.log('server1 is listening on port:', process.env.SERVER1_PORT);
}

bootstrap().then();
