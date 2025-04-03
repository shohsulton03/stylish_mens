import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { TeamSectionService } from "./team_section.service";
import { CreateTeamSectionDto } from "./dto/create-team_section.dto";
import { UpdateTeamSectionDto } from "./dto/update-team_section.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TeamSection } from "./entities/team_section.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { AdminGuard } from "../common/guards/admin.guard";

@ApiTags("Team Section")
@Controller("team-section")
export class TeamSectionController {
  constructor(private readonly teamSectionService: TeamSectionService) {}

  @ApiOperation({ summary: "Add new category" })
  @ApiResponse({
    status: 201,
    description: "Added",
    type: TeamSection,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Post()
  create(
    @Body() createTeamSectionDto: CreateTeamSectionDto,
    @UploadedFile() file: any
  ) {
    return this.teamSectionService.create({ ...createTeamSectionDto }, file);
  }

  @ApiOperation({ summary: "Get all data" })
  @ApiResponse({
    status: 200,
    description: "All team section value",
    type: [TeamSection],
  })
  @Get()
  findAll() {
    return this.teamSectionService.findAll();
  }

  @ApiOperation({ summary: "Get one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Get one by Id",
    type: TeamSection,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.teamSectionService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Update by Id",
    type: TeamSection,
  })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor("file"))
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTeamSectionDto: UpdateTeamSectionDto,
    @UploadedFile() file: any
  ) {
    return this.teamSectionService.update(+id, updateTeamSectionDto, file);
  }

  @ApiOperation({ summary: "Delete by id" })
  @ApiResponse({
    status: 200,
    description: "Delete",
    type: Object,
  })
  @UseGuards(AdminGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.teamSectionService.remove(+id);
  }
}
