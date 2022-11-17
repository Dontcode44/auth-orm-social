import { IsAlpha, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateProfileDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  lastname: string;

  @IsNotEmpty()
  birthdate: Date;
}
