import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Faq } from "./entities/faq.entity";
import { Repository } from "typeorm";

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>
  ) {}

  async create(createFaqDto: CreateFaqDto) {
    return this.faqRepo.save(createFaqDto);
  }

  async findAll() {
    return this.faqRepo.find();
  }

  async findOne(id: number) {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new BadRequestException("FAQ not found");
    }
    return faq;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new BadRequestException("FAQ not found");
    }
    await this.faqRepo.update(id, updateFaqDto);
    return this.faqRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const faq = await this.faqRepo.findOne({ where: { id } });
    if (!faq) {
      throw new BadRequestException("FAQ not found");
    }
    await this.faqRepo.delete(id);
    return { message: `FAQ with ${id} deleted succesfully` };
  }
}
