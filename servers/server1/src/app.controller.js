import { __awaiter, __decorate } from "tslib";
import { Controller, Get, HttpCode } from '@nestjs/common';
let AppController = class AppController {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'hello from server1';
        });
    }
    getFavIcon() {
        return __awaiter(this, void 0, void 0, function* () {
            return '';
        });
    }
};
__decorate([
    Get('/')
], AppController.prototype, "init", null);
__decorate([
    Get('/favicon.ico'),
    HttpCode(204)
], AppController.prototype, "getFavIcon", null);
AppController = __decorate([
    Controller('')
], AppController);
export { AppController };
//# sourceMappingURL=app.controller.js.map