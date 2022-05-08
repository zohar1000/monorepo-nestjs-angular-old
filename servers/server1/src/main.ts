// the following 2 lines should be first - initializing process.env variables
import { EnvService } from '../../shared/services/env.service';
EnvService.initProcessEnvVars();
import { AppModule } from './app.module';
import { ServerBootstrap } from '@shared-server/classes/server-bootstrap';

async function bootstrap() {
  await ServerBootstrap.initServer(AppModule, process.env.SERVER1_PORT);
  console.log('server1 is listening on port:', process.env.SERVER1_PORT);
}
bootstrap();
