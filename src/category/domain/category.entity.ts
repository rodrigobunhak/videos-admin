import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { CategoryValidator, CategoryValidatorFactory } from "./category.validator";
import { EntityValidationError } from "src/shared/domain/validators/validation.error";
import { Entity } from "src/shared/domain/entity";
import { ValueObject } from "src/shared/domain/value-object";
import { CategoryFakeBuilder } from "./testing/category-fake.builder";

export type CategoryConstructorProps = {
  categoryId?: CategoryId;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
}

export type CategoryCreateProps = {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export class CategoryId extends Uuid {} 

export class Category extends Entity {
  categoryId: CategoryId;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.categoryId = props.categoryId ?? new CategoryId();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: CategoryCreateProps): Category {
    const category = new Category(props);
    Category.validate(category);
    return category;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  changeName(name: string): void {
    this.name = name; // validação de dados, eventos
    Category.validate(this);
  }

  changeDescription(description: string): void {
    this.description = description;
    Category.validate(this);
  }

  active(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

  toJSON() {
    return {
      category_id: this.categoryId.id,
      name: this.name,
      description: this.description,
      is_active: this.isActive,
      created_at: this.createdAt,
    };
  }

  get entityId(): ValueObject {
    return this.categoryId;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
}