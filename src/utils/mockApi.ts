export class MockApiError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'MockApiError';
    this.status = status;
  }
}

export function mockDelay(minMs = 300, maxMs = 600) {
  const duration = minMs + Math.random() * (maxMs - minMs);
  return new Promise((resolve) => setTimeout(resolve, duration));
}

let mockIdCounter = 0;

export function createMockId(prefix: string) {
  mockIdCounter += 1;
  return `${prefix}-${Date.now()}-${mockIdCounter}`;
}

export function resetMockIdCounter() {
  mockIdCounter = 0;
}

export async function mockApiCall<T>(fn: () => T, minMs = 300, maxMs = 600): Promise<T> {
  await mockDelay(minMs, maxMs);
  return fn();
}

export function isFailTrigger(value: string) {
  return value.trim().toUpperCase() === 'FAIL';
}
