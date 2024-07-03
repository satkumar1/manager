/* eslint-disable no-console */
import { MetricCriteria } from '@linode/api-v4';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';

import { Autocomplete } from 'src/components/Autocomplete/Autocomplete';
import { Box } from 'src/components/Box';
import { Stack } from 'src/components/Stack';

import { Typography } from 'src/components/Typography';
import { useGetCloudViewMetricDefinitionsByServiceType } from 'src/queries/cloudpulse/services';

import { AggregationTypeField } from './AggregationTypeField';
import { MetricDataField } from './MetricDataField';

import { Field, FieldArray, getIn, useFormikContext } from 'formik';
import { Button } from 'src/components/Button/Button';
import { TextField } from 'src/components/TextField';
import { Metric } from './Metric';

interface MetricCriteriaProps {
  handleMetricChange: (metric: any) => void;
  serviceType: string;
  name: string;
  setScrapeInterval: (interval: any) => void;
}

const mockData = [
  {
    "metric": "CPU",
    "available_aggregate_functions": ["avg","sum","count","min"],
    "unit": "percentage",
    "dimensions": [
      {
        "label": "Device name",
        "dim_label": "device",
        "values": [
          "loop0",
          "sda",
          "sdb"
        ]
      },
      {
        "label": "Operation direction",
        "dim_label": "direction",
        "values": [
          "read",
          "write"
        ]
      },
      {
        "label": "Linode ID",
        "dim_label": "LINODE_ID",
        "values": null
      }
    ]
  },
  {
    "metric": "Temp",
    "available_aggregate_functions": ["avg","sum","min"],
    "unit": "celcius",
    "dimensions": [
      {
        "label": "Device name",
        "dim_label": "device",
        "values": [
          "loop0",
          "sda",
          "sdb"
        ]
      },
      {
        "label": "Operation direction",
        "dim_label": "direction",
        "values": [
          "read",
          "write"
        ]
      },
      {
        "label": "Linode ID",
        "dim_label": "LINODE_ID",
        "values": null
      }
    ],
  },

];

export const MetricCriteriaField = React.memo((props: MetricCriteriaProps,) => {
  const {
    data: metricDefinitions,
  } = useGetCloudViewMetricDefinitionsByServiceType(
    props.serviceType,
    props.serviceType !== ''
  );

   const formik = useFormikContext<any>();
  
  return (
    <Box sx={{ marginTop: '25px' }}>
      
      <FieldArray name={"criteria"} > 
      {({ push, remove }) => ( 
        <>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography sx={{ paddingLeft: '5px' }} variant={'h3'}>
              Criteria
            </Typography>
            <Button onClick={() => push({
              metric: "",
              aggregationType: "",
              operator: "",
              value: 0,
              filters: [],
              })}
              type="button"
              variant="outlined"
              size='small'
            > +Add Metric</Button>
          </Box>
          <Stack spacing={2}>
          {
            formik.getFieldProps(`criteria`)
              .value.map( (_, index) => 
                <Metric
                  name={`criteria[${index}]`}
                  data={mockData}
                  key={index}
                  onMetricDelete={() => remove(index)}
                />)
          }
          </Stack>
        </>
      )}
      </FieldArray>
    </Box>
  );
});
