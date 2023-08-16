import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import CreateOpenMat from './components/CreateOpenMat';
import EditOpenMat from './components/EditOpenMat';
import NavBar from './components/NavBar';
import AccountCreation from './components/AccountCreation';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import SearchOpenMats from './components/SearchOpenMats';
import ViewOpenMat from './components/ViewOpenMat';
import UserBio from './components/UserBio';
import FAQ from './components/FAQ';

// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { useDrag } from 'react-dnd';


function App() {

    // just for fun
  const [title, setTitle] = useState('Site Header!')
  // 1 ) CREATE A STATE TO SAVE THE USER
  const [user, setUser] = useState({})

  return (
    // <DndProvider backend={HTML5Backend}>
    <div className="App">

          <BrowserRouter>
          <NavBar user={user} setUser={setUser}/>
          
            <Routes>
              <Route exact path ="/" element={<LandingPage  />} />
              <Route exact path ="/createopenmat" element={<CreateOpenMat setTitle={setTitle} user={user} setUser={setUser} />} />
              <Route exact path ="/api/openmat/:id" element={<EditOpenMat setTitle={setTitle} user={user} setUser={setUser} />} />
              <Route exact path ="/register" element={<AccountCreation  setTitle={setTitle} setUser={setUser}/>} />
              <Route exact path ="/login" element={<Login  setTitle={setTitle} user={user} setUser={setUser}/>} />
              <Route exact path ="/searchopenmats" element={<SearchOpenMats  setTitle={setTitle} user={user}/>} />
              <Route exact path ="/viewopenmat/:id" element={<ViewOpenMat  setTitle={setTitle} user={user}/>} />
              <Route exact path ="/user/:id" element={<UserBio  setTitle={setTitle} user={user} setUser={setUser}/>} />
              <Route exact path ="/editopenmat/:id" element={<EditOpenMat  setTitle={setTitle} user={user} />} />
              {/* <Route exact path ="/searchopenmats" element={<SearchOpenMats  setTitle={setTitle} />} /> */}
              <Route exact path ="/logout" element={<SearchOpenMats />} />
              <Route exact path ="/bjjfaq" element={<FAQ setTitle={setTitle}/>} />

            </Routes>
          </BrowserRouter>
    </div>
    </DndProvider>
  );
}

export default App;
