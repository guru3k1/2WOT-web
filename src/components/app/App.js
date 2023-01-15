import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { MainView } from '../main-view/MainView';
import '../../assets/css/App.css'
import '../../assets/css/main.css'
import '../../assets/css/util.css'
import Login from '../login';
import FourOFour from '../fourofour';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
)

const App = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event,session)=> {
      if(!session){
        navigate('/login')
      }else{
        navigate('/')
      }
    })
  }, [navigate])

  //<Auth 
  //   supabaseClient={supabase}
  //   providers={['google','github']}
  //   theme='dark'
  //   localization={{
  //     variables: {
  //       sign_in: {
  //         email_label: 'Your email address',
  //         password_label: 'Your strong password',
  //       },
  //     },
  //   }}
  // />;
  return (
    <>
      <Routes>
        <Route path="/" element={<MainView/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<FourOFour/>}/>
      </Routes>
      
    </>
  )
}

export default App;
