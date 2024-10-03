import { Module } from '@nestjs/common';
import { SalespersonsService } from './salespersons.service';
import { SalespersonsController } from './salespersons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesPerson } from './entities/salesperson.entity';
import { LeadsModule } from 'src/leads/leads.module';

@Module({
  imports: [TypeOrmModule.forFeature([SalesPerson]), LeadsModule],
  controllers: [SalespersonsController],
  providers: [SalespersonsService],
  exports: [SalespersonsService],
})
export class SalespersonsModule {}
