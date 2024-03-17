import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NameController } from './name.controller';
import { NameService } from './name.service';
import { Name, NameSchema } from './schemas/name.schema';

@Module({
  controllers: [NameController],
  providers: [NameService],
  imports: [
    MongooseModule.forFeature([{ name: Name.name, schema: NameSchema }]),
  ],
})
export class NameModule {}
