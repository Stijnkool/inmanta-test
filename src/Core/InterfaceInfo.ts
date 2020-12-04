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
