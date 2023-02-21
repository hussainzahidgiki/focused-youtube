import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { videoDetails } from '../../redux/AppSlice';

export interface VideoTileProps {
  details: videoDetails;
}
function VideoTile(props: VideoTileProps) {
  const { details } = props;
  const navigate = useNavigate();
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/watch?videoId=${details.videoId}`);
        }}
      >
        <img src={details.thumbnailImageUrl} alt='thumbnail'/>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`/watch?videoId=${details.videoId}`);
        }}
      >
        <Typography color="white">{details.videoTitle}</Typography>
      </Grid>
    </Grid>
  );
}

export default VideoTile;
