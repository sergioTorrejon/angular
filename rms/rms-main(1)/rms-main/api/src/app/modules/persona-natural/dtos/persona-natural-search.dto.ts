import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class PersonaNaturalSearchDto {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(10)
  nroIdentificacion?: string;
  

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  nombres?: string;

  @ApiProperty()
  @IsOptional()
  empresa?: string;
}
