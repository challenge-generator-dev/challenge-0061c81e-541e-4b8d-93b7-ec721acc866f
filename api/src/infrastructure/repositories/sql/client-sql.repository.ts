import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { ClientEntity } from '../../../domain/entities/client.entity';

@Injectable()
export class ClientSqlRepository implements ClientRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/clients_db'
        }
      }
    });
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    try {
      const existingClient = await this.prisma.client.findUnique({
        where: { email: client.email }
      });

      if (existingClient) {
        throw new ConflictException('Client with this email already exists');
      }

      const created = await this.prisma.client.create({
        data: {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          isActive: client.isActive
        }
      });

      return this.mapToEntity(created);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Failed to create client: ${error}`);
    }
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.prisma.client.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });

    return clients.map(client => this.mapToEntity(client));
  }

  async findOne(id: string): Promise<ClientEntity | null> {
    const client = await this.prisma.client.findUnique({
      where: { id }
    });

    if (!client) {
      return null;
    }

    return this.mapToEntity(client);
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity> {
    const existingClient = await this.prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    const emailExists = await this.prisma.client.findFirst({
      where: {
        email: client.email,
        NOT: { id }
      }
    });

    if (emailExists) {
      throw new ConflictException('Another client with this email already exists');
    }

    const updated = await this.prisma.client.update({
      where: { id },
      data: {
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
        isActive: client.isActive,
        updatedAt: new Date()
      }
    });

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    const existingClient = await this.prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.prisma.client.delete({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<ClientEntity | null> {
    const client = await this.prisma.client.findUnique({
      where: { email }
    });

    if (!client) {
      return null;
    }

    return this.mapToEntity(client);
  }

  private mapToEntity(data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): ClientEntity {
    const entity = new ClientEntity(
      data.name,
      data.email,
      data.phone,
      data.address || undefined,
      data.isActive
    );
    return entity;
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}