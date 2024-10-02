import {
  IsArray,
  isBoolean,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  isNumber,
  isUUID,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { Product } from 'src/products/entities/product.entity';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';

export class CreateCustomerServiceDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsBoolean()
  seeAds: boolean;

  @IsBoolean()
  becameCustomer: boolean;

  leadObjection: LeadObjections;

  @IsNumber()
  valuePaid?: number;

  @IsNotEmpty()
  productSegmentsId: UUID[];

  productSegments: Product[];

  @IsNotEmpty()
  @IsUUID()
  salesPersonId: UUID;

  salesPerson: SalesPerson;

  @IsNotEmpty()
  @IsUUID()
  leadId: UUID;

  lead: Lead;
}
