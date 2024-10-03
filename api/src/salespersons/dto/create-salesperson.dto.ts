import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Lead } from 'src/leads/entities/lead.entity';

export class CreateSalespersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  password: string;
  //   leads: Lead[];
}
