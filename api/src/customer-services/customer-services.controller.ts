import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CustomerServicesService } from './customer-services.service';
import { CreateCustomerServiceDto } from './dto/create-customer-service.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer-service.dto';
import { UUID } from 'crypto';

@Controller('customer-services')
export class CustomerServicesController {
  constructor(
    private readonly customerServicesService: CustomerServicesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCustomerServiceDto: CreateCustomerServiceDto) {
    return await this.customerServicesService.create(createCustomerServiceDto);
  }

  @Get()
  getAllCustomersServices() {
    return this.customerServicesService.getAllCustomersServices();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.customerServicesService.findServiceById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerServiceDto: UpdateCustomerServiceDto,
  ) {
    return this.customerServicesService.update(+id, updateCustomerServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.customerServicesService.deleteCustomerServiceById(id);
  }
}
