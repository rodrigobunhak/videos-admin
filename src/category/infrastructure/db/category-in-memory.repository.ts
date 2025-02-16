import { Category } from "src/category/domain/category.entity";
import { SearchParams } from "src/shared/domain/repository/search-params";
import { ValueObject } from "src/shared/domain/value-object";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { InMemoryRepository, InMemorySearchableRepository } from "src/shared/infrastructure/db/in-memory/in-memory.repository";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> {
  
  sortableFields: string[] = ['name', 'createdAt'];

  protected async applyFilter(items: Category[], filter: string): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter((i) => {
      return (
        i.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  protected applySort(items: Category[], sort: SearchParams["sort"], sortDir: SearchParams["sortDir"]): Category[] {
    return sort ? super.applySort(items, sort, sortDir) : super.applySort(items, "createdAt", "desc");
  }
} 