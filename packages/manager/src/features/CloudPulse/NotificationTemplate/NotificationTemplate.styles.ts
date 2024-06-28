import { TextField, styled } from "@mui/material";

export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
    padding: theme.spacing(0),
    // '& .MuiOutlinedInput-root': {
    //   '& fieldset': {
    //     borderColor: 'transparent',
    //   },
    //   '&:hover fieldset': {
    //     borderColor: 'transparent',
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: 'transparent',
    //   },
    // },
    // '& .MuiInput-underline:before': {
    //   borderBottom: 'none',
    // },
    // '& .MuiInput-underline:hover:before': {
    //   borderBottom: 'none',
    // },
    // '& .MuiInput-underline:after': {
    //   borderBottom: 'none',
    // },
  }));