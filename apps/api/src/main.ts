/**
 * Hayyak Asia 2030 API Server
 *
 * Main entry point for the backend API using Fastify.
 */

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const HOST = process.env.HOST || '0.0.0.0';

async function buildServer() {
  const fastify = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  });

  // Security middleware
  await fastify.register(helmet);

  // CORS configuration
  await fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Health check endpoint
  fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // API version info
  fastify.get('/api/v1', async () => {
    return {
      name: 'Hayyak Asia 2030 API',
      version: '1.0.0',
      documentation: '/api/v1/docs',
    };
  });

  // Events endpoints
  fastify.get('/api/v1/events', async (request, reply) => {
    // Placeholder - will connect to Prisma
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        perPage: 20,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    };
  });

  // Venues endpoints
  fastify.get('/api/v1/venues', async (request, reply) => {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        perPage: 20,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    };
  });

  // Sports endpoints
  fastify.get('/api/v1/sports', async (request, reply) => {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        perPage: 50,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    };
  });

  // Countries/Culture endpoints
  fastify.get('/api/v1/culture/countries', async (request, reply) => {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        perPage: 50,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    };
  });

  // Transport endpoints
  fastify.get('/api/v1/transport/routes', async (request, reply) => {
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        perPage: 20,
        totalPages: 0,
        timestamp: new Date().toISOString(),
      },
    };
  });

  // Emergency contacts endpoint
  fastify.get('/api/v1/emergency/contacts', async (request, reply) => {
    return {
      data: [
        {
          id: '1',
          contactType: 'police',
          phoneNumber: '999',
          isPrimary: true,
          name: 'Police Emergency',
        },
        {
          id: '2',
          contactType: 'ambulance',
          phoneNumber: '999',
          isPrimary: true,
          name: 'Medical Emergency',
        },
        {
          id: '3',
          contactType: 'fire',
          phoneNumber: '999',
          isPrimary: true,
          name: 'Fire Department',
        },
      ],
      meta: {
        timestamp: new Date().toISOString(),
      },
    };
  });

  return fastify;
}

async function start() {
  const server = await buildServer();

  try {
    await server.listen({ port: PORT, host: HOST });
    console.log(`🚀 Hayyak Asia 2030 API running at http://${HOST}:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
