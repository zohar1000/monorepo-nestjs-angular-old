import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { ReactiveFormsModule } from '@angular/forms';

@Module({
  imports: [HttpModule, ReactiveFormsModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
