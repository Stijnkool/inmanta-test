import { Either } from "Core/Language";
import { InterfaceInfo } from "./domain";

export interface RouterRepository {
  getRouters(): Promise<Either.Type<string, string[]>>;
  getInterfaces(router: string): Promise<Either.Type<string, string[]>>;
  getInterfaceInfo(
    routerId: string,
    interfaceId: string
  ): Promise<Either.Type<string, InterfaceInfo>>;
  updateInterfaceUp(
    routerId: string,
    interfaceId: string,
    up: boolean
  ): Promise<Either.Type<string, InterfaceInfo>>;
}
