import { IsArray } from 'class-validator';
import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { Product } from 'src/products/entities/product.entity';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';

export class CreateCustomerServiceDto {
  date: Date;
  seeAds: Boolean;
  becameCustomer: boolean;
  leadObjection: LeadObjections;
  valuePaid?: number;
  productSegments: Product[];
  productSegmentsId: UUID[];
  salesPerson: SalesPerson;
  salesPersonId: UUID;
  leadId: UUID;
  lead: Lead;
}
