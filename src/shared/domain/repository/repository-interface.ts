import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  save(entity: E): Promise<void>;
  bulkSave(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entityId: EntityId): Promise<void>;
  findById(entityId: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;
  getEntity(): new (...args: any[]) => E;
}