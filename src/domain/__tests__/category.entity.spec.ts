import { Category } from "../category.entity"

describe('🧪 Category Unit Tests', () => {
  describe('constructor', () => {
    test('should create a category with default values', () => {
      const category = new Category({
        categoryId: '123',
        name: 'movie name test'
      })
      expect(category.categoryId).toBeDefined();
      expect(category.name).toBe('movie name test');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    })
    test('should create a category with all values', () => {
      const createdAt = new Date();
      const category = new Category({
        categoryId: '123',
        name: 'movie name test',
        description: 'movie description test',
        isActive: false,
        createdAt: createdAt
      });
      expect(category.categoryId).toBeDefined();
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
      expect(category.categoryId).toBeDefined();
      expect(category.name).toBe('category name test');
      expect(category.description).toBeNull();
      expect(category.isActive).toBeTruthy();
      expect(category.createdAt).toBeInstanceOf(Date);
    })

    test('should create a category with all values', () => {
      const category = Category.create({
        name: 'category name test',
        description: 'category description test',
        isActive: false,
      })
      expect(category.categoryId).toBeDefined();
      expect(category.name).toBe('category name test');
      expect(category.description).toBe('category description test');
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBeInstanceOf(Date);
    })
  })

  test('should change name', () => {
    const category = Category.create({
      name: 'category name test'
    })
    category.changeName('name updated');
    expect(category.name).toBe('name updated');
  })

  test('should change description', () => {
    const category = Category.create({
      name: 'category name test'
    })
    category.changeDescription('description updated');
    expect(category.description).toBe('description updated');
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