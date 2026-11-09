# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /clients`
  - `GET /clients`
  - `GET /clients/:id`
  - `PUT /clients/:id`
  - `DELETE /clients/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.findUnique`: Se invoca `findUnique` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.create`: Se invoca `create` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.findMany`: Se invoca `findMany` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.findFirst`: Se invoca `findFirst` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.update`: Se invoca `update` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.delete`: Se invoca `delete` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.delete`: Se invoca `delete` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261109090821814), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos
- Tiempo estimado: 6 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Crear operaciones CRUD en base de datos SQL — objetivo: Implementar operaciones básicas de CRUD en una base de datos SQL para gestionar información de clientes. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos SQL para clientes.
- Fase 2: Crear operaciones CRUD en base de datos NoSQL — objetivo: Implementar operaciones básicas de CRUD en una base de datos NoSQL para gestionar información de clientes. — entregable (NO resolver): Operaciones CRUD funcionales en una base de datos NoSQL para clientes.
- Fase 3: Comparación y optimización de operaciones CRUD — objetivo: Comparar las implementaciones de CRUD en bases de datos SQL y NoSQL, y optimizar las operaciones para mejorar el rendimiento y la eficiencia. — entregable (NO resolver): Informe comparativo y optimizado de las operaciones CRUD en bases de datos SQL y NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "api",
  "version": "1.0.0",
  "description": "API para gestión de clientes en bases de datos SQL y NoSQL",
  "main": "dist/src/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --debug --watch",
    "start:prod": "node dist/src/main.js",
    "lint": "eslint \"src/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev --name init"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/mongoose": "^10.0.4",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.3.0",
    "@prisma/client": "^5.10.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mongoose": "^8.1.1",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/uuid": "^9.0.8",
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "prisma": "^5.10.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".test.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}


// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Client Management API')
    .setDescription('API for managing clients in SQL and NoSQL databases')
    .setVersion('1.0')
    .addTag('clients')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();

// === ARCHIVO: api/src/domain/entities/client.entity.ts ===
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

// === ARCHIVO: api/src/domain/repositories/client.repository.ts ===
import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findOne(id: string): Promise<ClientEntity | null>;
  update(id: string, client: ClientEntity): Promise<ClientEntity>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<ClientEntity | null>;
}

// === ARCHIVO: api/src/application/dtos/create-client.dto.ts ===
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

// === ARCHIVO: api/src/application/dtos/update-client.dto.ts ===
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

// === ARCHIVO: api/src/application/services/client.service.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/schemas/client.schema.ts ===
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClientDocument = ClientMongoose & Document;

@Schema({ timestamps: true, collection: 'clients' })
export class ClientMongoose {
  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, index: true })
  phone: string;

  @Prop()
  address?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const ClientSchema = SchemaFactory.createForClass(ClientMongoose);

export const Client = ClientMongoose;

ClientSchema.index({ email: 1 }, { unique: true });
ClientSchema.index({ name: 1 });
ClientSchema.index({ phone: 1 });

ClientSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

// === ARCHIVO: api/src/infrastructure/repositories/sql/client-sql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/client-nosql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/controllers/client.controller.ts ===
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

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/prisma/schema.prisma ===
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Client {
  id        String   @id @default(uuid())
  firstName String   @map("first_name") @db.VarChar(100)
  lastName  String   @map("last_name") @db.VarChar(100)
  email     String   @unique @db.VarChar(255)
  phone     String?  @db.VarChar(20)
  address   String?  @db.Text
  city      String?  @db.VarChar(100)
  country   String?  @db.VarChar(100)
  postalCode String? @map("postal_code") @db.VarChar(20)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@index([lastName, firstName])
  @@index([createdAt])
  @@map("clients")
}

model AuditLog {
  id         String   @id @default(uuid())
  entityType String   @map("entity_type") @db.VarChar(50)
  entityId   String   @map("entity_id") @db.VarChar(255)
  action     String   @db.VarChar(50)
  oldData    Json?    @map("old_data")
  newData    Json?    @map("new_data")
  userId     String?  @map("user_id") @db.VarChar(255)
  timestamp  DateTime @default(now())
  ipAddress  String?  @map("ip_address") @db.VarChar(45)

  @@index([entityType, entityId])
  @@index([timestamp])
  @@index([userId])
  @@map("audit_logs")
}

// === ARCHIVO: api/.env ===
# ============ Application Configuration ============
APP_PORT=3000
NODE_ENV=development

# ============ PostgreSQL Configuration (SQL Database) ============
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=client_management_sql

# ============ MongoDB Configuration (NoSQL Database) ============
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=client_management_nosql
MONGODB_USER=mongoadmin
MONGODB_PASSWORD=mongopass

# ============ Prisma Configuration ============
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public

