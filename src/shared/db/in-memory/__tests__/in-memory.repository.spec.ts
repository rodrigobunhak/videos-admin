import { Entity } from "src/shared/domain/entity";
import { InMemoryRepository } from "../in-memory.repository";
import { Uuid } from "src/shared/domain/value-objects/uuid.vo";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

type StubEntityConstructor = {
  entityId: Uuid;
  name: string;
}

class StubEntity extends Entity {
  entityId: Uuid;
  name: string;
  
  constructor(props: StubEntityConstructor) {
    super();
    this.entityId = props.entityId || new Uuid();
    this.name = props.name;
  }
  
  toJSON() {
    return {
      entityId: this.entityId.id,
      name: this.name,
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository;
  })

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test'
    });
    await repository.save(entity);
    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  })

  test("should bulk save entities", async () => {
    const entities = [
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
    ]
    await repository.bulkSave(entities);
    expect(repository.items.length).toBe(3);
    expect(repository.items[0]).toBe(entities[0]);
    expect(repository.items[1]).toBe(entities[1]);
    expect(repository.items[2]).toBe(entities[2]);
  })

  test('should update an entity', async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test',
    });
    await repository.save(entity);
    const entityUpdated = new StubEntity({
      entityId: entity.entityId,
      name: 'test updated',
    });
    await repository.update(entityUpdated);
    expect(repository.items[0].toJSON()).toStrictEqual(entityUpdated.toJSON());
  })

  test('should throw error on update when entity not found', async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test',
    });
    await repository.save(entity);
    const entityUpdated = new StubEntity({
      entityId: new Uuid(),
      name: 'test updated',
    });
    expect(repository.update(entityUpdated)).rejects.toThrow(new NotFoundError(entity.entityId, StubEntity));
  })

  test('should delete an entity', async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test',
    });
    await repository.save(entity);
    await repository.delete(entity.entityId);
    expect(repository.items.length).toBe(0);
  })

  test('should throw error on delete when entity not found', async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test',
    });
    await repository.save(entity);
    const fakeId = new Uuid();
    expect(repository.delete(fakeId)).rejects.toThrow(new NotFoundError(fakeId, StubEntity));
  })

  test('should find an entity by id', async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: 'test',
    });
    await repository.save(entity);
    const entityFound = await repository.findById(entity.entityId);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  })

  test('should return null when an entity not found', async () => {
    const fakeId = new Uuid();
    const entityFound = await repository.findById(fakeId);
    expect(entityFound).toBeNull();
  })

  test('should find all entities', async () => {
    const entities = [
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
      new StubEntity({
        entityId: new Uuid(),
        name: 'test',
      }),
    ]
    await repository.bulkSave(entities);
    const entitiesFound = await repository.findAll();
    expect(entitiesFound.length).toBe(3);
    expect(entitiesFound[0].toJSON()).toStrictEqual(entities[0].toJSON());
    expect(entitiesFound[1].toJSON()).toStrictEqual(entities[1].toJSON());
    expect(entitiesFound[2].toJSON()).toStrictEqual(entities[2].toJSON());
  })
})