import { Controller, All } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('ping')
  getHello(): string {
    return this.appService.getHello();
  }
}
