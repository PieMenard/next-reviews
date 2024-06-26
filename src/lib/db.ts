import { PrismaClient } from '@prisma/client';

// Extend the NodeJS global interface to include prismaClient
declare global {
  var prismaClient: PrismaClient | undefined;
}

export const db = createPrismaClient();

function createPrismaClient(): PrismaClient {
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient({
      // log: [{ emit: 'stdout', level: 'query' }],
    });
  }
  return global.prismaClient;
}
