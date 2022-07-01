import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as JSON5 from 'json5';
import { FileService } from './file.service';
import * as process from 'process';

@Injectable()
export class EnvService {
  static initProcessEnvVars() {
    try {
      const envPath = FileService.getAncestorPathSync('env.json5');
      const text = fs.readFileSync(envPath, 'utf8');
      const env = JSON5.parse(text);
      for (const key in env) {
        process.env[key] = env[key];
      }
    } catch (e) {
      throw new Error('.env file was not found!!');
    }
  }
}
