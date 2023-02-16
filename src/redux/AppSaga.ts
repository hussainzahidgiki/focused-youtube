import { call, put, takeLatest } from 'redux-saga/effects';
import { getVideos, setVideos, setVideosError } from './AppSlice';
import { AxiosResponse } from 'axios';
import Youtube, { YoutubeChannel } from 'youtube.ts';

const { GOOGLE_API_KEY } = process.env;
const youtube = new Youtube(GOOGLE_API_KEY);

export function requestGetVideos() {
  return youtube.channels.get('mkbhd');
}

export function* handleGetVideos(action: any) {
  try {
    const response: AxiosResponse<YoutubeChannel> = yield call(requestGetVideos);
    const { data } = response;

    yield put(setVideos(data));
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
