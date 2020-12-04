import { InterfaceInfo, RouterRepository } from "Core";
import { Either } from "Core/Language";

export class LoadingRouterRepository implements RouterRepository {
  getRouters(): Promise<Either.Type<string, string[]>> {
    return new Promise(() => {});
  }

  getInterfaces(): Promise<Either.Type<string, string[]>> {
    return new Promise(() => {});
  }

  getInterfaceInfo(): Promise<Either.Type<string, InterfaceInfo>> {
    return new Promise(() => {});
  }

  updateInterfaceUp(): Promise<Either.Type<string, InterfaceInfo>> {
    return new Promise(() => {});
  }
}
