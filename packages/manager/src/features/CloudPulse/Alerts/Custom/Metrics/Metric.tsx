import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Grid, IconButton, styled } from "@mui/material";
import { getIn, useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete } from "src/components/Autocomplete/Autocomplete";
import { Box } from "src/components/Box";
import { FormControl } from "src/components/FormControl";
import { FormHelperText } from "src/components/FormHelperText";
import { Stack } from "src/components/Stack";
import { TextField } from "src/components/TextField";
import { Typography } from "src/components/Typography";
import { DimensionFilter } from "./DimensionFilter";

const OperatorOptions = [
  {
    label: '>',
    value: '>',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '>=',
    value: '>=',
  },
  {
    label: '<=',
    value: '>=',
  },
  {
    label: '==',
    value: '==',
  },
];

export const Metric = ({ name, data, onMetricDelete }) => {

  const formik = useFormikContext();

  const handleSelectChange = (field: any, value: any, operation: string) => {
    if (operation === 'selectOption') {
      formik.setFieldValue(`${name}.${field}`, value.value);
    }
    else {
      formik.setFieldValue(`${name}.${field}`, "");
    }
  };

  const handleDataFieldChange = (field: any, value: any, operation: string) => {
    const fieldValue = {
      "metric": "",
      "aggregationType": "",
      "operator": "",
      "value": 0,
      "filters": []
    }
    if (operation === 'selectOption') {

      formik.setFieldValue(`${name}`, { ...fieldValue, metric: value.value });
    }
    else {
      formik.setFieldValue(`${name}`, fieldValue);
    }
  };


  const errors = getIn(formik.errors, name, {});
  const touchedFields = getIn(formik.touched, name, {});
  const values = formik.getFieldProps(name).value;
  const metricOptions = data ? data.map((metric) => ({ "label": metric.metric, "value": metric.metric })) : [];

  const selectedMetric = data && values.metric ? data.find((metric) => metric.metric === values.metric) : null;
  const aggOptions = selectedMetric && selectedMetric.available_aggregate_functions ? selectedMetric.available_aggregate_functions.map((fn) => ({ label: fn, value: fn })) : [];
  const dimensionOptions = selectedMetric && selectedMetric.dimensions ? selectedMetric.dimensions : [];

  const unit = selectedMetric ? selectedMetric.unit : '%';

  console.log(values)
  return (
    <>
      <Box sx={(theme) => ({ p: 2, backgroundColor: theme.name === 'light' ? theme.color.grey5 : theme.color.grey9, borderRadius: 1 })}>
        <Stack>
          <Box display={"flex"} justifyContent="space-between">
            <Typography variant={'h3'}>Metric</Typography>
            <Box>
              <StyledDeleteIcon onClick={onMetricDelete} />
            </Box>
          </Box>

          <FormControl sx={{ marginTop: 0 }} fullWidth margin="normal"  >
            <Autocomplete
              options={metricOptions}
              label='Data Field'
              value={(values.metric) ? { label: values.metric, value: values.metric } : null}
              onChange={(event, newValue, operation) => handleDataFieldChange('metric', newValue, operation)}
              onBlur={(event) => {
                formik.handleBlur(event);
                formik.setFieldTouched(`${name}.metric`, true);
              }}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
            />

            {touchedFields && errors && touchedFields.metric && errors.metric && (
              <FormHelperText sx={(theme) => ({ marginLeft: 0, marginTop: theme.spacing(1) })} >{getIn(formik.errors, `${name}.metric`).toString()}</FormHelperText>
            )}
          </FormControl>
          <Stack direction="row" spacing={1} flexWrap={"wrap"}>
            <Autocomplete
              options={aggOptions}
              label="Aggregation type"
              onChange={(event, newValue, operation) => handleSelectChange('aggregationType', newValue, operation)}
              value={(values?.aggregationType) ? { label: values.aggregationType, value: values.aggregationType } : null}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
            />
            <StyledOperatorAutocomplete
              options={OperatorOptions}
              label={'Operator'}
              onChange={(event, newValue, operation) => handleSelectChange('operator', newValue, operation)}
              value={(values.operator) ? { label: values.operator } : null}
              isOptionEqualToValue={(option, value) => option.label === value?.label}
            />
            <TextField
              name={`${name}.value`}
              label="Value"
              value={values.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={touchedFields.value && Boolean(errors.value)}
              type="number"
              sx={{ minWidth: "70px", maxWidth: "70px", maxHeight: "32px" }}
            />
            <Box paddingTop={"12px"}>
              <Typography variant="body1"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '56px',
                  flexDirection: 'column-reverse'
                }}
              >{unit}</Typography>
            </Box>
          </Stack>
          <DimensionFilter name={`${name}.filters`} dimensionOptions={dimensionOptions} />

        </Stack>
      </Box>
    </>
  );
}

const StyledOperatorAutocomplete = styled(Autocomplete, {
  label: 'StyledOperatorAutocomplete',
})({
  '& .MuiInputBase-root': {
    width: '80px',
  },
  minWidth: '80px',
  width: '80px',
});

const StyledDeleteIcon = styled(DeleteOutlineOutlined)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.color.blue,
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
  padding: 0,

}));