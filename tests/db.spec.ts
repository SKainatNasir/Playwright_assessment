import { test, expect } from '@playwright/test';
import { dbOps } from '../database/db-crud';

test.describe('Database CRUD operations', () => {
  let userIds: number[] = [];

  test('should perform CRUD operations', async () => {
    try {
      // Create two users
      const user1 = await dbOps.create('Syeda', 'syeda@example.com');
      const user2 = await dbOps.create('Kainat', 'kainat@example.com');
      const user3 = await dbOps.create('nasir', 'nasir@example.com');
      userIds = [user1.id, user2.id, user3.id];

      // Read all users
      const users = await dbOps.getAll();
      expect(users.length).toBeGreaterThanOrEqual(2);
      expect(users.some(u => u.id === user1.id)).toBeTruthy();
      expect(users.some(u => u.id === user2.id)).toBeTruthy();
      expect(users.some(u => u.id === user3.id)).toBeTruthy();

      // Update first user
      const updated = await dbOps.update(user1.id, 'Syeda Updated', 'syeda.updated@example.com');
      expect(updated.name).toBe('Syeda Updated');
      expect(updated.email).toBe('syeda.updated@example.com');

      // Delete second user
      await dbOps.delete(user2.id);
      const remainingUsers = await dbOps.getAll();
      expect(remainingUsers.find(u => u.id === user2.id)).toBeUndefined();
      expect(remainingUsers.find(u => u.id === user1.id)).toBeDefined();
      expect(remainingUsers.find(u => u.id === user3.id)).toBeDefined();
    } finally {

      // Close database connection
      await dbOps.close();
    }
  });
});
