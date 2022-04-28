import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import {NotFoundPage} from './pages/not-found/not-found.page';
import { UnauthourizedPage } from './pages/unauthorized/unauthourized.page';
import { AuthGuard } from './guards/auth.guard';

const App = () => {

  return (
    <BrowserRouter>
       <div className="container"> 
       <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/home" element={<Home />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/register" element={<Register/>}/>

         <Route path="/movies" element={<Home type="movie" />}/>
         <Route path="/series" element={<Home type="tv" />}/>

         <Route path="/watch" element={
           <AuthGuard >
              <Watch/>
           </AuthGuard>
          }/>

         {/* <Route path="/watch" element={<Watch/>}/> */}

         <Route path="/404" element={<NotFoundPage/>}/>
         <Route path="/401" element={<UnauthourizedPage/>}/>
         <Route path="/*" element={<NotFoundPage/>}/>
       </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;