import * as React from 'react';
import { DebouncedSearchTextField } from "src/components/DebouncedSearchTextField";
import { Grid, Hidden, useTheme } from "@mui/material";
import { Stack } from "src/components/Stack";
import { Tag } from "src/components/Tag/Tag";
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { StyledChip } from 'src/components/Tag/Tag.styles';
import { Box } from 'src/components/Box';
import { Padding } from '@mui/icons-material';


export const SearchTags = ({ metaTags, id, feildType }) => {
    
    const [searchText, setSearchText] = React.useState<string>("");
    const theme = useTheme();
    const filterdTags = React.useMemo(() => {
        return metaTags.filter((tag) => tag.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase()));
      }, [searchText]);

    const handleInputChange = React.useCallback((value: string) => {
        setSearchText(value);
    }, []);

    return (
        <>
            <Grid container >
                <Grid item xs={12} md={12}>
                    <DebouncedSearchTextField
                        debounceTime={400}
                        hideLabel
                        label="Search for Tags"
                        onSearch={handleInputChange}
                        placeholder="Search for something"
                        value={searchText}
                    />
                </Grid> 
                <Grid item xs={12} md={12} sx={{ minHeight: 120, maxHeight: 120, overflow: 'auto', padding: theme.spacing(1)} }>
                    <Stack >
                        <Droppable droppableId={`${feildType}-${id}`} direction="vertical" >
                        
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {filterdTags.map((tag, index) => <Draggable key={tag} draggableId={tag} index={index}>
                                        {(provided) => (
                                           
                                            <Grid item md={12} 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            > 
                                                <StyledChip
                                                    colorVariant="lightBlue"
                                                    label={tag}
                                                    clickable={false}
                                                    key={tag}
                                                />
                                            </Grid>)}
                                        </Draggable>)}
                                    {provided.placeholder}
                                </div>)}
                        </Droppable>
                    </Stack>
                </Grid> 
                
            </Grid>
            
        </>
    )
};