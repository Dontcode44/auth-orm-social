import { IsAlpha, IsOptional, IsString } from "class-validator";

export class FilterNameLastnameDto {
  @IsString()
  @IsAlpha()
  name: string;

  @IsOptional()
  @IsString()
  @IsAlpha()
  lastname: string;
}
