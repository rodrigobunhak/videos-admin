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