import React, { useState , useEffect } from 'react';
import './SignupDoctor.css';
import Mybackground from '../assets/sandrabackground.png';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axios';




const SignupDoctor = () => {

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/login')
    }
  }, [])

  const navigate = useNavigate();
  const [user_name, setUser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ __html: '' });

  const onsubmit = async (ev) => {
    ev.preventDefault();
    setError({ __html: '' })

    //first parameter for the url of the api second for databases
    axiosClient.post('/signup/doctor',
      {
        email,
        user_name,
        password,
        password_confirmation: confirmpassword,
      }).then((response) => {
        JSON.stringify(response)
        localStorage.setItem('user-info', response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user-type', response.data.user_type);
        console.log('data added successfully');
        navigate('/login'); // Navigate to the login page

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
              <img src={Mybackground} className="img-fluid" alt="sandra" />
              <div className='color'>
                Already have an Account? <Link to='/login'>Login</Link>
              </div>
              {/* Render error message if available */}
              {
                error.__html && (<div className='error' dangerouslySetInnerHTML={error}></div>)
              }
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={onsubmit} className="formm">
                <h3 className="h3">Signup Here Doctor</h3>

                <div className="form-outline mb-0">
                  <input
                    type="text"
                    id="user_name"
                    name='user_name'
                    className="form-control form-control-lg"
                    placeholder='Your User Name'
                    value={user_name}
                    onChange={ev => setUser_name(ev.target.value)}
                  />
                </div>

                <div className="form-outline mb-0">
                  <input
                    type="email"
                    id="email"
                    className="form-control form-control-lg"
                    placeholder='Your Email'
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}
                  />
                </div>

                <div className="form-outline mb-0">
                  <input
                    type="password"
                    id="password"
                    name='password'
                    className="form-control form-control-lg"
                    placeholder='Password'
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                  />
                </div>

                <div className="form-outline mb-0">
                  <input
                    type="password"
                    id="confirmpassword"
                    name='confirmpassword'
                    className="form-control form-control-lg"
                    placeholder='Confirm Password'
                    value={confirmpassword}
                    onChange={ev => setConfirmPassword(ev.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupDoctor;