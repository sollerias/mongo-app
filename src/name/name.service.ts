import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Name, NameDocument } from './schemas/name.schema';
import { DateTime } from 'luxon';

@Injectable()
export class NameService {
  private readonly logger = new Logger(NameService.name);

  constructor(
    @InjectModel(Name.name)
    private readonly nameModel: Model<NameDocument>,
  ) {}

  private static getRandomInt(min, max): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  private generateRandomString(): string {
    const length = NameService.getRandomInt(10, 50);
    let result = '';
    const characters =
      'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async create(): Promise<void> {
    const startTime = DateTime.now();
    this.logger.log(
      `Process start at ${startTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`,
    );

    for (let i = 0; i < 10 ** 6; i += 1) {
      await new this.nameModel({
        name: this.generateRandomString(),
      }).save();
    }

    const endTime = DateTime.now();
    const duration = endTime
      .diff(startTime, ['hours', 'minutes', 'seconds', 'milliseconds'])
      .toObject();
    this.logger.log(
      `Process end at ${endTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}`,
    );
    this.logger.log(`Process duration: ${JSON.stringify(duration)}`);

    return;
  }

  async findOne(name: string): Promise<any> {
    this.logger.log(`name: ${name}`);
    return (await this.nameModel.findOne({ name }).exec()) ?? {};
  }

  async findById(id: string): Promise<any> {
    const [result] = await this.nameModel
      .find({ _id: new Types.ObjectId(id) })
      .exec();
    this.logger.log(`result: ${JSON.stringify(result)}`);
    return result ?? {};
  }

  async findFirstTenRows(): Promise<any> {
    const result = await this.nameModel.find().limit(10).exec();
    this.logger.log(`result: ${result.length}`);

    return result ?? [];
  }

  async findByString(str: string): Promise<any> {
    const result = await this.nameModel
      .find({ name: { $regex: str, $options: 'i' } })
      .exec();
    this.logger.log(`result: ${result.length}`);

    return result ?? [];
  }
}
