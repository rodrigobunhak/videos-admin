import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "../testing/category-fake.builder";
import { Category, CategoryId } from "../category.entity";
import { Chance } from "chance";

describe("CategoryFakeBuilder Unit Tests", () => {

  describe('categoryId prop', () => {
    const faker = CategoryFakeBuilder.aCategory();

    test('should throw error when categoryId is called without with method', () => {
      expect(() => faker.categoryId).toThrow(new Error("Property categoryId not have a factory, use 'with' methods"))
    })

    test('should be undefined', () => {
      expect(faker['_categoryId']).toBeUndefined();
    })

    test('should define categoryId using withId with prop', () => {
      const categoryId = new Uuid();
      const $this = faker.withId(categoryId);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect($this.categoryId).toBe(categoryId);
    })

    test('should define categoryId using withId with factory', () => {
      const categoryId = new Uuid();
      const $this = faker.withId(() => categoryId);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect($this.categoryId).toBe(categoryId);
    })

    test('should define categoryId of a list of categories using withId with factory', () => {
      const categoryId = new CategoryId();
      const mockCategoryIdFactory = jest.fn(() => categoryId);
      const fakerMany = CategoryFakeBuilder.theCategories(2);
      fakerMany.withId(mockCategoryIdFactory);
      fakerMany.build();
      expect(mockCategoryIdFactory).toHaveBeenCalledTimes(2);
      expect(fakerMany.build()[0].categoryId).toBe(categoryId);
      expect(fakerMany.build()[1].categoryId).toBe(categoryId);
    })
  });

  describe('name prop', () => {
    const fakerCategory = CategoryFakeBuilder.aCategory();
    const fakerCategories = CategoryFakeBuilder.theCategories(2);

    test('should be a function', () => {
      expect(typeof fakerCategory['_name']).toBe('function');
    })

    test('should define name dynamically with word method', () => {
      const chance = Chance();
      const spyWordMethod = jest.spyOn(chance, 'word');
      fakerCategory['chance'] = chance;
      fakerCategory.build();
      expect(spyWordMethod).toHaveBeenCalled();
      expect(typeof fakerCategory.build()['name']).toBe('string');
    })

    test('should define name using withName with prop', () => {
      const categoryName = 'abc';
      const $this = fakerCategory.withName(categoryName);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect($this.name).toBe(categoryName);
    })

    test('should use index parameter in withName callback to create a single category with sequential name', () => {
      fakerCategory.withName((index) => `test name ${index}`);
      const category = fakerCategory.build();
      expect(category.name).toBe('test name 0');
    })

    test('should use index parameter in withName callback to create multiple categories with sequential names', () => {
      fakerCategories.withName((index) => `test name ${index}`);
      const categories = fakerCategories.build();
      expect(categories[0].name).toBe('test name 0');
      expect(categories[1].name).toBe('test name 1');
    })

    test('should define name too long without prop', () => {
      fakerCategory.withInvalidNameTooLong();
      expect(fakerCategory['_name'].length).toBe(256);
    })

    test('should define name too long using prop', () => {
      const longName = 'a'.repeat(256);
      fakerCategory.withInvalidNameTooLong(longName);
      expect(fakerCategory['_name'].length).toBe(256);
      expect(fakerCategory['_name']).toBe(longName);
    })
  })

  describe('description prop', () => {
    const fakerCategory = CategoryFakeBuilder.aCategory();
    const fakerCategories = CategoryFakeBuilder.theCategories(2);

    test('should be a function', () => {
      expect(typeof fakerCategory['_description']).toBe('function');
    })

    test('should define description dynamically with paragraph method', () => {
      const chance = Chance();
      const spyParagraphMethod = jest.spyOn(chance, 'paragraph');
      fakerCategory['chance'] = chance;
      fakerCategory.build();
      expect(spyParagraphMethod).toHaveBeenCalled();
      expect(typeof fakerCategory.build()['description']).toBe('string');
    })

    test('should define description using withName with prop', () => {
      const categoryDescription = 'abc';
      const $this = fakerCategory.withDescription(categoryDescription);
      expect($this).toBeInstanceOf(CategoryFakeBuilder);
      expect($this.description).toBe(categoryDescription);
    })

    test('should use index parameter in withDescription callback to create a single category with sequential description', () => {
      fakerCategory.withDescription((index) => `test description ${index}`);
      const category = fakerCategory.build();
      expect(category.description).toBe('test description 0');
    })

    test('should use index parameter in withDescription callback to create multiple categories with sequential descriptions', () => {
      fakerCategories.withDescription((index) => `test description ${index}`);
      const categories = fakerCategories.build();
      expect(categories[0].description).toBe('test description 0');
      expect(categories[1].description).toBe('test description 1');
    })
  })

  describe('createdAt prop', () => {
    const fakerCategory = CategoryFakeBuilder.aCategory();
    const fakerCategories = CategoryFakeBuilder.theCategories(2);

    test('should throw error when createdAt is called without with method', () => {
      expect(() => fakerCategory.createdAt).toThrow(new Error("Property createdAt not have a factory, use 'with' methods"))
    })

    test('should be undefined', () => {
      expect(fakerCategory['_createdAt']).toBeUndefined();
    })

    test('should define createdAt using withCreatedAt with prop', () => {
      const createdAt = new Date();
      fakerCategory.withCreatedAt(createdAt);
      expect(fakerCategory.createdAt).toBe(createdAt);
    })

    test('should define createdAt using withCreatedAt with factory', () => {
      const createdAt = new Date();
      fakerCategory.withCreatedAt(() => createdAt);
      expect(fakerCategory.createdAt).toBe(createdAt);
    })

    test('should define createdAt of a list of categories using withCreatedAt with factory', () => {
      const createdAt = new Date();
      const mockCreatedAtFactory = jest.fn(() => createdAt);
      fakerCategories.withCreatedAt(mockCreatedAtFactory);
      fakerCategories.build();
      expect(mockCreatedAtFactory).toHaveBeenCalledTimes(2);
      expect(fakerCategories.build()[0].createdAt).toBe(createdAt);
      expect(fakerCategories.build()[1].createdAt).toBe(createdAt);
    })
  })

  describe('isActive prop', () => {
    const fakerCategory = CategoryFakeBuilder.aCategory();
    const fakerCategories = CategoryFakeBuilder.theCategories(2);
    test('should return true when isActive is called without with method', () => {
      expect(fakerCategory.isActive).toBeTruthy();
    })

    test('should define isActive as true when using activate method', () => {
      fakerCategory.activate();
      expect(fakerCategory.isActive).toBeTruthy();
    })

    test('should define isActive as false when using deactivate method', () => {
      fakerCategory.deactivate();
      expect(fakerCategory.isActive).toBeFalsy();
    })

    test('should define isActive as false of a list of categories using deactive method', () => {
      fakerCategories.deactivate();
      fakerCategories.build();
      expect(fakerCategories.build()[0].isActive).toBeFalsy();
      expect(fakerCategories.build()[1].isActive).toBeFalsy();
    })
  })

  test('should create one category', () => {
    const fakerCategory = CategoryFakeBuilder.aCategory();
    const categoryId = new CategoryId();
    const name = 'test name';
    const description = 'test description';
    const createdAt = new Date();
    const category = fakerCategory
      .withId(categoryId)
      .withName(name)
      .withDescription(description)
      .deactivate()
      .withCreatedAt(createdAt)
      .build();
    expect(category).toBeInstanceOf(Category);
    expect(category.categoryId).toBe(categoryId);
    expect(category.name).toBe(name);
    expect(category.description).toBe(description);
    expect(category.isActive).toBeFalsy();
    expect(category.createdAt).toBe(createdAt);
  })

  test('should create two categories', () => {
    const fakerCategories = CategoryFakeBuilder.theCategories(2);
    const categoryId = new CategoryId();
    const name = 'test name';
    const description = 'test description';
    const createdAt = new Date();
    const categories = fakerCategories
      .withId(categoryId)
      .withName((index) => name + index)
      .withDescription((index) => description + index)
      .deactivate()
      .withCreatedAt(createdAt)
      .build();
    expect(categories[0]).toBeInstanceOf(Category);
    expect(categories[0].categoryId).toBe(categoryId);
    expect(categories[0].name).toBe(name + 0);
    expect(categories[0].description).toBe(description + 0);
    expect(categories[0].isActive).toBeFalsy();
    expect(categories[0].createdAt).toBe(createdAt);
    expect(categories[1]).toBeInstanceOf(Category);
    expect(categories[1].categoryId).toBe(categoryId);
    expect(categories[1].name).toBe(name + 1);
    expect(categories[1].description).toBe(description + 1);
    expect(categories[1].isActive).toBeFalsy();
    expect(categories[1].createdAt).toBe(createdAt);
  })
});