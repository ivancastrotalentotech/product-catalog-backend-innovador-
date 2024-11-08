import { Injectable } from '@nestjs/common';
import * as process from 'process';
import { Pool } from 'pg';
// @ts-ignore
@Injectable()
export class NeoPool extends Pool {
  constructor() {
    const poolConfig = {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      database: process.env.POSTGRES_DB || 'mydatabase',
      user: process.env.POSTGRES_USER || 'myuser',
      password: process.env.POSTGRES_PASSWORD || 'mypassword',
      ssl: {
        rejectUnauthorized: false, // Opción para no rechazar conexiones no autenticadas
      },
    };

    super(poolConfig);

    this.on('error', (err, client) => {
      console.error('Error in database connection:', err);
    });

    this.on('connect', (client) => {
      console.log('Client connected to database');
    });
  }

  async connectWithRetry(retries: number = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await this.connect();
        console.log('Connected to database');
        break;
      } catch (error) {
        console.error(`Connection attempt ${attempt} failed:`, error);
        if (attempt === retries) {
          console.error('All connection attempts failed. Exiting...');
          process.exit(1);  // Exit the application if all retries fail
        }
        await new Promise(res => setTimeout(res, 5000));  // Wait 5 seconds before retrying
      }
    }
  }

}

