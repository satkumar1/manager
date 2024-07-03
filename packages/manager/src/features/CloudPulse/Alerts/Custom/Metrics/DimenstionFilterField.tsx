import { DeleteOutlineOutlined } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import { Autocomplete } from "src/components/Autocomplete/Autocomplete";
import { Box } from "src/components/Box";
import { Stack } from "src/components/Stack";


const OperatorOptions = [
  {
    label: 'is',
    value: 'is',
  },
  {
    label: 'contains',
    value: 'contains',
  },
];

export const DimensionFilterField = ({ name, onFilterDelete, dimensionOptions}) => {
  const formik = useFormikContext();
  const [field, meta] = useField(name);  

  const selectedDimension = field.value.dim_label ? dimensionOptions.find((dim) => dim.label === field.value.dim_label) : null;
  const valueOptions = selectedDimension && selectedDimension.values ? selectedDimension.values.map((val) => ({label : val , value: val})) : [];

  const handleSelectChange = (field, value, operation) => {
    if (operation === 'selectOption') {
        formik.setFieldValue(`${name}.${field}`, value.label);
        (field === 'dim_label') && formik.setFieldValue(`${name}.value`, "");
    }
    else {
        formik.setFieldValue(`${name}.${field}`, "");
    }

    (field === 'dim_label') && formik.setFieldValue(`${name}.value`, "");
  }

  return(
      <>
        <Stack direction="row" spacing={1} >
         
            <Autocomplete 
                
                options={dimensionOptions}
                label="Data Field"
                onChange={(event, newValue, operation) => handleSelectChange('dim_label', newValue, operation)}
                value={ (field.value.dim_label) ? { label: field.value.dim_label, value: field.value.dim_label } : null}
                isOptionEqualToValue={(option, value) => option.label === value?.label }
            />
            <StyledOperatorAutocomplete 
                options={OperatorOptions}
                label={'Operator'}
                onChange={(event, newValue, operation) => handleSelectChange('operator', newValue, operation)}
                value={ (field.value.operator) ? { label: field.value.operator } : null}
                isOptionEqualToValue={(option, value) => option.label === value?.label }
            />
            <Autocomplete 
                options={valueOptions}
                label="Value"
                onChange={(event, newValue, operation) => handleSelectChange('value', newValue, operation)}
                value={ (field.value.value) ? { label: field.value.value, value: field.value.value } : null}
                isOptionEqualToValue={(option, value) => option.label === value?.label }
            />
            <Box>
              <StyledDeleteIcon onClick={onFilterDelete}/>
            </Box>
         
        </Stack>
      </>
    );
}

const StyledOperatorAutocomplete = styled(Autocomplete, {
  label: 'StyledOperatorAutocomplete',
})({
  '& .MuiInputBase-root': {
    width: '90px',
  },
  minWidth: '90px',
  width: '90px',
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
  marginTop: "45px"
}));