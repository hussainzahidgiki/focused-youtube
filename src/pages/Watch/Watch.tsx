import React from 'react';
import { useLocation } from 'react-router-dom';
export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Watch() {
  const query = useQuery();
  const videoId = query.get('videoId');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 'calc(10px + 2vmin)', width: '80%' }}>
      <div style={{padding:200}}>
        <iframe width="1213" height="682" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
    </div>
  );
}

export default Watch;
