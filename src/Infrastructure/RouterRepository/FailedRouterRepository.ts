import { InterfaceInfo, RouterRepository } from "Core";
import { Either } from "Core/Language";

export class FailedRouterRepository implements RouterRepository {
  constructor(private errorMessage: string) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return Either.left(this.errorMessage);
  }

  async getInterfaces(): Promise<Either.Type<string, string[]>> {
    return Either.left(this.errorMessage);
  }

  async getInterfaceInfo(): Promise<Either.Type<string, InterfaceInfo>> {
    return Either.left(this.errorMessage);
  }

  async updateInterfaceUp(): Promise<Either.Type<string, InterfaceInfo>> {
    return Either.left(this.errorMessage);
  }
}
