import { Chance } from "chance";
import { Category } from "../category.entity";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";

type PropOrFactory<T> = T | ((index: number) => T);

export class CategoryFakeBuilder<TBuild> {

  private _categoryId: PropOrFactory<Uuid> | undefined = undefined;
  private _name: PropOrFactory<string> = (_index) => this.chance.word();
  private _description: PropOrFactory<string | null> = (_index) => this.chance.paragraph();
  private _isActive: PropOrFactory<boolean> = (_index) => true;
  private _createdAt: PropOrFactory<Date> | undefined = undefined;

  private countObjs: number;
  private chance: Chance.Chance;

  // Cria apenas uma categoria
  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  // Cria varias categorias passando a quantidade desejada
  static theCategories(countObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countObjs);
  }

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.chance = Chance();
  }

  public withUuid(valueOrFactory: PropOrFactory<Uuid>) {
    this._categoryId = valueOrFactory;
    return this;
  }

  public withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  public withDescription(valueOrFactory: PropOrFactory<string | null>) {
    this._description = valueOrFactory;
    return this;
  }
  
  public withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._createdAt = valueOrFactory;
    return this;
  }

  public withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  public activate() {
    this._isActive = true;
    return this;
  }

  public deactivate() {
    this._isActive = false;
    return this;
  }

  public build(): TBuild {
    const categories = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const category = new Category({
          categoryId: !this._categoryId ? undefined : this.callFactory(this._categoryId, index),
          name: this.callFactory(this._name, index),
          description: this.callFactory(this._description, index),
          isActive: this.callFactory(this._isActive, index),
          ...(this._createdAt && {
            created_at: this.callFactory(this._createdAt, index),
          }),
        });
        // category.validate();
        return category;
      });
    if (this.countObjs === 1) {
      return categories[0] as TBuild;
    }
    return categories as TBuild;
  }

  get categoryId() {
    return this.getValue("categoryId");
  }

  get name() {
    return this.getValue("name");
  }

  get description() {
    return this.getValue("description");
  }

  get isActive() {
    return this.getValue("isActive");
  }

  get createdAt() {
    return this.getValue("createdAt");
  }

  private getValue(prop: string) {
    const optional = ["categoryId", "createdAt"];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === "function" ? factoryOrValue(index) : factoryOrValue;
  }
}