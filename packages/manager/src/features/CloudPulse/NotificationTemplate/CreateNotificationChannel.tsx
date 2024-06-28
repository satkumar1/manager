import React, { useEffect } from 'react';
import { Box, Typography, Select, MenuItem, InputLabel, Chip, Button, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl } from 'src/components/FormControl';
import { Autocomplete } from 'src/components/Autocomplete/Autocomplete';
import { TextField } from 'src/components/TextField';
import { ChannelTemplate } from './ChannelTemplate';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { SearchMetaTag } from '../Dashboard/SearchMetaTag';
import { ActionsPanel } from 'src/components/ActionsPanel/ActionsPanel';

const conditionalSchema = (type: string) => {
  switch (type) {
    case 'Email':
      return Yup.object().shape({
        to : Yup.array().of(Yup.string().email('Invalid email address')).min(1, 'At least one recipient is required'),
        message: Yup.array().of(Yup.object().shape({
          type: Yup.string(),
          value: Yup.string().required('Message name is required')
        })).min(0, 'At least one message is required'),
        subject: Yup.array().of(Yup.object().shape({
          type: Yup.string(),
          value: Yup.string().required('subject name is required')
        })).min(0, 'At least one subject is required'),
      });
    case 'Slack':
      return Yup.object().shape({
        webhookURL: Yup.string().url('Invalid URL').required('Slack Webhook URL is required.'),
        slackChannels : Yup.array().of(Yup.string()).min(1, 'At least one channel is required'),
        message: Yup.array().of(Yup.object().shape({
          type: Yup.string(),
          value: Yup.string().required('Message is required')
        })).min(0, 'At least one message is required'),
      });
    case 'Webhook':
      return Yup.object().shape({
        webhookURL: Yup.string().url('Invalid URL').required('Slack Webhook URL is required.'),
        headers: Yup.array().of(Yup.object().shape({
          type: Yup.string(),
          value: Yup.string().required('Header is required')
        })).min(0, 'At least one Header is required'),
      });
    case 'PagerDuty':
      Yup.object().shape({
        serviceApiKey: Yup.string().required('Service API key is required.').matches(/^[a-zA-Z0-9]+$/, 'API key must be alphanumeric'),
        description: Yup.array().of(Yup.object().shape({
          type: Yup.string(),
          value: Yup.string().required('Description is required')
        })).min(0, 'At least one description is required'),
      });
    default:
      return Yup.mixed();
  }
};

export const validationSchema = Yup.object({
  type: Yup.string().required('Type is required'),
  templateName: Yup.string().required('Template name is required'),
  values: Yup.mixed().when('type', (type, schema) => {
    if (type) {
      return conditionalSchema(type);
    }
    return schema;
  }),
});

export const CreateNotificationChannel = ( { onCancel } ) => {
    const formik = useFormik({
        initialValues: {
          type: '',
          templateName: '',
          values: {}
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
    const onDragEnd = (result: DropResult) => { 
      const { source, destination } = result;
      if(!destination) return;
     
      const srcIndex = source.droppableId.indexOf('-');
      const destIndex = destination.droppableId.indexOf('-');
      const srcId = source.droppableId.slice(srcIndex + 1);
      const destId = destination.droppableId.slice(destIndex + 1);
      const destName = destination.droppableId.slice(0, destIndex);
      const srcName = source.droppableId.slice(0, srcIndex);

      if(srcId !== destId || srcName === destName || srcName !== 'source') return;
      const feildValue = formik.getFieldProps(`values.${destName}`).value;
      
      if(feildValue.find((val : any) => val.value === result.draggableId)){
        return;
      }
      formik.setFieldValue(`values.${destName}`, [...formik.getFieldProps(`values.${destName}`).value, { type: 'default', value: result.draggableId}])
     
    };

    return (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={ (theme) => ({ p: 2, backgroundColor: theme.name === 'light' ? theme.color.grey5 : theme.color.grey9, borderRadius: 1 })}>
                <Typography variant="body2" gutterBottom sx={(theme) => ({color: theme.color.black})}>
                    Channel settings
                </Typography>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ChannelTemplate formik={formik}  id="some-ID" statePrefix=""/>
                </DragDropContext>
              
            </Box>
            <ActionsPanel secondaryButtonProps={{
              label: 'Cancel',
                  onClick: onCancel
              }} primaryButtonProps={{
                  label: 'Save',
                  type: 'submit'
              }} 
            />
          </form>
        </>
    )
}