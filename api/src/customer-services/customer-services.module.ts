import { Module } from '@nestjs/common';
import { CustomerServicesService } from './customer-services.service';
import { CustomerServicesController } from './customer-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './entities/customer-service.entity';
import { LeadsModule } from 'src/leads/leads.module';
import { SalespersonsModule } from 'src/salespersons/salespersons.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerService]),
    LeadsModule,
    SalespersonsModule,
  ],

  controllers: [CustomerServicesController],
  providers: [CustomerServicesService],
})
export class CustomerServicesModule {}
