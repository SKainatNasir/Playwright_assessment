import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

type users = {
  id: number;
  name: string;
  email: string;
};

const db = new Pool({ connectionString: process.env.DATABASE_URL });


export const dbOps = {
  // Creates a new user with the given name and email
  async create(name: string, email: string): Promise<users> {
    const { rows } = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return rows[0];
  },

  // Retrieves all users from the database
  async getAll(): Promise<users[]> {
    const { rows } = await db.query('SELECT * FROM users ORDER BY id');
    return rows;
  },

  // Updates an existing user's information
  async update(id: number, name: string, email: string): Promise<users> {
    const { rows } = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (!rows[0]) throw new Error(`User ${id} not found`);
    return rows[0];
  },

  // Deletes a user from the database
  async delete(id: number): Promise<void> {
    const { rows } = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (!rows[0]) throw new Error(`User ${id} not found`);
  },

  // Closes the database connection pool
  async close(): Promise<void> {
    await db.end();
  }
};
