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
import { TextField } from "src/components/TextField";

export interface SlackTemplateProps<T> {
    formik: FormikProps<T>;
    id: string;
    statePrefix: string;
    type: string;
    getFieldName: (field : string) => string;
    getFieldError: (field : string) => string | '';
    handleSlackChannelChange: (field : string, newValue : string[], operation : string) => void;
};

export const SlackTemplate : React.FC<SlackTemplateProps<any>> = ({ formik, id, statePrefix, type, getFieldName, getFieldError, handleSlackChannelChange }) => {
    return(
        <React.Fragment>
            <Box>
                <Stack spacing={2}>
                    <Box>
                        <TextField
                            fullWidth
                            label="Slack Webhook URL"
                            placeholder="url"
                            margin="normal"
                            name={getFieldName('webhookURL')}
                            value={formik.getFieldProps(getFieldName('webhookURL')).value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            //error={formik.touched.templateName && Boolean(formik.errors.templateName)}
                            helperText={getFieldError('webhookURL')}
                        />
                    </Box>
                    <Box>
                        <Autocomplete
                            label="Slack Channels" 
                            options={[]} 
                            value={formik.getFieldProps(getFieldName('slackChannels')).value}
                            onChange={(event, newValue, operation) => handleSlackChannelChange('slackChannels', newValue, operation)}
                            multiple
                            freeSolo
                            placeholder="Enter Channel"
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