import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { FaqService } from "./faq.service";
import { CreateFaqDto } from "./dto/create-faq.dto";
import { UpdateFaqDto } from "./dto/update-faq.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Faq } from "./entities/faq.entity";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("FAQ")
@Controller("faq")
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiOperation({ summary: "Add new FAQ" })
  @ApiResponse({
    status: 201,
    description: "Added",
    type: Faq,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @ApiOperation({ summary: "Get all data" })
  @ApiResponse({
    status: 200,
    description: "All FAQ value",
    type: [Faq],
  })
  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @ApiOperation({ summary: "Get one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Get one by Id",
    type: Faq,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.faqService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Update by Id",
    type: Faq,
  })
  @UseGuards(AdminGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @ApiOperation({ summary: "Delete self" })
  @ApiResponse({
    status: 200,
    description: "Delete self",
    type: Object,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.faqService.remove(+id);
  }
}
