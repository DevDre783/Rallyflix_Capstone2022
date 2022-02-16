import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./Form.css"


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className="background__container"></div>
      <div className='form__container'>
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form__top__text'>
            <h1>Login</h1>
          </div>
          <div>
            <input
              name='email'
              type='text'
              placeholder='Email Address'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              name='password'
              type='Password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
            <button type='submit'>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
