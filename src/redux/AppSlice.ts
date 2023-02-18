import { createSlice } from '@reduxjs/toolkit';
import { YoutubeVideoSearch } from 'youtube.ts';
import { RootState } from '../app/store';

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
  nextPageToken: string;
  videosDetails: videoDetails[];
};

const getInitialState = () => {
  return {
    isFetchingVideos: false,
    nextPageToken: '',
    videosDetails: [] as videoDetails[],
  } as AppState;
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: getInitialState(),
  reducers: {
    getVideos(state, action) {
      state.isFetchingVideos = true;
    },
    setVideos(state, action) {
      let _payload = action.payload as YoutubeVideoSearch;
      let items = _payload.items.map((item) => {
        return {
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          videoDescription: item.snippet.description,
          thumbnailImageUrl: item.snippet.thumbnails.default.url,
        } as videoDetails;
      });

      const newState = {
        nextPageToken: _payload.nextPageToken,
        videosDetails: [...state.videosDetails, ...items],
      };

      return { ...state, ...newState };
    },
    setVideosError(state, action) {},
  },
});

export const { getVideos, setVideos, setVideosError } = appSlice.actions;
export default appSlice.reducer;
export const selectAppState = (state: RootState) => state.appState;
