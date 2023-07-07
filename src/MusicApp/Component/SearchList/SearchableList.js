import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';

const SearchableList = ({ items, labelKey, valueKey, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = items.filter(item =>
    item[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = item => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <Box minHeight='300px' maxHeight='500px' width='300px'>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <List sx={{overflowY: 'scroll'}}>
        {filteredItems.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedItem === item}
            onClick={() => handleItemClick(item)}
          >
            <ListItemText primary={item[labelKey]} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SearchableList;
