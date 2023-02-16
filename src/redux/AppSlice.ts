import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type AppState = {
  isFetchingVideosSuccess: boolean;
};

const getInitialState = () => {
  return {
    isFetchingVideosSuccess: false,
  } as AppState;
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: getInitialState(),
  reducers: {
    getVideos(state, action) {},
    setVideos(state, action) {},
    setVideosError(state, action) {},
  },
});

export const { getVideos, setVideos, setVideosError } = appSlice.actions;
export default appSlice.reducer;
export const selectAppState = (state: RootState) => state.appState;
