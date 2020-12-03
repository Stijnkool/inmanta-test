import { RouterRepository } from "Core";
import { Either } from "Core/Language";

export class LoadingRouterRepository implements RouterRepository {
  getRouters(): Promise<Either.Type<string, string[]>> {
    return new Promise(() => {});
  }

  getInterfaces(): Promise<Either.Type<string, string[]>> {
    return new Promise(() => {});
  }
}
