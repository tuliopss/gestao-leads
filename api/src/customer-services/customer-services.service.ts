import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerServiceDto } from './dto/create-customer-service.dto';
import { UpdateCustomerServiceDto } from './dto/update-customer-service.dto';
import { CustomerService } from './entities/customer-service.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { LeadsService } from 'src/leads/leads.service';
import { SalespersonsService } from 'src/salespersons/salespersons.service';

@Injectable()
export class CustomerServicesService {
  constructor(
    @InjectRepository(CustomerService)
    private readonly serviceRepository: Repository<CustomerService>,
    private readonly leadService: LeadsService,
    private readonly salesPersonService: SalespersonsService,
  ) {}

  async create(
    createCustomerServiceDto: CreateCustomerServiceDto,
  ): Promise<void> {
    try {
      // const lead = await this.leadService.findLeadById(
      //   createCustomerServiceDto.leadId,
      // );

      const salesPerson = await this.salesPersonService.findSalesPersonByIdOne(
        createCustomerServiceDto.salesPersonId,
      );

      createCustomerServiceDto.salesPerson = salesPerson;
      // createCustomerServiceDto.lead = lead;

      const attendace = this.serviceRepository.create(createCustomerServiceDto);
      await this.serviceRepository.save(attendace);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCustomersServices(): Promise<CustomerService[]> {
    try {
      const services = await this.serviceRepository.find({
        relations: ['salesPerson'],
      });

      if (services.length === 0) {
        throw new NotFoundException(
          'Não foram encontrados atendimentos registrados...',
        );
      }

      return services;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  //: Promise<CustomerService>
  findOne(id: number) {
    return `This action returns a #${id} customerService`;
  }

  update(id: number, updateCustomerServiceDto: UpdateCustomerServiceDto) {
    return `This action updates a #${id} customerService`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerService`;
  }
}
