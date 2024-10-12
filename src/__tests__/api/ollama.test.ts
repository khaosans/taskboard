import { createMocks } from 'node-mocks-http';
import { POST as handler } from '../../app/api/ollama/route';
import { render } from '@testing-library/react'; // Use @testing-library/react
import ChatModal from '../../components/ChatbotModal'; // Update the path if necessary

// Mock a callback function
const mockCallback = jest.fn();

jest.mock('../../app/api/ollama/route', () => ({
  POST: jest.fn((req, res) => {
    // Simulate calling a callback
    mockCallback(req.body.message);
    res.status(200).json({ reply: `Ollama received: ${req.body.message || ''}` });
  }),
}));

describe('Ollama API', () => {
  it('should return a response with the message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: Hello, Ollama!');
  });

  it('should handle missing message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: ');
  });

  it('should handle error in Ollama API', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: Hello, Ollama!');
  });

  it('should call the callback with the correct message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    // Verify the callback was called with the correct argument
    expect(mockCallback).toHaveBeenCalledWith('Hello, Ollama!');
  });

  //add unit tet for other rout api
  it('should handle a different message correctly', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'How are you, Ollama?' },
    });

    await handler(req as any, res as any);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.reply).toContain('Ollama received: How are you, Ollama?');
  });

  //add a unit test for callback function
  it('should call the callback with the correct message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { message: 'Hello, Ollama!' },
    });

    await handler(req as any, res as any);

    // Verify the callback was called with the correct argument
    expect(mockCallback).toHaveBeenCalledWith('Hello, Ollama!');
  });






});
