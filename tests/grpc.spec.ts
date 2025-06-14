import { test, expect } from '@playwright/test';
import { create, getAll, update, remove, close } from '../grpc/grpc-crud';

test.describe('gRPC CRUD Operations', () => {
  test('should perform CRUD operations', async () => {
    try {
      // Create
      const createResponse = await create('test data');
      expect(createResponse).toBeDefined();
      expect(createResponse.f_string).toBeDefined();
      console.log('Create response:', createResponse);

      // Get all
      const getAllResponse = await getAll();
      expect(getAllResponse).toBeDefined();
      expect(getAllResponse.f_string).toBeDefined();
      console.log('Get all response:', getAllResponse);

      // Update
      const updateResponse = await update('test-id', 'updated data');
      expect(updateResponse).toBeDefined();
      expect(updateResponse.f_string).toBeDefined();
      console.log('Update response:', updateResponse);

      // Delete
      const deleteResponse = await remove('test-id');
      expect(deleteResponse).toBeDefined();
      expect(deleteResponse.f_string).toBeDefined();
      console.log('Delete response:', deleteResponse);
    } finally {
      // Ensure client is closed
      close();
    }
  });
}); 