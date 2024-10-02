import { UUID } from 'crypto';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadObjections } from 'src/leads/enums/lead-objection.enum';
import { Product } from 'src/products/entities/product.entity';
import { SalesPerson } from 'src/salespersons/entities/salesperson.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => Lead, (lead) => lead.customerService)
  lead: Lead;

  @ManyToMany(() => Product, (product) => product.customerServices)
  @JoinTable()
  productSegments: Product[];

  @Column('boolean')
  seeAds: Boolean;

  @Column('boolean', { default: false })
  becameCustomer: boolean;

  @Column({
    type: 'enum',
    enum: LeadObjections,
  })
  leadObjection: LeadObjections;

  @Column('float', { nullable: true })
  valuePaid: number;
}
