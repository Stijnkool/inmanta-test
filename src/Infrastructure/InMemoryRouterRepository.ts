import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class InMemoryRouterRepository implements RouterRepository {
  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.right(["cloud1", "cloud2"]);
  }
}
