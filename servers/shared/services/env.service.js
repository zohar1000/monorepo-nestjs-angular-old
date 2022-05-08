import { __decorate } from "tslib";
import { Injectable } from '@nestjs/common';
import { FileService } from "./file.service";
let EnvService = class EnvService {
    static initProcessEnvVars() {
        try {
            const envPath = FileService.getAncestorPathSync('.env');
            require('dotenv').config({ path: envPath });
            return envPath;
        }
        catch (e) {
            throw new Error('.env file was not found!!');
        }
    }
};
EnvService = __decorate([
    Injectable()
], EnvService);
export { EnvService };
//# sourceMappingURL=env.service.js.map