import { InvalidUuidError, Uuid } from "../uuid.vo";

describe('🧪 UUID Unit Tests', () => {
  const validadeSpy = jest.spyOn(Uuid.prototype as any, 'validate');

  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid');
    }).toThrow(new InvalidUuidError())
    expect(validadeSpy).toHaveBeenCalledTimes(1);
  })

  test('should create a valid uuid', () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(validadeSpy).toHaveBeenCalledTimes(1);
  })

  test('should accept a valid uuid', () => {
    const uuid = new Uuid('0194e6af-2406-72c7-95b9-2323f92b8651');
    expect(uuid.id).toBe('0194e6af-2406-72c7-95b9-2323f92b8651');
    expect(validadeSpy).toHaveBeenCalledTimes(1);
  })
})