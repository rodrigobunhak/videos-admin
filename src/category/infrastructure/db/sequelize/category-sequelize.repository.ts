import { Category, CategoryId } from "src/category/domain/category.entity";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "src/category/domain/category.repository";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { CategoryModel } from "./category.model";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { Op } from "sequelize";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(private categoryModel: typeof CategoryModel) {}

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  async save(entity: Category): Promise<void> {
    await this.categoryModel.create({
      category_id: entity.categoryId.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.isActive,
      created_at: entity.createdAt
    })
  }

  async bulkSave(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(
      entities.map((entity) => ({
        category_id: entity.categoryId.id,
        name: entity.name,
        description: entity.description,
        is_active: entity.isActive,
        created_at: entity.createdAt
      }))
    )
  }

  async findById(categoryId: Uuid): Promise<Category | null> {
    const model = await this._get(categoryId.id);
    return new Category({
      categoryId: new CategoryId(model.category_id),
      name: model.name,
      description: model.description,
      isActive: model.is_active,
      createdAt: model.createdAt,
    });
  }

  private async _get(id: string) {
    return await this.categoryModel.findByPk(id);
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((model) => {
      return new Category({
        categoryId: new CategoryId(model.category_id),
        name: model.name,
        description: model.description,
        isActive: model.is_active,
        createdAt: model.createdAt,
      });
    });
  }

  async update(entity: Category): Promise<void> {
    const id = entity.categoryId.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.categoryModel.update({
      category_id: entity.categoryId.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.isActive,
      created_at: entity.createdAt
    }, {
      where: { category_id : id }
    });
  }

  async delete(categoryId: Uuid): Promise<void> {
    const id = categoryId.id;
    const model = await this._get(id);
    if (!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    await this.categoryModel.destroy({ where: { category_id: id }});
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;
    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%`},
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort))
        ? { order: [[props.sort, props.sortDir]] }
        : { order: [['created_at', 'desc']] },
      offset,
      limit,
    })
    return new CategorySearchResult({
      items: models.map((model) => {
        return new Category({
          categoryId: new CategoryId(model.category_id),
          name: model.name,
          description: model.description,
          isActive: model.is_active,
          createdAt: model.createdAt,
        });
      }),
      currentPage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }
}