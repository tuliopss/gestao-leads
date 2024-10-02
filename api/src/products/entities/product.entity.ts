import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductSegments } from '../enums/product-segment.enum';
import { CustomerService } from 'src/customer-services/entities/customer-service.entity';
@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ProductSegments,
    nullable: true,
  })
  segment: ProductSegments;

  @ManyToMany(
    () => CustomerService,
    (customerService) => customerService.productSegments,
  )
  customerServices: CustomerService[];
}
