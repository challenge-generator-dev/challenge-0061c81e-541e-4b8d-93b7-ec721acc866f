import { IsString, IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class ClientEntity {
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  constructor(
    name: string,
    lastName: string,
    email: string,
    phone?: string,
    address?: string,
    id?: string
  ) {
    this.id = id || uuidv4();
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    if (!this.lastName || this.lastName.trim().length === 0) {
      throw new Error('Last name cannot be empty');
    }
    if (!this.email || !this.email.includes('@')) {
      throw new Error('Invalid email format');
    }
  }

  updateDetails(updateData: {
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
  }): void {
    if (updateData.name !== undefined) {
      this.name = updateData.name;
    }
    if (updateData.lastName !== undefined) {
      this.lastName = updateData.lastName;
    }
    if (updateData.email !== undefined) {
      this.email = updateData.email;
    }
    if (updateData.phone !== undefined) {
      this.phone = updateData.phone;
    }
    if (updateData.address !== undefined) {
      this.address = updateData.address;
    }
    this.validateInvariants();
  }
}