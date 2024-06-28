import { FormikProps } from "formik";
import React from "react";
import { Autocomplete } from "src/components/Autocomplete/Autocomplete";
import { Box } from "src/components/Box";
import { Stack } from "src/components/Stack";
import { TabLinkList } from "src/components/Tabs/TabLinkList";
import { TabPanels } from "@reach/tabs";
import { SafeTabPanel } from "src/components/Tabs/SafeTabPanel";
import { Paper } from "src/components/Paper";
import { Tabs } from 'src/components/Tabs/Tabs';
import { Typography } from "src/components/Typography";
import { SearchTags } from "../SearchTags";
import { CustomInputWithChips } from "../CustomInputWithChips";
import { mockTags } from "../ChannelTypeTemplate";

export interface EmailTemplateProps<T> {
    formik: FormikProps<T>;
    id: string;
    statePrefix: string;
    type: string;
    getFieldName: (field : string) => string;
    getFieldError: (field : string) => string | '';
    handleEmailChange: (field : string, newValue : string[], operation : string) => void;
};

export const EmailTemplate : React.FC<EmailTemplateProps<any>> = ({ formik, id, statePrefix, type, getFieldName, getFieldError, handleEmailChange }) => {
    return(
    <React.Fragment>
        <Box>
            <Stack spacing={2}>
                <Box>
                    <Autocomplete
                        label="To" 
                        options={[]} 
                        value={formik.getFieldProps(getFieldName('to')).value}
                        onChange={(event, newValue, operation) => handleEmailChange('to', newValue, operation)}
                        multiple
                        freeSolo
                        placeholder="Enter Email"
                    />
                </Box>

                <Box>
                    <Tabs >
                        <TabLinkList noLink tabs={[ {title: 'Attributes', routeName: ""} ,  {title: 'Dashboard', routeName: ""} ]} />
                        <TabPanels >
                            <SafeTabPanel index={0} key={'tab-0'} >
                                <Typography variant="body1">Drag and Drop system variables to add subject or description</Typography>
                                <Paper sx={(theme) => ({ border:1 , borderColor: theme.color.border2, padding:0})}> 
                                    <SearchTags metaTags={mockTags} id={id} feildType={"source"}/>
                                </Paper>
                            </SafeTabPanel>
                            <SafeTabPanel index={1} key={'tab-1'} >
                                <Typography variant="body1">Drag and Drop system variables to add subject or description</Typography>
                                <Paper sx={(theme) => ({ border:1 , borderColor: theme.color.border2, padding:0})}> 
                                    <SearchTags metaTags={[]} id={id} feildType={"source"}/>
                                </Paper>
                            </SafeTabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box>
                    <CustomInputWithChips
                        tags={formik.getFieldProps(getFieldName('subject')).value}
                        onTagChange={ (newValue) => formik.setFieldValue(getFieldName('subject'),newValue) }
                        minHeight="35px"
                        id={id}
                        feildType={'subject'}
                        label={'Subject'}
                    />
    
                </Box>
                <Box>
                    <CustomInputWithChips
                        tags={formik.getFieldProps(getFieldName('message')).value}
                        onTagChange={ (newValue) => formik.setFieldValue(getFieldName('message'),newValue) }
                        minHeight="140px"
                        id={id}
                        feildType={'message'}
                        label={'Message'}
                    />
    
                </Box>
            </Stack>
            
        </Box>
        
    </React.Fragment>
    );
};