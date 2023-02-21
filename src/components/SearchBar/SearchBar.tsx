import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from 'react';

interface SearchBarProps {
  value: string;
  onchange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: () => void;
}
export default function SearchBar(props: SearchBarProps) {
  const { value, onchange, onSubmit } = props;
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', m: 4, display: 'flex', alignItems: 'center', width: 400 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Youtube" onChange={onchange} value={value} />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
