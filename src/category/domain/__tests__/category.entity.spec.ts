import { InvalidUuidError, Uuid } from "src/shared/domain/value-objects/uuid.vo"
import { Category, CategoryId } from "../category.entity"
import { v7 as uuidv7 } from "uuid";

describe('🧪 Category Unit Tests', () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        categoryId: uuidv7(),
        name: 'movie name test'
      })
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie name test');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    })
    test('should create a category with all values', () => {
      const createdAt = new Date();
      const category = new Category({
        categoryId: uuidv7(),
        name: 'movie name test',
        description: 'movie description test',
        isActive: false,
        createdAt: createdAt
      });
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('movie name test');
      expect(category.description).toBe('movie description test');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBe(createdAt);
    })
  })

  describe('create factory method', () => {
    test('should create a category with default values', () => {
      const category = Category.create({
        name: 'category name test'
      })
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('category name test');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    })

    test('should create a category with all values', () => {
      const category = Category.create({
        name: 'category name test',
        description: 'category description test',
        isActive: false,
      })
      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe('category name test');
      expect(category.description).toBe('category description test');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    })
  })

  describe('categoryId field', () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new CategoryId() }];

    test.each(arrange)('should be is %j', (props) => {
      const category = new Category(props as any);
      expect(category.categoryId).toBeInstanceOf(CategoryId);
    })
  })

  test('should change name', () => {
    const category = Category.create({
      name: 'category name test'
    })
    category.changeName('name updated');
    expect(category.name).toBe('name updated');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  })

  test('should change description', () => {
    const category = Category.create({
      name: 'category name test'
    })
    category.changeDescription('description updated');
    expect(category.description).toBe('description updated');
    expect(validateSpy).toHaveBeenCalledTimes(2);
  })

  test('should activate', () => {
    const category = Category.create({
      name: 'category name test',
      isActive: false,
    })
    category.active();
    expect(category.isActive).toBeTruthy();
  })

  test('should deactivate', () => {
    const category = Category.create({
      name: 'category name test'
    })
    category.deactivate();
    expect(category.isActive).toBeFalsy();
  })
})

describe('Category Validator', () => {
  describe('create method', () => {
    test('should show error messages when name is null', () => {
      expect(() => Category.create({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    test('should show error messages when name is bigger than 255', () => {
      expect(() => Category.create({ name: 'a'.repeat(256) })).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    test('should show error messages when name is an empty string', () => {
      expect(() => Category.create({ name: '' })).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })
    })

    test('should show error messages when description is an empty string', () => {
      expect(() => Category.create({ name: 'test', description: '' })).containsErrorMessages({
        description: [
          'description should not be empty',
        ]
      })
    })

    test('should show error messages when isActive is not a boolean', () => {
      expect(() => Category.create({ name: 'test', isActive: 'abc' as any })).containsErrorMessages({
        isActive: [
          'isActive must be a boolean value',
        ]
      })
      expect(() => Category.create({ name: 'test', isActive: 123 as any })).containsErrorMessages({
        isActive: [
          'isActive must be a boolean value',
        ]
      })
      expect(() => Category.create({ name: 'test', isActive: {} as any })).containsErrorMessages({
        isActive: [
          'isActive must be a boolean value',
        ]
      })
    })
  })

  describe('changeName method', () => {
    test('should show error messages when name is null', () => {
      const category = Category.create({ name: 'category name test' });
      expect(() => category.changeName(null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    test('should show error messages when name is bigger than 255', () => {
      const category = Category.create({ name: 'category name test' });
      expect(() => category.changeName('a'.repeat(256))).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      })
    })

    test('should show error messages when name is an empty string', () => {
      const category = Category.create({ name: 'category name test' });
      expect(() => category.changeName('')).containsErrorMessages({
        name: [
          'name should not be empty',
        ]
      })
    })
  })

  describe('changeDescription method', () => {
    test('should show error messages when description is an empty string', () => {
      const category = Category.create({ name: 'category test name'});
      expect(() => category.changeDescription('')).containsErrorMessages({
        description: [
          'description should not be empty',
        ]
      })
    })

    test('should show error messages when description is not a string', () => {
      const category = Category.create({ name: 'category test name'});
      expect(() => category.changeDescription(5 as any)).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      })
    })
  })
})