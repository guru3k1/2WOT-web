import * as React from 'react';
import { useSelector } from 'react-redux'

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
  const isLoading = useSelector((state) => state.user.isLoading)

  if(isLoading){
    return (
      <Box className='spinnerBox'>
        <CircularProgress className='spinner'/>
      </Box>
    );
  }else{
    return(React.Fragment);
  }
}