import React, { useEffect, useState } from 'react';
import './User.css';
import { useNavigate } from 'react-router-dom';
import vid from '../assets/intro.mp4';
import doctorImg from '../assets/doctoricon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCrown } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../axios';


export default function User() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);


  const fetchDoctor = async () => {
    try {
      const response = await axiosClient.post('/best/doctor');
      const data = response.data;

      if (data && data.doctors) {
        setDoctors(data.doctors)
      }
      else {
        console.log('Error fetching data:', error);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/login');
    }
    else {
      fetchDoctor();
    }
  }, []);




  const goToDoctors = () => {
    navigate('/doctor')
  }

  return (
    <div>
      <div class="w-full ml-auto flex flex-wrap mt-[100px]">

        {/*this section for animation and paragraph written */}
        <section className='mr-auto w-[30%] text-center mt-[11.5%]'>
          <button className='doctor rounded-2 h-[25%] w-[40%] border-3 text-light'
            onClick={goToDoctors}>Doctors</button>
        </section>

        {/*this section for the cards of best three doctors */}
        <section className='w-[65%] ml-auto'>

          <div className='text-center best cursor-pointer text-dark-emphasis'>
            Best Doctors
          </div>

          {/*here i want to show best three doctors*/}
          <ul className='flex space-x-[20px] m-2 p-2'>
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => {
                return (
                  <li key={doctor.id}>
                    <div >
                      <div className='w-60 p-2 rounded-4 car'>
                        <img src={doctorImg} className='w-[50%] m-auto text-center object-fit-cover rounded-full border border-secondary border-3 border-info'></img>
                        <div className='text-center mt-2'>
                          {doctor.user_name}
                        </div>
                        <div className='flex mt-3 mb-3'>
                          <div className=' mr-auto'>
                            {doctor.email}
                          </div>
                          <div className='ml-auto text-primary'>
                            <FontAwesomeIcon className='email' icon={faEnvelope}></FontAwesomeIcon>
                          </div>
                        </div>
                        <FontAwesomeIcon className='ml-[50%] text-yellow-500 text-xl' icon={faCrown}></FontAwesomeIcon>
                        <div className='text-center  mt-2'>
                          <button className='profile rounded-2 h-[25%] w-[50%] border-3 text-light'
                          >Profile</button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })
            )
              :
              <li>
                <div className='flex space-x-[20px] m-2 p-2'>
                  <div className='w-60 p-2 rounded-4 car'>
                    <img src={doctorImg} className='w-[50%] m-auto text-center object-fit-cover rounded-full border border-secondary border-3 border-info'></img>
                    <div className='text-center mt-2'>
                      Doctor Name
                    </div>
                    <div className='flex mt-3 mb-3'>
                      <div className=' mr-auto'>
                        Doctor Email
                      </div>
                      <div className='ml-auto text-primary'>
                        <FontAwesomeIcon className='email' icon={faEnvelope}></FontAwesomeIcon>
                      </div>
                    </div>
                    <FontAwesomeIcon className='ml-[50%] text-yellow-500 text-xl' icon={faCrown}></FontAwesomeIcon>
                    <div className='text-center  mt-2'>
                      <button className='profile rounded-2 h-[25%] w-[50%] border-3 text-light'
                      >Profile</button>
                    </div>
                  </div>
                </div>
              </li>
            }

          </ul>
        </section>
      </div>
    </div>
  );
}