import { Uuid } from "src/shared/domain/value-objects/uuid.vo";

export type CategoryConstructorProps = {
  categoryId?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
}

export type CategoryCreateProps = {
  name: string;
  description?: string;
  isActive?: boolean;
}

export class CategoryId extends Uuid {} 

export class Category {
  categoryId: CategoryId;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    this.categoryId = props.categoryId ? new CategoryId(props.categoryId) : new CategoryId();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: CategoryCreateProps): Category {
    return new Category(props)
  }

  changeName(name: string): void {
    this.name = name; // validação de dados, eventos
  }

  changeDescription(description: string): void {
    this.description = description;
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
}

// const cat = new Category({
//   categoryId: CategoryId.create()
// })