// === ARCHIVO: api/src/common/filters/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exception.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: Array.isArray(message) ? message : [message],
    });
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.59.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.22.1",
    "web-vitals": "^3.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.56",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^6.19.1",
    "@typescript-eslint/parser": "^6.19.1",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "typescript": "^5.3.3",
    "vite": "^5.1.3"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "@typescript-eslint",
      "react-hooks",
      "react-refresh"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        {
          "allowConstantExport": true
        }
      ]
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}


// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  },
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (import.meta.env.MODE === 'production') {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

// === ARCHIVO: client/src/App.tsx ===
import { Routes, Route } from 'react-router-dom';
import { ClientList } from '@/features/clients/components/ClientList';
import { ClientForm } from '@/features/clients/components/ClientForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestión de Clientes</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de gestión de clientes bancarios - CRUD operations" />
    <meta name="theme-color" content="#1976d2" />
    <title>Gestión de Clientes - Banco App</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.5;
        color: #333;
        background-color: #f5f5f5;
      }
      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #121212;
          color: #e0e0e0;
        }
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/features/clients/components/ClientList.tsx ===
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ClientEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientListProps {
  onError?: (message: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

export function ClientList({ onError }: ClientListProps) {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/clients`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar clientes';
      setClients([]);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(clientId: string) {
    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
      return;
    }

    try {
      setDeleteLoading(clientId);
      const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo eliminar el cliente`);
      }

      setClients((prev) => prev.filter((client) => client.id !== clientId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar cliente';
      onError?.(message);
    } finally {
      setDeleteLoading(null);
    }
  }

  if (isLoading) {
    return (
      <div className="client-list-loading" role="status" aria-label="Cargando clientes">
        <div className="spinner"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <section className="client-list-container" aria-labelledby="clients-title">
      <header className="client-list-header">
        <h1 id="clients-title">Gestión de Clientes</h1>
        <Link to="/clients/new" className="btn btn-primary" aria-label="Crear nuevo cliente">
          Nuevo Cliente
        </Link>
      </header>

      {clients.length === 0 ? (
        <div className="client-list-empty">
          <p>No hay clientes registrados.</p>
          <Link to="/clients/new">Registrar el primer cliente</Link>
        </div>
      ) : (
        <table className="client-table" aria-label="Lista de clientes">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Dirección</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                </td>
                <td>
                  <a href={`tel:${client.phone}`}>{client.phone}</a>
                </td>
                <td>{client.address}</td>
                <td className="actions">
                  <Link
                    to={`/clients/${client.id}`}
                    className="btn btn-secondary"
                    aria-label={`Ver detalles de ${client.name}`}
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/clients/${client.id}/edit`}
                    className="btn btn-secondary"
                    aria-label={`Editar ${client.name}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(client.id)}
                    disabled={deleteLoading === client.id}
                    aria-label={`Eliminar ${client.name}`}
                  >
                    {deleteLoading === client.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ClientList;

// === ARCHIVO: client/src/features/clients/components/ClientForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ClientEntity } from './ClientList';

export interface CreateClientDto {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ClientFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function ClientForm({ onSuccess, onError }: ClientFormProps) {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateClientDto>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      loadClient(id);
    }
  }, [id, isEditMode]);

  async function loadClient(clientId: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/clients/${clientId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Cliente no encontrado`);
      }
      const client: ClientEntity = await response.json();
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar cliente';
      onError?.(message);
      navigate('/clients');
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm(data: CreateClientDto): FormErrors {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.name.trim().length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'El formato del email no es válido';
      }
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
      if (!phoneRegex.test(data.phone)) {
        newErrors.phone = 'El formato del teléfono no es válido';
      }
    }

    if (!data.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    } else if (data.address.trim().length < 5) {
      newErrors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    return newErrors;
  }

  function handleInputChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const url = isEditMode
        ? `${API_BASE_URL}/clients/${id}`
        : `${API_BASE_URL}/clients`;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: No se pudo guardar el cliente`);
      }

      const savedClient: ClientEntity = await response.json();
      const successMessage = isEditMode
        ? `Cliente "${savedClient.name}" actualizado correctamente`
        : `Cliente "${savedClient.name}" creado correctamente`;

      onSuccess?.(successMessage);
      navigate(`/clients/${savedClient.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al guardar cliente';
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="client-form-loading" role="status" aria-label="Cargando formulario">
        <div className="spinner"></div>
        <p>Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <section className="client-form-container" aria-labelledby="form-title">
      <header className="client-form-header">
        <h1 id="form-title">
          {isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h1>
        <Link to="/clients" className="btn btn-secondary">
          Volver a la lista
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="client-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            maxLength={100}
            autoComplete="name"
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Teléfono <span aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <span id="phone-error" className="error-message" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Dirección <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? 'address-error' : undefined}
            rows={3}
            autoComplete="street-address"
          />
          {errors.address && (
            <span id="address-error" className="error-message" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar Cliente' : 'Crear Cliente'}
          </button>
          <Link to="/clients" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ClientForm;

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/App.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
