import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Matches,  } from "class-validator";

export class QueryProductDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;

  @Matches(/^(stock|name)$/)
  @IsString()
  @IsOptional()
  order: string;

  @IsString()
  @IsOptional()
  name: string;
}
