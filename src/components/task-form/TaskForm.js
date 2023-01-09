import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid2 from '@mui/material/Unstable_Grid2'; 
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../ducks/action';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function TaskForm({task: { taskName, sprint, description, type, ecp },
   setTaskName, setSprint, setDescription, setType, setEcp, saveTaskAndCleanForm }) {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.user.modalState);
  const handleClose = () => dispatch(setModalState(false));

  return (
    <div>
      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modalView'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task form
          </Typography>
            <Grid2 container spacing={3} sx={{ paddingTop: 2}}>
                <Grid2 xs={12} md={6}>
                    <TextField id="standard-basic" required label="Task name" fullWidth
                        variant="standard" value={taskName} onChange={e=> setTaskName(e.target.value)}
                    />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <TextField id="standard-basic" required label="Sprint" fullWidth
                            variant="standard" value={sprint} onChange={e=> setSprint(e.target.value)}
                    />
                </Grid2>
                <Grid2 xs={12}>
                    <TextField id="standard-basic" required label="Description" fullWidth
                            variant="standard" value={description} onChange={e=> setDescription(e.target.value)}
                    />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <FormControl variant="standard" sx={{ width: 278 }}> 
                        <InputLabel id="demo-customized-select-label">Type</InputLabel>
                        <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        MenuProps={MenuProps}
                        >
                            <MenuItem value={"normal"}>Normal</MenuItem>
                            <MenuItem value={"fixed"}>Fixed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <TextField id="standard-basic" required label="Estimated Time" fullWidth
                        variant="standard" value={ecp} onChange={e=> setEcp(e.target.value)}
                        />
                </Grid2>
            </Grid2>
            <Grid2 container display="flex" justifyContent="space-around" alignItems="center" sx={{ paddingTop: 12}}>
                <Grid2 xs={"auto"}>
                    <Button variant="contained" onClick={()=>{ saveTaskAndCleanForm(); handleClose();}}>Save</Button>
                </Grid2>
                <Grid2 xs={"auto"} xsOffset={-3}>
                    <Button variant="outlined" sx={{bgcolor: 'white'}} onClick={handleClose}>Cancel</Button>
                </Grid2>
            </Grid2>
        </Box>
      </Modal>
    </div>
  );
}