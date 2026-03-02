import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

describe('Services API', () => {
  const API_URL = 'http://localhost:4001';
  let authToken: string;
  let testServiceId: string;

  beforeAll(async () => {
    // Логин для получения токена
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@qlink.com',
        password: 'Test123!',
      }),
    });
    const data: any = await response.json();
    authToken = data.token;
  });

  describe('POST /api/services', () => {
    it('должен создать новую услугу', async () => {
      const response = await fetch(`${API_URL}/api/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: 'Тестовая услуга',
          category: 'Тест',
          price: '1500',
          duration: '60',
          description: 'Описание тестовой услуги',
        }),
      });

      expect(response.status).toBe(201);
      const data: any = await response.json();
      expect(data.success).toBe(true);
      expect(data.service).toBeDefined();
      expect(data.service.name).toBe('Тестовая услуга');
      expect(data.service.price).toBe(1500);
      
      testServiceId = data.service.id;
    });

    it('должен вернуть ошибку без токена', async () => {
      const response = await fetch(`${API_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Услуга',
          category: 'Тест',
          price: '1000',
          duration: '30',
        }),
      });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/services', () => {
    it('должен вернуть список услуг', async () => {
      const response = await fetch(`${API_URL}/api/services`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      const data: any = await response.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /api/services/:id', () => {
    it('должен обновить услугу', async () => {
      const response = await fetch(`${API_URL}/api/services/${testServiceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: 'Обновленная услуга',
          price: 2000,
        }),
      });

      expect(response.status).toBe(200);
      const data: any = await response.json();
      expect(data.name).toBe('Обновленная услуга');
      expect(data.price).toBe(2000);
    });
  });

  describe('DELETE /api/services/:id', () => {
    it('должен удалить услугу', async () => {
      const response = await fetch(`${API_URL}/api/services/${testServiceId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect(response.status).toBe(200);
      const data: any = await response.json();
      expect(data.message).toBeDefined();
    });

    it('удаленная услуга не должна быть в списке', async () => {
      const response = await fetch(`${API_URL}/api/services`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      const data: any = await response.json();
      const deletedService = data.find((s: any) => s.id === testServiceId);
      expect(deletedService).toBeUndefined();
    });
  });
});
