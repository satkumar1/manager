import { Chip } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { Autocomplete } from "src/components/Autocomplete/Autocomplete";
import { Button } from "src/components/Button/Button";
import { FormControl } from "src/components/FormControl";
import { FormHelperText } from "src/components/FormHelperText";
import { TextField } from "src/components/TextField";
import { ChannelTypeTemplate } from "./ChannelTypeTemplate";

export const ChannelTypeOptions = [
    {
        label: 'Email',
        value: 'Email'
    },
    {
        label: 'Slack',
        value: 'Slack'
    },
    {
        label: 'Pager Duty',
        value: 'PagerDuty'
    },
    {
        label: 'Web Hook',
        value: 'WebHook'
    }
];


export interface FormikWithIdProps<T> {
    formik: FormikProps<T>;
    id: string;
    statePrefix: string;
}

export const ChannelTemplate: React.FC<FormikWithIdProps<any>> = ({ formik, id, statePrefix }) => {

    const handleSelectChange = (fieldName: string, newValue: any, operation: string) => {
        if (operation === 'selectOption') {
            formik.setFieldValue(fieldName, newValue?.label);
            if(fieldName === 'type'){
                switch(newValue?.label) {
                    case 'Email' :
                        return formik.setFieldValue('values',{to:[], message: [], subject: [] });
                    case 'Slack' :
                        return formik.setFieldValue('values',{ webhookURL: '', slackChannels: [], message: []});
                    case 'Webhook' :
                        return formik.setFieldValue('values',{webhookURL:'', headers: [] });
                    case 'PagerDuty' :
                        return formik.setFieldValue('values',{serviceApiKey:'', description: [] });
                }
            }
        }
        else if (operation === 'clear') {
            formik.setFieldValue(fieldName, '');
            if(fieldName === 'type') formik.setFieldValue('values',{});
        }

    };
    
    return (
        <React.Fragment>
            <FormControl sx={{marginTop: 0}} fullWidth margin="normal" error={formik.touched.type && Boolean(formik.errors.type)}>
                <Autocomplete options={ChannelTypeOptions}
                    label='Type'
                    value={{ label: formik.values.type, value: formik.values.type }}
                    onChange={(event, newValue, operation) => handleSelectChange('type', newValue, operation)}
                    onBlur={(event) => {
                        formik.handleBlur(event);
                        formik.setFieldTouched('type', true);
                    }}
                />

                {formik.touched.type && formik.errors.type && (
                    <FormHelperText sx={(theme) => ({marginLeft: 0, marginTop: theme.spacing(1)})}>{formik.errors.type.toString()}</FormHelperText>
                )}
            </FormControl>

            <TextField
                fullWidth
                label="Channel template name"
                placeholder="Template name..."
                margin="normal"
                name="templateName"
                value={formik.values.templateName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.templateName && Boolean(formik.errors.templateName)}
                helperText={formik.touched.templateName && formik.errors.templateName ? formik.errors.templateName.toString() : null }
            />

           {formik.values.type && <ChannelTypeTemplate formik={formik} id={id} statePrefix={(statePrefix) ? statePrefix + `.values` : 'values'} type={formik.values.type} /> } 

        </React.Fragment>
    )
}