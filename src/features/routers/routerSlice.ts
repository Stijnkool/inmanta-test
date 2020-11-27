import { RemoteData } from "Core/Language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { routerRepository } from "deps";

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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const initRouters = (): AppThunk => async (dispatch) => {
  dispatch(set(RemoteData.loading()));
  const routers = await routerRepository.getRouters();
  dispatch(set(RemoteData.fromEither(routers)));
};

export default routersSlice.reducer;
