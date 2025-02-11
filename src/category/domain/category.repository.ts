import { IRepository } from "src/shared/domain/repository/repository-interface";
import { Category } from "./category.entity";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";

export interface ICategoryInterface extends IRepository<Category, Uuid> {}