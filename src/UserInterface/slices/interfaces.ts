import { RemoteData } from "Core/Language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "UserInterface";
import { Interface, InterfaceInfo, RouterRepository } from "Core";

interface InterfacesState {
  byId: Record<string, Interface>;
  allIds: string[];
}

const initialState: InterfacesState = { byId: {}, allIds: [] };

export const interfacesSlice = createSlice({
  name: "interfaces",
  initialState,
  reducers: {
    initInterfaces: (state, action: PayloadAction<[string, string[]]>) => {
      const { byId } = state;
      const [routerId, interfaceIds] = action.payload;
      interfaceIds.forEach((interfaceId) => {
        if (typeof byId[id(routerId, interfaceId)] !== "undefined") return;
        byId[id(routerId, interfaceId)] = {
          id: interfaceId,
          info: RemoteData.notAsked(),
        };
      });
    },
    setInterfaceInfo: (
      state,
      action: PayloadAction<
        [string, string, RemoteData.Type<string, InterfaceInfo>]
      >
    ) => {
      const { byId } = state;
      const [routerId, interfaceId, info] = action.payload;
      const iface = byId[id(routerId, interfaceId)];

      if (typeof iface === "undefined") return;
      iface.info = info;
    },
  },
});

const seperator = "_?_";

function id(routerId: string, interfaceId: string) {
  return `${routerId}${seperator}${interfaceId}`;
}

function containsRouter(id: string, routerId: string): boolean {
  const [routerPart] = id.split(seperator);
  return routerPart === routerId;
}

export const { setInterfaceInfo, initInterfaces } = interfacesSlice.actions;

export const selectInterfacesById = (
  state: RootState
): Record<string, Interface> => state.interfaces.byId;

export const getInterfacesForRouter = (
  interfaces: Record<string, Interface>,
  routerId: string
): Interface[] => {
  const entries = Object.entries(interfaces);

  const filtered = entries.filter(([key, iface]) =>
    containsRouter(key, routerId)
  );

  return filtered.map(([key, value]) => value);
};

export const getInterfaceInfoForRouter = (
  routerRepository: RouterRepository,
  routerId: string
): AppThunk => async (dispatch, getState) => {
  const { data } = getState().routers;
  if (!RemoteData.isSuccess(data)) return;
  const { value: routers } = data;
  const router = routers[routerId];
  if (!RemoteData.isSuccess(router.interfaces)) return;

  const interfaces = router.interfaces.value;
  dispatch(initInterfaces([routerId, interfaces]));
  interfaces.forEach(async (interfaceId) => {
    dispatch(getInterfaceInfo(routerRepository, routerId, interfaceId));
  });
};

export const getInterfaceInfo = (
  routerRepository: RouterRepository,
  routerId: string,
  interfaceId: string
): AppThunk => async (dispatch) => {
  const info = await routerRepository.getInterfaceInfo(routerId, interfaceId);
  dispatch(
    setInterfaceInfo([routerId, interfaceId, RemoteData.fromEither(info)])
  );
};

export const toggleInterface = (
  routerRepository: RouterRepository,
  routerId: string,
  interfaceId: string
): AppThunk => async (dispatch, getState) => {
  const { byId } = getState().interfaces;
  const iface = byId[id(routerId, interfaceId)];

  if (typeof iface === "undefined") return;
  if (!RemoteData.isSuccess(iface.info)) return;

  const info = await routerRepository.updateInterfaceUp(
    routerId,
    interfaceId,
    !iface.info.value.up
  );
  dispatch(
    setInterfaceInfo([routerId, interfaceId, RemoteData.fromEither(info)])
  );
};
