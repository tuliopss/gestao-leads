import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('CustomerService')
export class CustomerService {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @Column('date')
  date: Date;

  @ManyToOne(() => SalesPerson, (salesPerson) => salesPerson.id)
  salesPerson: SalesPerson;

  @OneToOne(() => Lead, (lead) => lead.id)
  lead: Lead;

  @Column('boolean')
  seeAds: Boolean;

  @Column('boolean')
  becameCustomer: Boolean;

  @Column({
    type: 'enum',
    enum: LeadObjections,
  })
  leadObjection: LeadObjections;

  @Column('float')
  valuePaid: Number;
}
