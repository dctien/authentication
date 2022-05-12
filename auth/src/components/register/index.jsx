import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/Actions/AuthActions';

export const Register = () => {
  const [showPass, setPass] = useState(true);
  const [showConfirmPass, setConfirmPass] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      return;
    }
    try {
      // await axios.post('http://localhost:5000/api/v1/auth/register', {
      //   username,
      //   password,
      // });
      dispatch(register({ username, password }))
        .then((res) => {
          console.log(res);
          navigate('/login');
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="header-register">
        <h4 className="title mt-5">Register</h4>
        {/* <p>description</p> */}
      </div>
      <form id="registerForm" onSubmit={fetchRegister}>
        <div className="row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control-auth"
              id="email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type={showPass ? 'password' : 'text'}
              className="form-control-auth"
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-pass" onClick={() => setPass(!showPass)}>
              <FontAwesomeIcon
                icon={showPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showConfirmPass ? 'password' : 'text'}
              className="form-control-auth"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="show-pass"
              onClick={() => setConfirmPass(!showConfirmPass)}
            >
              <FontAwesomeIcon
                icon={showConfirmPass ? faEyeSlash : faEye}
                color="#515151"
                size="sm"
              />
            </div>
          </div>
        </div>

        <button className="btn btn-primary d-block m-auto">Đăng ký</button>
      </form>

      <div className="d-flex justify-content-center note">
        <p>
          Bạn đã có tài khoản?
          <Link to="/login"> Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};
