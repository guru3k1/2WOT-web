import React from 'react';
import { Button, Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setModalState } from '../ducks/action';



const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    return (
        <div className='appHeader'>
            <div className='menuContainer'>
                <div className='menuContent'>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        <Button className='headerMenuButton' variant="outlined" sx={{bgcolor: 'white'}} 
                            onClick={()=> dispatch(fetchUser())}>Login</Button>
                        <Button className='headerMenuButton' disabled={user.userId === ""}
                            variant="contained" onClick={() => dispatch(setModalState(true))}>Create Task</Button>
                    </Stack>
                    <Box className='userBox'>
                        User: {user.firstName} {user.lastName}
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;