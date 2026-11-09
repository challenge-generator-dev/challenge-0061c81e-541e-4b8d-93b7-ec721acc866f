import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from '../../application/services/client.service';
import { CreateClientDto } from '../../application/dtos/create-client.dto';
import { UpdateClientDto } from '../../application/dtos/update-client.dto';
import { ClientEntity } from '../../domain/entities/client.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiTags('clients')
  @ApiOperation({ summary: 'Create a new client' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Client successfully created',
    type: ClientEntity,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Client with this email already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiTags('clients')
  @ApiOperation({ summary: 'Get all clients' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all clients',
    type: [ClientEntity],
  })
  async findAll(): Promise<ClientEntity[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiTags('clients')
  @ApiOperation({ summary: 'Get a client by ID' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the client',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client found',
    type: ClientEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ClientEntity> {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  @ApiTags('clients')
  @ApiOperation({ summary: 'Update a client' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the client',
    type: String,
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Client successfully updated',
    type: ClientEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Client with this email already exists',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiTags('clients')
  @ApiOperation({ summary: 'Delete a client' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the client',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Client successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client not found',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.clientService.delete(id);
  }
}