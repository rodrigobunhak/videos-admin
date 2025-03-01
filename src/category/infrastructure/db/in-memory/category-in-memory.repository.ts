import { Category } from "src/category/domain/category.entity";
import { CategoryFilter, CategorySearchParams, ICategoryRepository } from "src/category/domain/category.repository";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { InMemorySearchableRepository } from "src/shared/infrastructure/db/in-memory/in-memory.repository";

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category, Uuid> implements ICategoryRepository {
  
  sortableFields: string[] = ['name', 'createdAt'];

  protected async applyFilter(items: Category[], filter: CategoryFilter): Promise<Category[]> {
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

  protected applySort(items: Category[], sort: CategorySearchParams["sort"], sortDir: CategorySearchParams["sortDir"]): Category[] {
    return sort ? super.applySort(items, sort, sortDir) : super.applySort(items, "createdAt", "desc");
  }
} 