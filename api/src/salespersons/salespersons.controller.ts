import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalespersonsService } from './salespersons.service';
import { CreateSalespersonDto } from './dto/create-salesperson.dto';
import { UpdateSalespersonDto } from './dto/update-salesperson.dto';
import { UUID } from 'crypto';

@Controller('salespersons')
export class SalespersonsController {
  constructor(private readonly salespersonsService: SalespersonsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSalespersonDto: CreateSalespersonDto) {
    return this.salespersonsService.create(createSalespersonDto);
  }

  @Get()
  findAll() {
    return this.salespersonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.salespersonsService.findSalesPersonByIdOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateSalespersonDto: UpdateSalespersonDto,
  ) {
    return this.salespersonsService.update(id, updateSalespersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.salespersonsService.deleteSalesPerson(id);
  }

  @Post('link-lead')
  async linkLeadToSalesPerson(
    @Body('salesPersonId') salesPersonId: UUID,
    @Body('leadId') leadId: UUID,
  ) {
    return await this.salespersonsService.linkLeadToSalePerson(
      salesPersonId,
      leadId,
    );
  }
}
