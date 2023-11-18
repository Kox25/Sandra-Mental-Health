import React, { useEffect } from 'react';
import vid from '../assets/intro.mp4';
import './User.css';
import { Container } from 'react-bootstrap';
import Navbarr from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <Container>
        <video className='vid' src={vid} controls autoPlay loop type="video/mp4" />
      </Container>
    </div>
  );
}