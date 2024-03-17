import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NameModule } from './name/name.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), NameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
