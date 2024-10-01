import { UUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadObjections } from '../enums/lead-objection.enum';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';
import { CustomerService } from 'src/customer-services/entities/customer-service.entity';

@Entity('Lead')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @Column('text')
  name: string;

  @Column('text')
  whatsapp: string;

  @Column('boolean')
  seeAds: Boolean;

  @Column('boolean')
  becameCustomer: Boolean;

  @ManyToOne(() => SalesPerson, (salesPerson) => salesPerson.leads)
  salesPerson: SalesPerson;

  @OneToOne(() => CustomerService, (customerService) => customerService.lead)
  customerService: CustomerService;
}
