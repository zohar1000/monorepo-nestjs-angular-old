import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as JSON5 from 'json5';
import { FileService } from './file.service';
import { initAppConfig } from '../consts/app-config';

@Injectable()
export class ConfigService {
  static initProcessEnvVars() {
    try {
      const envPath = FileService.getAncestorPathSync('server.config.json5');
      const text = fs.readFileSync(envPath, 'utf8');
      const appConfig = JSON5.parse(text);
      initAppConfig(appConfig);
    } catch (e) {
      throw new Error('.env file was not found!!');
    }
  }
}
