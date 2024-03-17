import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { NameService } from './name.service';
import { CreateNameDto } from './dto/create-name.dto';

@Controller('name')
export class NameController {
  constructor(private readonly service: NameService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createNameDto: CreateNameDto) {
    await this.service.create();
  }

  @Post('get')
  async find(@Body() body: any) {
    return await this.service.findOne(body.name);
  }

  @Get()
  async findFirstTenRows() {
    return await this.service.findFirstTenRows();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post('substring/get')
  async findByString(@Body() body: any) {
    return await this.service.findByString(body.substring);
  }
}
