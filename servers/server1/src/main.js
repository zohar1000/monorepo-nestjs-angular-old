import { __awaiter } from "tslib";
// the following 2 lines should be first - initializing process.env variables
import { EnvService } from '../../shared/services/env.service';
EnvService.initProcessEnvVars();
import { AppModule } from './app.module';
import { ServerBootstrap } from "../../shared/classes/server-bootstrap";
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield ServerBootstrap.initServer(AppModule, process.env.SERVER1_PORT);
        console.log('server1 is listening on port:', process.env.SERVER1_PORT);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map