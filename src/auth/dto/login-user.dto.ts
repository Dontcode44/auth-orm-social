import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}