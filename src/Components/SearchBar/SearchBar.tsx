import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from '@mui/material/colors';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onSearch(val);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };
  
  return (
    <form role="search" className="searchbar" onSubmit={handleSubmit}>
      <SearchIcon 
        sx={{ fontSize: 20, color: blue[900] }} 
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        placeholder="Search To-Do"
        onChange={handleChange}
        className="searchbar-input"
        aria-label="Search To-Do Items"
      />
    </form>
  );
};

export default SearchBar;