import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { Home } from './components/Home/index';
import { AuthLayout } from './components/authLayout/index';
import { Login } from './components/login/index';
import { Register } from './components/register/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
