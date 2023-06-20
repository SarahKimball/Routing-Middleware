const request = require('supertest');
const app = require('./app');

describe('Shopping List API', () => {
  let testItem;

  beforeEach(() => {
    testItem = { name: 'popsicle', price: 1.45 };
    items.length = 0; // Clear the items array before each test
  });

  test('GET /items - Get the list of shopping items', async () => {
    items.push(testItem);

    const response = await request(app).get('/items');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([testItem]);
  });

  test('POST /items - Add an item to the shopping list', async () => {
    const response = await request(app).post('/items').send(testItem);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ added: testItem });
    expect(items).toContainEqual(testItem);
  });

  test('GET /items/:name - Get a single item\'s name and price', async () => {
    items.push(testItem);

    const response = await request(app).get(`/items/${testItem.name}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testItem);
  });

  test('GET /items/:name - Return 404 if item not found', async () => {
    const response = await request(app).get(`/items/nonexistent`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });

  test('PATCH /items/:name - Update a single item\'s name and/or price', async () => {
    items.push(testItem);
    const updatedItem = { name: 'new popsicle', price: 2.45 };

    const response = await request(app)
      .patch(`/items/${testItem.name}`)
      .send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: updatedItem });
    expect(items).toContainEqual(updatedItem);
  });

  test('PATCH /items/:name - Return 404 if item not found', async () => {
    const updatedItem = { name: 'new popsicle', price: 2.45 };

    const response = await request(app)
      .patch(`/items/nonexistent`)
      .send(updatedItem);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });

  test('DELETE /items/:name - Delete a specific item', async () => {
    items.push(testItem);

    const response = await request(app).delete(`/items/${testItem.name}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
    expect(items).not.toContainEqual(testItem);
  });

  test('DELETE /items/:name - Return 404 if item not found', async () => {
    const response = await request(app).delete(`/items/nonexistent`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Item not found' });
  });
});
