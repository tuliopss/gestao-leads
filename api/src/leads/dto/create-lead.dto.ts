import { IsNotEmpty } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  whatsapp: string;
  seeAds: Boolean;
  becameCustomer: Boolean;
}
