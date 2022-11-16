import { IsAlpha, IsEnum, IsString } from 'class-validator';
import { Privacity } from './privacity.enum';

export class UpdatePublicationDto {
  @IsString()
  @IsAlpha()
  title: string;

  @IsString()
  @IsAlpha()
  description: string;

  @IsEnum(Privacity, {
    each: true,
    message: `Please enter a valid privacity ${Privacity.PUBLIC})`,
  })
  privacity: string[];
}
