import { Either } from "Core/Language";

export interface RouterRepository {
  getRouters(): Promise<Either.Type<string, string[]>>;
  getInterfaces(router: string): Promise<Either.Type<string, string[]>>;
}
