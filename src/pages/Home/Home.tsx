import { ChangeEvent, useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, selectAppState } from '../../redux/AppSlice';
import { GetVideosPayload } from '../../redux/AppSaga';
import VideoTile from '../../components/VideoTile/VideoTile';
import { Alert, Grid, Snackbar } from '@mui/material';
function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const dispatch = useDispatch();
  const { videosDetails, videosFetchError, isFetchingVideosFailed } = useSelector(selectAppState);
  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  useEffect(() => {
    if (isFetchingVideosFailed) setSnackBarOpen(true);
  }, [isFetchingVideosFailed]);

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
      <Snackbar anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} open={snackBarOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          {videosFetchError.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Home;
