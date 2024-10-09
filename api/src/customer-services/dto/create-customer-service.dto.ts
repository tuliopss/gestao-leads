import {
  ArrayMinSize,
  IsArray,
  isBoolean,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  isNumber,
  isUUID,
  IsUUID,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { Product } from 'src/products/entities/product.entity';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';

export class CreateCustomerServiceDto {
  @IsNotEmpty({ message: 'Informe a data.' })
  @IsDateString({}, { message: 'Informe uma data válida' })
  date: Date;

  @IsNotEmpty({ message: 'Informe se o Lead viu algum anúncio' })
  @IsBoolean({ message: 'Informe se sim ou não' })
  seeAds: boolean;

  @IsBoolean({ message: 'Informe se sim ou não' })
  @IsNotEmpty({ message: 'Informe se virou cliente' })
  becameCustomer: boolean;

  leadObjection: LeadObjections;

  @IsNumber({}, { message: 'Informe o valor em número' })
  valuePaid?: number;

  @IsNotEmpty({ message: 'Informe os segmentos de produto interessados' })
  @ArrayMinSize(1, { message: 'Informe no mínimo 1 segmento' })
  productSegmentsId: UUID[];

  productSegments: Product[];

  @IsNotEmpty({ message: 'Informe o atendente' })
  @IsUUID('all', { message: 'Informe um atendente válido' })
  salesPersonId: UUID;

  salesPerson: SalesPerson;

  @IsNotEmpty()
  @IsUUID()
  leadId: UUID;

  lead: Lead;
}
