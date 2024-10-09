import { IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty({ message: 'Insira um nome.' })
  name: string;

  @IsNotEmpty({ message: 'Informe o número de WhatsApp' })
  whatsapp: string;
  seeAds: Boolean;
  becameCustomer: Boolean;
}
