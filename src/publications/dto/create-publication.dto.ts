import { IsAlpha, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsAlpha()
  title: string;

  @IsString()
  @IsAlpha()
  description: string;
}
