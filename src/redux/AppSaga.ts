import { call, put, takeLatest } from 'redux-saga/effects';
import { getVideos, setVideos, setVideosError } from './AppSlice';
import { AxiosResponse } from 'axios';
import Youtube, { YoutubeVideoSearch } from 'youtube.ts';

export interface GetVideosPayload {
  searchQuery: string;
  maxResults: number;
  nextPageToken?: string;
}

const { REACT_APP_GOOGLE_API_KEY } = process.env;
const youtube = new Youtube(REACT_APP_GOOGLE_API_KEY);

export function requestGetVideos(searchQuery: string, maxResults: number, nextPageToken?: string) {
  return youtube.videos.search({ q: searchQuery, maxResults: maxResults, pageToken: nextPageToken });
}

export function* handleGetVideos(action: { type: typeof getVideos; payload: GetVideosPayload }) {
  try {
    const response: AxiosResponse<YoutubeVideoSearch> = yield call(requestGetVideos, action.payload.searchQuery, action.payload.maxResults, action.payload.nextPageToken);
    yield put(setVideos(response));
  } catch (error: any) {
    setVideosError({
      message: error?.response?.data?.message,
      statusCode: error?.response?.data?.statusCode,
    });
  }
}
export function* appSaga() {
  yield takeLatest(getVideos.type, handleGetVideos);
}
