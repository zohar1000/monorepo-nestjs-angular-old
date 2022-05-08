import { Injectable } from '@nestjs/common';
import { FileService } from './file.service';

@Injectable()
export class EnvService {
  static initProcessEnvVars() {
    try {
      const envPath = FileService.getAncestorPathSync('.env');
      require('dotenv').config({ path: envPath });
      return envPath;
    } catch (e) {
      throw new Error('.env file was not found!!');
    }
  }
}
