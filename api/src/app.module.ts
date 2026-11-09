import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './infrastructure/controllers/client.controller';
import { ClientService } from './application/services/client.service';
import { ClientRepository } from './domain/repositories/client.repository';
import { ClientSqlRepository } from './infrastructure/repositories/sql/client-sql.repository';
import { ClientNosqlRepository } from './infrastructure/repositories/nosql/client-nosql.repository';
import { ClientMongoose, ClientSchema } from './infrastructure/repositories/nosql/schemas/client.schema';

const prismaClient = new PrismaClient();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/clientdb'),
    MongooseModule.forFeature([{ name: ClientMongoose.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: ClientRepository,
      useClass: process.env.DB_TYPE === 'nosql' ? ClientNosqlRepository : ClientSqlRepository,
    },
    ClientSqlRepository,
    ClientNosqlRepository,
    {
      provide: 'PRISMA_CLIENT',
      useValue: prismaClient,
    },
  ],
  exports: [ClientService, ClientRepository, 'PRISMA_CLIENT'],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await prismaClient.$connect();
      console.log('Prisma client connected to database');
    } catch (error) {
      console.error('Failed to connect Prisma client:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await prismaClient.$disconnect();
      console.log('Prisma client disconnected');
    } catch (error) {
      console.error('Failed to disconnect Prisma client:', error);
    }
  }
}