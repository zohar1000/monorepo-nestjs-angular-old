import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('')
export class AppController {

  @Get('/')
  async init(): Promise<string> {
    return 'hello from server1';
  }

  @Get('/favicon.ico')
  @HttpCode(204)
  async getFavIcon(): Promise<string> {
    return '';
  }
}
