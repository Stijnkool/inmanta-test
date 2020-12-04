import { RemoteData } from "./Language";

export interface Router {
  id: string;
  open: boolean;
  interfaces: RemoteData.Type<string, string[]>;
}

export interface Interface {
  id: string;
  info: RemoteData.Type<string, InterfaceInfo>;
}

export interface InterfaceInfo {
  up: boolean;
  mtu: number;
  address: Address[];
}

export interface Address {
  address: string;
  prefixlen: number;
  family: string;
}
