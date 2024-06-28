// CustomInput.jsx
import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const NoBorderTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        padding: 0,
        '& fieldset': {
          border: 'none',
        },
        '& input': {
          padding: '6px 0', 
          height: '100%', 
        },
      },
      margin: 0, 
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      marginTop: '2px'
});

const CustomInput = ({ value, onChange, onKeyPress, placeholder }) => {
  return (
    <NoBorderTextField
      variant="outlined"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyPress}
      hiddenLabel
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
