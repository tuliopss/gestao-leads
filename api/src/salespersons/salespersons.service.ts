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

@Injectable()
export class SalespersonsService {
  constructor(
    @InjectRepository(SalesPerson)
    private readonly salesPersonRepository: Repository<SalesPerson>,
  ) {}

  async create(createSalespersonDto: CreateSalespersonDto) {
    try {
      return await this.salesPersonRepository.save(createSalespersonDto);
    } catch (error) {}
  }

  async findAll(): Promise<SalesPerson[]> {
    const salespersons = await this.salesPersonRepository.find({
      relations: ['customerServices'],
    });
    if (salespersons.length === 0) {
      throw new NotFoundException(
        'Não foram encontrados atendentes registrados...',
      );
    }
    return salespersons;
  }

  async findSalesPersonByIdOne(id: UUID): Promise<SalesPerson> {
    try {
      const salesperson = await this.salesPersonRepository.findOne({
        where: { id: id },
      });
      if (!salesperson) {
        throw new NotFoundException('Atendente não encontrado...');
      }

      return salesperson;
    } catch (error) {}
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

  remove(id: number) {
    return `This action removes a #${id} salesperson`;
  }
}
