import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientRepository } from '../../../domain/repositories/client.repository';
import { ClientEntity } from '../../../domain/entities/client.entity';
import { ClientMongoose, ClientDocument } from './schemas/client.schema';

@Injectable()
export class ClientNosqlRepository implements ClientRepository {
  constructor(
    @InjectModel(ClientMongoose.name) private clientModel: Model<ClientDocument>
  ) {}

  async create(client: ClientEntity): Promise<ClientEntity> {
    const existingClient = await this.clientModel.findOne({ email: client.email }).exec();

    if (existingClient) {
      throw new ConflictException('Client with this email already exists');
    }

    const created = new this.clientModel({
      _id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      isActive: client.isActive,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const saved = await created.save();
    return this.mapToEntity(saved);
  }

  async findAll(): Promise<ClientEntity[]> {
    const clients = await this.clientModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();

    return clients.map(client => this.mapToEntity(client));
  }

  async findOne(id: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findById(id).exec();

    if (!client) {
      return null;
    }

    return this.mapToEntity(client);
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity> {
    const existingClient = await this.clientModel.findById(id).exec();

    if (!existingClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    const emailExists = await this.clientModel.findOne({
      email: client.email,
      _id: { $ne: id }
    }).exec();

    if (emailExists) {
      throw new ConflictException('Another client with this email already exists');
    }

    const updated = await this.clientModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            name: client.name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            isActive: client.isActive,
            updatedAt: new Date()
          }
        },
        { new: true }
      )
      .exec();

    if (!updated) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    const existingClient = await this.clientModel.findById(id).exec();

    if (!existingClient) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    await this.clientModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<ClientEntity | null> {
    const client = await this.clientModel.findOne({ email }).exec();

    if (!client) {
      return null;
    }

    return this.mapToEntity(client);
  }

  private mapToEntity(doc: ClientDocument): ClientEntity {
    const entity = new ClientEntity(
      doc.name,
      doc.email,
      doc.phone,
      doc.address,
      doc.isActive
    );
    return entity;
  }
}