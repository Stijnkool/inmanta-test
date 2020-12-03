import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class SuccessRouterRepository implements RouterRepository {
  constructor(private routers: string[]) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.right(this.routers);
  }
}
