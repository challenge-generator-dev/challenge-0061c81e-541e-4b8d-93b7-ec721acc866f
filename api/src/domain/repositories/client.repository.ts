import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findOne(id: string): Promise<ClientEntity | null>;
  update(id: string, client: ClientEntity): Promise<ClientEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<ClientEntity | null>;
}