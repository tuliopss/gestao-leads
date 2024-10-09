import { UUID } from 'crypto';
import { CustomerService } from 'src/customer-services/entities/customer-service.entity';
import { Lead } from 'src/leads/entities/lead.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('SalesPerson')
export class SalesPerson {
  @PrimaryGeneratedColumn('uuid')
  id?: UUID;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text', { nullable: true })
  password: string;

  @OneToMany(() => Lead, (lead) => lead.salesPerson)
  leads: Lead[];

  @Column('float', { nullable: true })
  conversionRate: number;

  @OneToMany(
    () => CustomerService,
    (customerService) => customerService.salesPerson,
  )
  customerServices: CustomerService[];
}
