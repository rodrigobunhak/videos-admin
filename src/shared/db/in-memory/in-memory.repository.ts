import { IRepository } from "src/shared/domain/repository/repository-interface";
import { Entity } from "src/shared/domain/entity";
import { ValueObject } from "src/shared/domain/value-object";

export abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject> implements IRepository<E, EntityId> {
  
  items: E[] = [];
  
  async save(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkSave(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) => item.entityId.equals(entity.entityId));
    if (indexFound === -1) throw new Error("Entity not found");
    this.items[indexFound] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) => item.entityId.equals(entityId));
    if (indexFound === -1) throw new Error("Entity not found");
    this.items.splice(indexFound, 1);
  }

  async findById(entityId: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entityId.equals(entityId));
    return item ?? null;
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
}