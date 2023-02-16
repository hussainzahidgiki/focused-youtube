import { ChangeEvent, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../redux/AppSlice';
function Home() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          });
        }}
      />
    </div>
  );
}

export default Home;
