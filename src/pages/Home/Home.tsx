import { ChangeEvent, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos, selectAppState } from '../../redux/AppSlice';
import { GetVideosPayload } from '../../redux/AppSaga';
import Typography from '@mui/material/Typography';
function Home() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { nextPageToken, videosDetails } = useSelector(selectAppState);

  return (
    <div className="Home-container">
      <SearchBar
        value={searchValue}
        onchange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
          setSearchValue(e.target.value);
        }}
        onSubmit={() => {
          //navigate('/watch');
          dispatch({
            type: getVideos.type,
            payload: {
              searchQuery: searchValue,
              maxResults: 12,
              nextPageToken: nextPageToken,
            } as GetVideosPayload,
          });
        }}
      />
      {videosDetails.map((item) => {
        return <Typography color="white">{item.videoId}</Typography>;
      })}
    </div>
  );
}

export default Home;
