import { ChangeEvent, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, selectAppState } from '../../redux/AppSlice';
import { GetVideosPayload } from '../../redux/AppSaga';
import VideoTile from '../../components/VideoTile/VideoTile';
import { Grid } from '@mui/material';
function Home() {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const { videosDetails } = useSelector(selectAppState);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 'calc(10px + 2vmin)',
        width: '80%',
      }}
    >
      <SearchBar
        value={searchValue}
        onchange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          setSearchValue(e.target.value);
        }}
        onSubmit={() => {
          dispatch({
            type: getVideos.type,
            payload: {
              searchQuery: searchValue,
              maxResults: 40,
            } as GetVideosPayload,
          });
        }}
      />
      <Grid container rowSpacing={4} columnSpacing={4} display="flex" justifyContent="center">
        {videosDetails.map((item) => {
          return (
            <Grid item xs={7} lg={4}>
              <VideoTile details={item} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
