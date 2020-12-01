import { RemoteData } from "Core/Language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { RouterRepository } from "Core";

interface RoutersState {
  data: RemoteData.Type<string, string[]>;
}

const initialState: RoutersState = { data: RemoteData.notAsked() };

export const routersSlice = createSlice({
  name: "routers",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<RemoteData.Type<string, string[]>>) => {
      state.data = action.payload;
    },
  },
});

export const { set } = routersSlice.actions;

export const selectData = (state: RootState) => state.routers.data;

export const initRouters = (
  routerRepository: RouterRepository
): AppThunk => async (dispatch) => {
  dispatch(set(RemoteData.loading()));
  const routers = await routerRepository.getRouters();
  dispatch(set(RemoteData.fromEither(routers)));
};

export default routersSlice.reducer;
