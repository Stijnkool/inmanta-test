import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class SuccessRouterRepository implements RouterRepository {
  constructor(private routers: string[], private interfaces: string[]) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.right(this.routers);
  }

  async getInterfaces(): Promise<Either.Type<string, string[]>> {
    return Either.right(this.interfaces);
  }
}
