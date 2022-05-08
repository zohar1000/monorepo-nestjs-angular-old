import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { SharedServerModule } from '../../shared/shared-server.module';

@Module({
  imports: [
    HttpModule,
    SharedServerModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
