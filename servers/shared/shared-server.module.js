import { __decorate } from "tslib";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemEvents } from './entities/system-events.entity';
let SharedServerModule = class SharedServerModule {
};
SharedServerModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([SystemEvents])
        ],
        exports: [
            TypeOrmModule.forFeature([SystemEvents])
        ]
    })
], SharedServerModule);
export { SharedServerModule };
//# sourceMappingURL=shared-server.module.js.map