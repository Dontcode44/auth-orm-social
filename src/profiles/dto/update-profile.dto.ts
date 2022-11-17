import { IsAlpha, IsNotEmpty } from "class-validator";

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  lastname: string;

  birthdate: Date;
}