import { PartialType } from '@nestjs/mapped-types';
import { CreateSalespersonDto } from './create-salesperson.dto';

export class UpdateSalespersonDto extends PartialType(CreateSalespersonDto) {
  name: string;
  email: string;
  password: string;
  conversionRate: number;
}
