import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'The name of the client', example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The last name of the client', example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The email of the client', example: 'juan.perez@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The phone number of the client', example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'The address of the client', example: '123 Main St', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    phone?: string,
    address?: string
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  toEntity(): ClientEntity {
    return new ClientEntity(
      this.name,
      this.lastName,
      this.email,
      this.phone,
      this.address
    );
  }
}