import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class FailedRouterRepository implements RouterRepository {
  constructor(private errorMessage: string) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.left(this.errorMessage);
  }
}
