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
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { ProductsService } from 'src/products/products.service';
import { ProductSegments } from 'src/products/enums/product-segment.enum';
import { UUID } from 'crypto';

@Injectable()
export class CustomerServicesService {
  constructor(
    @InjectRepository(CustomerService)
    private readonly serviceRepository: Repository<CustomerService>,
    private readonly leadService: LeadsService,
    private readonly productService: ProductsService,
    private readonly salesPersonService: SalespersonsService,
  ) {}

  async create(
    createCustomerServiceDto: CreateCustomerServiceDto,
  ): Promise<CustomerService> {
    try {
      const lead = await this.leadService.findLeadById(
        createCustomerServiceDto.leadId,
      );
      const salesPerson = await this.salesPersonService.findSalesPersonByIdOne(
        createCustomerServiceDto.salesPersonId,
      );

      createCustomerServiceDto.productSegments = [];
      createCustomerServiceDto.productSegments = await Promise.all(
        createCustomerServiceDto.productSegmentsId.map(async (segment) => {
          return this.productService.findProductSegmentById(segment);
        }),
      );

      createCustomerServiceDto.salesPerson = salesPerson;
      createCustomerServiceDto.lead = lead;

      const attendace = this.serviceRepository.create(createCustomerServiceDto);

      if (attendace.becameCustomer && !attendace.valuePaid) {
        throw new BadRequestException('Insira o valor');
      }

      attendace.valuePaid = attendace.becameCustomer
        ? createCustomerServiceDto.valuePaid
        : 0;

      if (attendace.valuePaid > 0)
        attendace.leadObjection = LeadObjections.NENHUMA;

      await this.salesPersonService.linkLeadToSalePerson(
        salesPerson.id,
        lead.id,
      );

      await this.salesPersonService.calcPercentConvertSales(salesPerson.id);

      return await this.serviceRepository.save(attendace);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllCustomersServices(): Promise<CustomerService[]> {
    try {
      const services = await this.serviceRepository.find({
        relations: ['salesPerson', 'lead', 'productSegments'],
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
  async findServiceById(id: UUID): Promise<CustomerService> {
    try {
      const customerService = await this.serviceRepository.findOne({
        where: { id },
        relations: ['lead', 'salesPerson', 'productSegments'],
      });

      if (!customerService) {
        throw new NotFoundException('Atendimento não encontrado');
      }

      return customerService;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateCustomerServiceDto: UpdateCustomerServiceDto) {
    return `This action updates a #${id} customerService`;
  }

  async deleteCustomerServiceById(id: UUID) {
    try {
      await this.findServiceById(id);

      await this.serviceRepository.delete(id);

      return { message: 'Atendimento excluído.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
