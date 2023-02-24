import { createSlice } from '@reduxjs/toolkit';
import { YoutubeVideoSearch } from 'youtube.ts';
import { RootState } from '../app/store';
export interface ErrorType {
  message: string;
  statusCode: number;
}
export interface videoDetails {
  videoId: string;
  videoDescription: string;
  videoTitle: string;
  channelTitle: string;
  thumbnailImageUrl: string;
}

type AppState = {
  isFetchingVideos: boolean;
  isFetchingVideosSuccess: boolean;
  isFetchingVideosFailed: boolean;
  videosFetchError: ErrorType;
  videosDetails: videoDetails[];
};

const getInitialState = () => {
  return {
    isFetchingVideos: false,
    isFetchingVideosFailed: false,
    isFetchingVideosSuccess: false,
    videosFetchError: {} as ErrorType,
    videosDetails: [] as videoDetails[],
  } as AppState;
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: getInitialState(),
  reducers: {
    getVideos(state) {
      state.isFetchingVideos = true;
      state.isFetchingVideosFailed = false;
      state.isFetchingVideosSuccess = false;
      state.videosFetchError = {} as ErrorType;
    },
    setVideos(state, action) {
      let _payload = action.payload as YoutubeVideoSearch;
      let items = _payload.items.map((item) => {
        return {
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          videoDescription: item.snippet.description,
          thumbnailImageUrl: item.snippet.thumbnails.medium.url,
        } as videoDetails;
      });

      const newState = {
        videosDetails: [...state.videosDetails, ...items],
        isFetchingVideosSuccess: true,
        isFetchingVideos: false,
      };

      return { ...state, ...newState };
    },
    setVideosError(state, action) {
      const newState = {
        isFetchingVideosSuccess: false,
        isFetchingVideos: false,
        isFetchingVideosFailed: true,
        videosFetchError: action.payload,
      };

      return { ...state, ...newState };
    },
  },
});

export const { getVideos, setVideos, setVideosError } = appSlice.actions;
export default appSlice.reducer;
export const selectAppState = (state: RootState) => state.appState;
