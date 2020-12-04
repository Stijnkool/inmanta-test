import { Either, RemoteData } from "Core/Language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "UserInterface/store";
import { RouterRepository } from "Core";
import { getInterfaceInfoForRouter, initInterfaces } from "./interfaces";

export interface Router {
  id: string;
  open: boolean;
  interfaces: RemoteData.Type<string, string[]>;
}

export type Routers = Record<string, Router>;

interface RoutersState {
  data: RemoteData.Type<string, Routers>;
}

const initialState: RoutersState = { data: RemoteData.notAsked() };

export const routersSlice = createSlice({
  name: "routers",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<RemoteData.Type<string, string[]>>) => {
      state.data = RemoteData.mapSuccess<string, string[], Routers>(
        idsToRouters
      )(action.payload);
    },
    openAll: (state) => {
      const { data } = state;
      if (!RemoteData.isSuccess(data)) return;
      const { value: routers } = data;
      for (const router in routers) {
        routers[router].open = true;
      }
    },
    closeAll: (state) => {
      const { data } = state;
      if (!RemoteData.isSuccess(data)) return;
      const { value: routers } = data;
      for (const router in routers) {
        routers[router].open = false;
      }
    },
    toggle: (state, action: PayloadAction<string>) => {
      const { data } = state;
      if (!RemoteData.isSuccess(data)) return;
      const { value: routers } = data;
      routers[action.payload].open = !routers[action.payload].open;
    },
    setInterfaces: (
      state,
      action: PayloadAction<[string, RemoteData.Type<string, string[]>]>
    ) => {
      const { data } = state;
      if (!RemoteData.isSuccess(data)) return;
      const { value: routers } = data;
      const [routerId, interfaces] = action.payload;
      routers[routerId].interfaces = interfaces;
    },
  },
});

function idsToRouters(ids: string[]): Routers {
  const routers: Routers = {};
  ids.forEach((id) => {
    routers[id] = {
      id,
      open: false,
      interfaces: RemoteData.notAsked(),
    };
  });
  return routers;
}

export const {
  set,
  setInterfaces,
  openAll,
  closeAll,
  toggle,
} = routersSlice.actions;

export const selectRouterList = (
  state: RootState
): RemoteData.Type<string, Router[]> =>
  RemoteData.mapSuccess<string, Routers, Router[]>(routersToRouterList)(
    state.routers.data
  );

function routersToRouterList(routers: Routers): Router[] {
  return Object.values(routers);
}

export const initRouters = (
  routerRepository: RouterRepository
): AppThunk => async (dispatch) => {
  dispatch(set(RemoteData.loading()));
  const routers = await routerRepository.getRouters();
  dispatch(set(RemoteData.fromEither(routers)));
};

export const toggleWithFetch = (
  routerRepository: RouterRepository,
  routerId: string
): AppThunk => async (dispatch, getState) => {
  dispatch(toggle(routerId));
  const { data } = getState().routers;
  if (!RemoteData.isSuccess(data)) return;
  const { value: routers } = data;
  const router = routers[routerId];

  if (RemoteData.isNotAsked(router.interfaces)) {
    const interfaces = await routerRepository.getInterfaces(routerId);
    dispatch(setInterfaces([routerId, RemoteData.fromEither(interfaces)]));
    if (Either.isRight(interfaces)) {
      dispatch(initInterfaces([routerId, interfaces.value]));
      dispatch(getInterfaceInfoForRouter(routerRepository, routerId));
    }
  }

  if (RemoteData.isSuccess(router.interfaces)) {
    dispatch(getInterfaceInfoForRouter(routerRepository, routerId));
  }
};

export const openAllWithFetch = (
  routerRepository: RouterRepository
): AppThunk => async (dispatch, getState) => {
  dispatch(openAll());
  const { data } = getState().routers;
  if (!RemoteData.isSuccess(data)) return;
  const { value: routers } = data;
  Object.values(routers).forEach(async (router) => {
    if (!RemoteData.isNotAsked(router.interfaces)) return;
    const interfaces = await routerRepository.getInterfaces(router.id);
    dispatch(setInterfaces([router.id, RemoteData.fromEither(interfaces)]));
  });
};
