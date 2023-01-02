import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid2 from '@mui/material/Unstable_Grid2'; 
import { useDispatch, useSelector } from 'react-redux';
import { setLogViewState } from '../ducks/action';
import TimeCard from '../time-card/TimeCard';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: '400px',
  bgcolor: 'background.paper',
  border: '1px solid rgba(125, 125, 125, 1)',
  boxShadow: 24,
  p: 4,
};

export default function LogView() {
  const dispatch = useDispatch();
  const logViewState = useSelector((state) => state.user.logViewState);
  const durationMap = useSelector((state) => state.user.durationMap);
  const logTime = useSelector((state) => state.user.dailyTimeMap);
  const handleClose = () => dispatch(setLogViewState(false));

  return (
    <div>
      <Modal
        open={logViewState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h6">
            Log view
          </Typography>
          <div className={'logCardHolder'}>
            {Object.keys(durationMap).map((key,index)=>{return(<TimeCard key={index} date={key} duration={durationMap[key]} logTime={logTime}/>)})}      
          </div>            
          <Grid2 container display="flex" justifyContent="center" alignItems="center">
              <Grid2 xs={"auto"} >
                  <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid2>
          </Grid2>
        </Box>
      </Modal>
    </div>
  );
}