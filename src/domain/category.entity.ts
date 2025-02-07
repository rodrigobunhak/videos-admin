
export type CategoryConstructorProps = {
  categoryId: string;
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

export class Category {
  categoryId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    this.categoryId = props.categoryId;
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: CategoryCreateProps): Category {
    const categoryId = '123';
    return new Category({
      ...props,
      categoryId
    });
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
      category_id: this.categoryId,
      name: this.name,
      description: this.description,
      is_active: this.isActive,
      created_at: this.createdAt,
    };
  }
}