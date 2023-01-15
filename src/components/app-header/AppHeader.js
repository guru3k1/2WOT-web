import React from 'react';
import { Button, Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setModalState } from '../ducks/action';
import { supabase } from '../app/App';



const AppHeader = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user)
    return (
        <div className='appHeader'>
            <div className='menuContainer'>
                <div className='menuContent'>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <Button className='headerMenuButton' variant="outlined" sx={{bgcolor: 'white'}} 
                            onClick={()=> dispatch(fetchUser())}>Get Tasks</Button>
                        <Button className='headerMenuButton' variant="outlined" sx={{bgcolor: 'white'}} 
                            onClick={()=> supabase.auth.signOut()}>Logout</Button> 
                        <Button className='headerMenuButton' disabled={user.userId === ""}
                            variant="contained" onClick={() => dispatch(setModalState(true))}>Create Task</Button>
                    </Stack>
                    <Box className='userBox'>
                        User: {user.email}
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;