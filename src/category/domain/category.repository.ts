import { IRepository, ISearchableRepository } from "src/shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { SearchParams } from "src/shared/domain/repository/search-params";
import { SearchResult } from "src/shared/domain/repository/search-result";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository extends ISearchableRepository<Category, Uuid, CategoryFilter, CategorySearchParams, CategorySearchResult> {}