import React, { useState } from 'react';
import { TextField, Chip, Autocomplete, Box } from '@mui/material';
import { styled } from '@mui/system';

const FixedHeightBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  padding: '4px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  minHeight: '150px', // Set the fixed height
  maxHeight: '150px',
  overflowY: 'auto',
  transition: 'border-color 0.3s',
  '&.clickedBox': {
    borderColor: 'blue',
  },
});

const StyledAutocomplete = styled(Autocomplete)({
  width: '100%',
  '& .MuiAutocomplete-inputRoot': {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '& .MuiChip-root': {
    margin: '4px 4px 0 0',
  },
});

export const CustomAutoComplete = () => {
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleBoxClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <FixedHeightBox
      className={isClicked ? 'clickedBox' : ''}
      onClick={handleBoxClick}
    >
      <StyledAutocomplete
        multiple
        freeSolo
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={[]}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Type something..."
          />
        )}
      />
    </FixedHeightBox>
  );
};

