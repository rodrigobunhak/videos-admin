import { ValueObject } from "../value-object";
import { v7 as uuidv7, validate as uuidValidade } from "uuid";

export class Uuid extends ValueObject {
  readonly id: string;
  
  constructor(id?: string) {
    super();
    this.id = id ?? uuidv7();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidade(this.id);
    if (!isValid) throw new InvalidUuidError();
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valid UUID");
    this.name = "InvalidUuidError"
  }
}