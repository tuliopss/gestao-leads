import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead) private readonly leadRepository: Repository<Lead>,
  ) {}
  async createLead(createLeadDto: CreateLeadDto) {
    try {
      return await this.leadRepository.save(createLeadDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllLeads(): Promise<Lead[]> {
    try {
      const leads = await this.leadRepository.find({
        relations: ['customerService'],
      });
      if (leads.length === 0) {
        throw new NotFoundException(
          'Não foram encontrados atendimentos registrados...',
        );
      }
      return leads;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findLeadById(id: UUID): Promise<Lead> {
    try {
      const lead = await this.leadRepository.findOne({
        where: { id },
        relations: ['customerService'],
      });
      if (!lead) {
        throw new NotFoundException('Lead não encontrado...');
      }
      return lead;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateLeadDto: UpdateLeadDto) {
    return `This action updates a #${id} lead`;
  }
}
