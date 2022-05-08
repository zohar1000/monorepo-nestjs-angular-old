import { TypeOrmModule } from "@nestjs/typeorm";
import { PeopleCount } from "servers/simulation-server/src/shared/entities/people-count.entity";
import { Telemetry } from "servers/xyzt-server/src/entities/telemetry.entity";
import { sendingsToXyzt } from "servers/xyzt-server/src/entities/sendingsToXyzt.entity";
import { SystemEvents } from "./entities/system-events.entity";
import { App } from "servers/apps-server/src/entities/app.entity";
import { CustomersApps } from "servers/apps-server/src/entities/customers-apps.entity";

export const mongodbConfig: TypeOrmModule = {
  type: "mongodb",
  // url: "mongodb+srv://Galileo:Galileo123@cluster0.d7jtz.mongodb.net/galileo?retryWrites=true&w=majority",
  url: process.env.MONGODB_CONNECTION_STRING,
  // url: 'mongodb://localhost:27017',
  useNewUrlParser: true,
  synchronize: false, // process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [PeopleCount, SystemEvents, Telemetry, sendingsToXyzt, App, CustomersApps],
  retryAttempts: 1,
  autoLoadEntities: false,
  verboseRetryLog: true
}
