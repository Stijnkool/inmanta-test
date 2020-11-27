import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class RemoteRouterRepository implements RouterRepository {
  constructor(private apiRoot: string) {}
  async getRouters(): Promise<Either.Type<string, string[]>> {
    try {
      const response = await fetch(this.apiRoot);
      const json = await response.json();
      return Either.right(json);
    } catch (e) {
      return Either.left(e.message);
    }
  }
}
