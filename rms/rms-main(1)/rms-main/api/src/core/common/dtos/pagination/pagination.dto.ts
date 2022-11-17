import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number=10;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number=1;

  @IsOptional()
  empresa?:string;
}
