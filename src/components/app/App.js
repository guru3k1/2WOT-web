import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { MainView } from '../main-view/MainView';
import '../../assets/css/App.css'
import '../../assets/css/main.css'
import '../../assets/css/util.css'
import Login from '../login';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

const App = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event,session)=> {
      if(!session){
        navigate('/2WOT-web/login')
      }else{
        navigate('/2WOT-web/')
      }
    })
  }, [navigate])
  return (
    <>
      <Routes>
        <Route path="/2WOT-web/" element={<MainView/>}/>
        <Route path="/2WOT-web/login" element={<Login/>}/>
      </Routes>
      
    </>
  )
}

export default App;
