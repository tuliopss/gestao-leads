import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty({ message: 'Insira um nome.' })
  name: string;

  @IsNotEmpty({ message: 'Informe o número de WhatsApp' })
  whatsapp: string;

  @IsNotEmpty({ message: 'Informe o número de CPF/CNPJ' })
  @MaxLength(14, { message: 'Insira um CPF/CNPJ válido' })
  cpfOrCnpj: string;
}
