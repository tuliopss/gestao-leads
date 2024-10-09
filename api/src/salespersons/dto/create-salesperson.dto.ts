import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Lead } from 'src/leads/entities/lead.entity';

export class CreateSalespersonDto {
  @IsString({ message: 'Insira caracteres válidos' })
  @IsNotEmpty({ message: 'Insira um nome.' })
  name: string;

  @IsNotEmpty({ message: 'Insira um email' })
  @IsEmail({}, { message: 'Insira um email válido' })
  email: string;
  password: string;
  //   leads: Lead[];
}
