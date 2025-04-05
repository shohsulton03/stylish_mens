import { Injectable } from '@nestjs/common';
import { CreateMybotDto } from './dto/create-mybot.dto';
import { UpdateMybotDto } from './dto/update-mybot.dto';

@Injectable()
export class MybotService {
  create(createMybotDto: CreateMybotDto) {
    return 'This action adds a new mybot';
  }

  findAll() {
    return `This action returns all mybot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mybot`;
  }

  update(id: number, updateMybotDto: UpdateMybotDto) {
    return `This action updates a #${id} mybot`;
  }

  remove(id: number) {
    return `This action removes a #${id} mybot`;
  }
}
