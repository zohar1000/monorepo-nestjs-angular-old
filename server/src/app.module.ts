import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';
import { ErrorService } from './shared/services/error.service';
import { FileService } from './shared/services/file.service';
import { SanitationService } from './shared/services/sanitation.service';
import { GlobalService } from './shared/services/global.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ErrorService, FileService, SanitationService]
})
export class AppModule {
  constructor(errorService: ErrorService, fileService: FileService, sanitationService: SanitationService) {
    GlobalService.globalService$.next({ errorService, fileService, sanitationService });
  }
}
