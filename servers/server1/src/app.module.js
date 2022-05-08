import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { SharedServerModule } from '../../shared/shared-server.module';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            HttpModule,
            SharedServerModule
        ],
        controllers: [AppController,
            providers, []]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map