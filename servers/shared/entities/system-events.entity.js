import { __decorate } from "tslib";
import { Entity, Column, ObjectIdColumn } from 'typeorm';
let SystemEvents = class SystemEvents {
};
__decorate([
    ObjectIdColumn()
], SystemEvents.prototype, "id", void 0);
__decorate([
    Column()
], SystemEvents.prototype, "type", void 0);
__decorate([
    Column()
], SystemEvents.prototype, "data", void 0);
__decorate([
    Column()
], SystemEvents.prototype, "time", void 0);
__decorate([
    Column()
], SystemEvents.prototype, "epochTime", void 0);
__decorate([
    Column()
], SystemEvents.prototype, "serverName", void 0);
SystemEvents = __decorate([
    Entity()
], SystemEvents);
export { SystemEvents };
// {
//     "type": "ResetPeopleCount",
//     "data": {
//       "count": 2
//     },
//     "time": "Wed Feb 02 2022 09:00:27 GMT+0200 (שעון ישראל (חורף))",
//     "epochTime": 1643785227167,
//     "id": 1320
//   },
//# sourceMappingURL=system-events.entity.js.map