import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GroupLayout from '../layouts/Group';
import KaKaoAuth from '../pages/Auth/Kakao';
import Home from '../pages/Home';
import TOS from '../pages/TOS';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/oauth2/code/kakao" element={<KaKaoAuth />} />
        <Route path="/tos" element={<TOS />} />
        <Route path="/group/:groupID/*" element={<GroupLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
