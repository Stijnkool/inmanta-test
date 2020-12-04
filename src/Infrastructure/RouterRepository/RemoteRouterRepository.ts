import { InterfaceInfo, RouterRepository } from "Core";
import { Either } from "Core/Language";

export class RemoteRouterRepository implements RouterRepository {
  constructor(private apiRoot: string) {}

  async getRouters(): Promise<Either.Type<string, string[]>> {
    return this.get(`${this.apiRoot}/`);
  }

  async getInterfaces(router: string): Promise<Either.Type<string, string[]>> {
    return this.get(`${this.apiRoot}/${router}/`);
  }

  async getInterfaceInfo(
    routerId: string,
    interfaceId: string
  ): Promise<Either.Type<string, InterfaceInfo>> {
    try {
      const response = await fetch(
        `${this.apiRoot}/${routerId}/${interfaceId}/state`
      );
      const json = await response.json();
      if (typeof json.interface === "undefined") {
        return Either.left("no interface property");
      }
      return Either.right(json.interface);
    } catch (e) {
      return Either.left(e.message);
    }
  }

  async updateInterfaceUp(
    routerId: string,
    interfaceId: string,
    up: boolean
  ): Promise<Either.Type<string, InterfaceInfo>> {
    try {
      const response = await fetch(
        `${this.apiRoot}/${routerId}/${interfaceId}/state`,
        {
          method: "POST",
          body: JSON.stringify({ up }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const json = await response.json();
      if (typeof json.interface === "undefined") {
        return Either.left("no interface property");
      }
      return Either.right(json.interface);
    } catch (e) {
      return Either.left(e.message);
    }
  }

  private async get<R>(url: string): Promise<Either.Type<string, R>> {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return Either.right(json);
    } catch (e) {
      return Either.left(e.message);
    }
  }
}
