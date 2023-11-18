import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom';
import './App.css'; 


// pages 
import User from './pages/User';
import Doctor from './pages/Doctor';
import Admin from './pages/Admin';
import Signup from './pages/Signup';
import SignupDoctor from './pages/SignupDoctor';
import Login from './pages/Login';
import Home from './pages/Home';

// layouts
import RouteLayout from './layouts/RouteLayout';
// component 
import Chats from './components/Chats';
import ChatMessages from './components/ChatMessages';



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<RouteLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signup/doctor' element={<SignupDoctor />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/doctor' element={<Doctor />} />
            <Route path='/user' element={<User />} />
            <Route path='/chats' element ={<Chats/>} />
            <Route path='/chat/messages' element={<ChatMessages/>}/>
        </Route>
    )
)

class App extends React.Component {

    render() {
        return (
            <RouterProvider className="background" router={router}/>
        )
    }
}

export default App; 