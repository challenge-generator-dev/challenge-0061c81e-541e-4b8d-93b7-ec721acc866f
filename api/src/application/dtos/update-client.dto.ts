import { IsString, IsEmail, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ClientEntity } from '../../domain/entities/client.entity';

export class UpdateClientDto {
  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  email?: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @MinLength(10, { message: 'El teléfono debe tener al menos 10 caracteres' })
  @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
  phone?: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: 'Calle Principal 123, Ciudad',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
  @MinLength(5, { message: 'La dirección debe tener al menos 5 caracteres' })
  @MaxLength(200, { message: 'La dirección no puede exceder 200 caracteres' })
  address?: string;

  @ApiProperty({
    description: 'Estado del cliente (activo/inactivo)',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  isActive?: boolean;

  constructor(partial: Partial<UpdateClientDto>) {
    Object.assign(this, partial);
  }

  toEntity(existingEntity: ClientEntity): ClientEntity {
    if (!existingEntity) {
      throw new Error('Se requiere una entidad existente para actualizar');
    }
    existingEntity.updateDetails({
      name: this.name,
      email: this.email,
      phone: this.phone,
      address: this.address,
      isActive: this.isActive,
    });
    return existingEntity;
  }
}