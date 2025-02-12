import { Category } from "src/category/domain/category.entity";
import { ValueObject } from "src/shared/domain/value-object";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { InMemoryRepository } from "src/shared/infrastructure/db/in-memory/in-memory.repository";

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid> {
  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}