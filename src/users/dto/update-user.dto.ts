import { IsArray, IsEmail, IsEnum, IsNotEmpty, Length } from "class-validator";
import { AppRoles } from "src/app.roles";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `Please enter a valid roles ${AppRoles.ADMIN})`,
  })
  roles: string[];
}