import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalespersonDto } from './dto/create-salesperson.dto';
import { UpdateSalespersonDto } from './dto/update-salesperson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesPerson } from './entities/salesperson.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { LeadsService } from 'src/leads/leads.service';

@Injectable()
export class SalespersonsService {
  constructor(
    @InjectRepository(SalesPerson)
    private readonly salesPersonRepository: Repository<SalesPerson>,
    private readonly leadService: LeadsService,
  ) {}

  async create(createSalespersonDto: CreateSalespersonDto) {
    try {
      return await this.salesPersonRepository.save(createSalespersonDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<SalesPerson[]> {
    try {
      const salespersons = await this.salesPersonRepository.find({
        relations: ['customerServices', 'leads', 'customerServices.lead'],
      });

      if (salespersons.length === 0) {
        throw new NotFoundException(
          'Não foram encontrados atendentes registrados...',
        );
      }
      return salespersons;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findSalesPersonByIdOne(id: UUID): Promise<SalesPerson> {
    try {
      const salesperson = await this.salesPersonRepository.findOne({
        where: { id: id },
        relations: ['leads', 'customerServices'],
      });
      if (!salesperson) {
        throw new NotFoundException('Atendente não encontrado...');
      }

      return salesperson;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: UUID, updateSalespersonDto: UpdateSalespersonDto) {
    try {
      await this.findSalesPersonByIdOne(id);

      await this.salesPersonRepository.update(id, updateSalespersonDto);

      return `Atendente com o id "${id}" foi atualizado.`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteSalesPerson(id: UUID) {
    try {
      await this.findSalesPersonByIdOne(id);

      await this.salesPersonRepository.delete(id);

      return { message: 'Atendente excluído.' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async linkLeadToSalePerson(salesPersonId: UUID, leadId: UUID) {
    try {
      const salesPerson = await this.findSalesPersonByIdOne(salesPersonId);
      const lead = await this.leadService.findLeadById(leadId);
      salesPerson.leads.push(lead);
      console.log(salesPersonId, leadId);
      await this.salesPersonRepository.save(salesPerson);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
