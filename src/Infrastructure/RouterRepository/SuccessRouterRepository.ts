import { InterfaceInfo, RouterRepository } from "Core";
import { Either } from "Core/Language";

export class SuccessRouterRepository implements RouterRepository {
  constructor(
    private routers: string[],
    private interfaces: string[],
    private interfaceInfo: InterfaceInfo
  ) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.right(this.routers);
  }

  async getInterfaces(): Promise<Either.Type<string, string[]>> {
    return Either.right(this.interfaces);
  }

  async getInterfaceInfo(): Promise<Either.Type<string, InterfaceInfo>> {
    return Either.right(this.interfaceInfo);
  }

  async updateInterfaceUp(): Promise<Either.Type<string, InterfaceInfo>> {
    return Either.right(this.interfaceInfo);
  }
}
