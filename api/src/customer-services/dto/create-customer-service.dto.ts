import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';

export class CreateCustomerServiceDto {
  date: Date;
  salesPerson: SalesPerson;
  salesPersonId: UUID;
  seeAds: Boolean;
  becameCustomer: Boolean;
  leadObjection: LeadObjections;
  valuePaid?: Number;
  leadId: UUID;
  lead: Lead;
}
