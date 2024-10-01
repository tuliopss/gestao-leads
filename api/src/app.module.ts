import { Module } from '@nestjs/common';

import { LeadsModule } from './leads/leads.module';
import { SalespersonsModule } from './salespersons/salespersons.module';
import { CustomerServicesModule } from './customer-services/customer-services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer-services/entities/customer-service.entity';
import { SalesPerson } from './salespersons/entities/salesperson.entity';
import { Lead } from './leads/entities/lead.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      entities: [CustomerService, SalesPerson, Lead],
      synchronize: true,
    }),
    LeadsModule,
    SalespersonsModule,
    CustomerServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
