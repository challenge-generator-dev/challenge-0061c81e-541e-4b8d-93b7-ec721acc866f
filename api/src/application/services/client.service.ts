import { Injectable, NotFoundException, BadRequestException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientEntity } from '../../domain/entities/client.entity';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';

@ApiTags('clients')
@Injectable()
export class ClientService {
  constructor(
    @Inject(forwardRef(() => ClientRepository))
    private readonly clientRepository: ClientRepository,
  ) {}

  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: ClientEntity })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados' })
  @ApiResponse({ status: 409, description: 'El cliente con este correo ya existe' })
  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const existingClient = await this.clientRepository.findByEmail(createClientDto.email);
    if (existingClient) {
      throw new ConflictException(
        `Ya existe un cliente con el correo electrónico: ${createClientDto.email}`
      );
    }

    const clientEntity = createClientDto.toEntity();
    clientEntity.validateInvariants();
    
    return await this.clientRepository.create(clientEntity);
  }

  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente', type: [ClientEntity] })
  async findAll(): Promise<ClientEntity[]> {
    return await this.clientRepository.findAll();
  }

  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID único del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente', type: ClientEntity })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findOne(id: string): Promise<ClientEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del cliente es requerido');
    }

    const client = await this.clientRepository.findOne(id);
    if (!client) {
      throw new NotFoundException(`No se encontró el cliente con ID: ${id}`);
    }

    return client;
  }

  @ApiOperation({ summary: 'Actualizar un cliente existente' })
  @ApiParam({ name: 'id', description: 'ID único del cliente', type: String })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente', type: ClientEntity })
  @ApiResponse({ status: 400, description: 'Datos inválidos proporcionados' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 409, description: 'El correo electrónico ya está en uso por otro cliente' })
  async update(id: string, updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del cliente es requerido');
    }

    const existingClient = await this.clientRepository.findOne(id);
    if (!existingClient) {
      throw new NotFoundException(`No se encontró el cliente con ID: ${id}`);
    }

    if (updateClientDto.email && updateClientDto.email !== existingClient.email) {
      const clientWithEmail = await this.clientRepository.findByEmail(updateClientDto.email);
      if (clientWithEmail) {
        throw new ConflictException(
          `El correo electrónico ${updateClientDto.email} ya está en uso por otro cliente`
        );
      }
    }

    const updatedEntity = updateClientDto.toEntity(existingClient);
    updatedEntity.validateInvariants();

    return await this.clientRepository.update(id, updatedEntity);
  }

  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID único del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async remove(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID del cliente es requerido');
    }

    const existingClient = await this.clientRepository.findOne(id);
    if (!existingClient) {
      throw new NotFoundException(`No se encontró el cliente con ID: ${id}`);
    }

    await this.clientRepository.delete(id);
  }

  @ApiOperation({ summary: 'Buscar cliente por correo electrónico' })
  @ApiParam({ name: 'email', description: 'Correo electrónico del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente', type: ClientEntity })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async findByEmail(email: string): Promise<ClientEntity | null> {
    if (!email || email.trim() === '') {
      throw new BadRequestException('El correo electrónico es requerido');
    }

    return await this.clientRepository.findByEmail(email);
  }
}