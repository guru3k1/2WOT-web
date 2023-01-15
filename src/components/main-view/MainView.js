import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppHeader from '../app-header/AppHeader';
import TaskView from '../task-view/TaskView';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../app/App'
import { setUser } from '../ducks/action';

export const MainView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            const {data,error} = await supabase.auth.getUser();
            if(error){
                console.error(error)
                navigate("/login");
            }
            if(!data.user){
                navigate("/login");
            }else{
                dispatch(setUser(data.user))
            }
        };
        getUser();
        return() =>{}
    },[navigate,dispatch])
    return(
    <>
        <AppHeader/> 
        <TaskView/>
    </>
    )
}


