import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import React from 'react';
import './Login.css';
import Mybackground from '../assets/sandrabackground.png';
import axiosClient from '../axios';

const Login = () => {

  const navigate = useNavigate();
  useEffect( ()=>{
        if(localStorage.getItem('user-info'))
        {
          if (localStorage.getItem('user-type') === 'patient') {
            navigate('/user')
          }
          else if (localStorage.getItem('user-type') === 'doctor') {
            navigate('/doctor')
          }
          else if (localStorage.getItem('user-type') === 'secertarie') {
            navigate('/secertarie')
          }
          else if (localStorage.getItem('user-type') === 'admin') {
            navigate('/admin')
          }
        }
  },[])


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ __html: '' });

  const onsubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: '' })

    //first parameter for the url of the api second for databases
    axiosClient.post('/login',
      {
        email,
        password,
      }).then((response) => {
        //this values comes from the AuthController
        JSON.stringify(response)
        localStorage.setItem('user-info', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user-id', response.data.user_id);
        localStorage.setItem('user-type', response.data.user_type);
        localStorage.setItem('user-name', response.data.user.user_name);
        console.log(response.data.user.user_name);
        console.log(response.data.user);
        console.log(response.data.token);
        console.log(response.data.user_id);
        console.log(response.data.user_type);
        console.log('Login successfully');

        if (localStorage.getItem('user-type') === 'patient') {
          navigate('/user')
        }
        else if (localStorage.getItem('user-type') === 'doctor') {
          navigate('/doctor')
        }
        else if (localStorage.getItem('user-type') === 'secertarie') {
          navigate('/secertarie')
        }
        else if (localStorage.getItem('user-type') === 'admin') {
          navigate('/admin')
        }


      }).catch((error) => {
        if (error.response) {
          const finalErrors = error.response.data.errors && Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
          const joinedErrors = finalErrors && finalErrors.join('<br>');
          setError({ __html: joinedErrors });
        }
        console.error(error);
      }
      )

  }




  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={Mybackground} className="img-fluid" alt="Phone image" />
              <div className='breath'>Just Breathing <Link className='back' to='/'>Back To Home</Link></div>
              <Link to='/signup'> <button className="btn btn-primary btn-lg btn-block btnn">Join Us</button></Link>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              {/* Render error message if available */}
              {
                error.__html && (<div className='error' dangerouslySetInnerHTML={error}></div>)
              }
              <form onSubmit={onsubmit} className="formm">
                <h3 className="h3">Login Here</h3>

                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control form-control-lg" placeholder='Your Email'
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)} />
                  <label className="form-label" htmlFor="email">

                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="password" className="form-control form-control-lg" placeholder='Your Password'
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)} />
                  <label className="form-label" htmlFor="password">

                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block btnnn">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;