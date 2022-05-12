import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './style.scss';
// import axios from 'axios';
import { useDispatch } from 'react-redux';

// import { useLoginMutation } from '../../Api/api';

// import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../redux/Actions/AuthActions';

export const Login = () => {
  const [show, setShow] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  // const [login, { isLoading, data, error }] = useLoginMutation();

  const dispatch = useDispatch();

  const fetchLogin = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          'login',
          JSON.stringify({
            isLogin: res.payload.success,
            token: res.payload.accessToken,
          })
        );
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  console.log();
  return (
    <>
      <div content="Login" title="Login" />
      <h4 className="title mt-5">ログイン</h4>
      <form id="loginForm" onSubmit={fetchLogin}>
        <div className="form-group">
          <label htmlFor="UserName">Email</label>
          <input
            type="email"
            className="form-control-auth"
            id="UserName"
            onChange={(e) => setUsername(e.target.value)}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-user.png"
            alt=""
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password</label>
          <input
            type={show ? 'password' : 'text'}
            className="form-control-auth"
            id="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className="icon-input"
            src="https://pharma.its-globaltek.com/wp-content/themes/pharmacy/assets/imgs/icon/ic-key.png"
            alt=""
          />
          <div className="show-pass" onClick={() => setShow(!show)}>
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              color="#515151"
              size="sm"
            />
          </div>
        </div>

        <div className="d-flex justify-content-between remember-block">
          <div className="checkbox-remember">
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label htmlFor="vehicle1"> remember</label>
          </div>
          {/* <Link
            to="member/lostpassword"
            className="text-decoration-none text-forgot"
          >
            forgetPassword
          </Link> */}
        </div>
        <button className="btn btn-primary d-block m-auto">Đăng nhập</button>
      </form>
      {/* <ToastContainer /> */}

      <div className="d-flex justify-content-center mt-3  ">
        <p>
          Bạn chưa có tài khoản?<Link to="/register">Đăng ký</Link>
        </p>
      </div>
      <div className="d-flex justify-content-center note">
        <Link to="/" className="me-3">
          Điều khoản sử dụng
        </Link>
        <Link to="/">Chính sách bảo mật</Link>
      </div>
      <div className="dropdown-language-menu">
        <span className="footer-text">Kurofune 2022</span>
      </div>
    </>
  );
};
