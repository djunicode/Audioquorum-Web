import React from "react";
import {useState} from "react";
import { Routes, Route } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from "./styles/theme";

import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Quizzes } from './pages/Quizzes';
import { Quiz } from './pages/Quiz';
import { AnnualReport } from './pages/AnnualReport';
import { AddQuiz } from './pages/AddQuiz';
import { AddQuestions } from './pages/AddQuestions';
import {ViewResults} from './pages/ViewResults'
import LoggedInNavbar from './components/LoggedInNavbar';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      {loggedIn ? <LoggedInNavbar setLoggedIn={setLoggedIn}/> : <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/quizzes' element={<Quizzes />} />
        <Route path='/quiz/:quizId' element={<Quiz />} />
        <Route path='/annual-report' element={<AnnualReport />} />
        <Route path='/add-quiz' element={<AddQuiz />} />
        <Route path='/add-questions' element={<AddQuestions />} />
        <Route path='/viewresults' element={<ViewResults/>} />
      </Routes>
    
    </ThemeProvider>
    
  );
}

export default App;
