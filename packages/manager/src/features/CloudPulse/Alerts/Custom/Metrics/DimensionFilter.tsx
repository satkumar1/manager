import { Box } from "@mui/material";
import { FieldArray, useFormikContext } from "formik";
import React from "react";
import { Button } from "src/components/Button/Button";
import { Stack } from "src/components/Stack";
import { Typography } from "src/components/Typography";
import { DimensionFilterField } from "./DimenstionFilterField";

export const DimensionFilter = ({ name, dimensionOptions }) => {

    const formik = useFormikContext();

    return (
      <Box sx={(theme) => ({marginTop: theme.spacing(1)})}>
        <FieldArray name={name} > 
          {({ push, remove }) => ( 
              <>
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant={'h3'} >
                    Dimension Filter <Typography component="span"> (optional)</Typography>
                  </Typography>
                  <Button onClick={() => push({
                    dim_label: "",
                    operator:"",
                    value:"" 
                  })}
                  type="button"
                  variant="outlined"
                  size='small'
                  > +Add Dimension</Button>
              </Box>
              <Stack spacing={2}>
              {
                  formik.getFieldProps(name)
                  .value.map( (_, index) => 
                      <DimensionFilterField name={`${name}[${index}]`} key={index} onFilterDelete={() => remove(index)} dimensionOptions={dimensionOptions}/>)
              }
              </Stack>

              </>
          )}
        </FieldArray>
      </Box>
    );
}