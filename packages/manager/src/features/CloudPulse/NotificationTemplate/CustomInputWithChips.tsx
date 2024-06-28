

import React, { useState } from 'react';
import { Chip, Box, TextField, Paper, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import CustomInput from './CustomInput'; // Import the CustomInput component
import { StyledChip } from 'src/components/Tag/Tag.styles';
import { FormLabel } from 'src/components/FormLabel';
import { Stack } from 'src/components/Stack';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Typography } from 'src/components/Typography';

export const CustomInputWithChips = ({ tags, onTagChange, minHeight, id, feildType, label }) => {
  
    const [inputValue, setInputValue] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const theme = useTheme();
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleKeyPress = (event) => {
      
      if (event.key === 'Enter' && inputValue.trim()) {
        event.preventDefault();
        if(tags.find((tag) => tag.value === inputValue.trim())){
            setInputValue('');
            return;
        }
        onTagChange([...tags, { type: "custom", value: inputValue.trim()}]);
        setInputValue('');
      }
    };
  
    const handleDelete = (chipToDelete) => () => {
      const newTagList = tags.filter((tag) => tag.value !== chipToDelete )
      onTagChange(newTagList)
    };
    
    return (
        <Stack spacing={1}>
        
            <FormLabel > {label}</FormLabel>
            <Droppable droppableId={`${feildType}-${id}`} direction="horizontal" isDropDisabled={false}>
            {(provided) => ( 
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Box sx={ (theme) => (
                        {  
                            minHeight:{ minHeight }, 
                            border: theme.palette.mode === 'light' ?  `1px solid ${theme.color.border2}` : `1px solid ${theme.color.grey9}`, 
                            backgroundColor: theme.palette.mode === 'light' ? theme.color.white  : "#404040",
                            px: theme.spacing(1),
                            
                        })} 
                    >
                        <Box sx={{ display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start',
                        minHeight: minHeight,
                        '& > *': {
                            marginRight: theme.spacing(1),        
                        }, 
                        }}>
                            {tags.map((tag, index) => <Draggable key={tag.value} draggableId={`${id}-${feildType}-${tag.value}`} index={index} >
                            {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps}
                            {...provided.dragHandleProps} >
                                {(tag.type === 'default') ? <StyledChip
                                    key={index}
                                    label={tag.value}
                                    onDelete={handleDelete(tag.value)}
                                    sx={{ marginRight: 1}}
                                    colorVariant='lightBlue'
                                    
                                /> :
                                (!selectedTag && selectedTag!== tag.index) ? <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  placeItems: 'center',
                                  height: '32px'
                                }}
                              >
                                  <Typography onClick={() => console.log("")}> {tag.value} </Typography>

                              </Box>
                                
                                : <TextField value={tag.value}/>
                             }
                            </div>)}
                            </Draggable>
                            )}
                            {/* {provided.placeholder} */}
                            <Box>
                                <CustomInput
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder={"Enter "}
                                />
                            </Box>
                            
                    
                        </Box>
                        
                    </Box>
                    
                </div>
            )}</Droppable>
        </Stack>

    );
  };

