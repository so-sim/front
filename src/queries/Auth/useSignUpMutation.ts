import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { setAccesToken } from '@/utils/acceessToken';
import { userState } from '@/store/userState';
import { kakaoSignUp } from '@/api/Auth';
import { TOAST_SUCCESS } from '@/constants/Toast';
import { ToastPopUp } from '@/components/@common/Toast';
import { isMobile } from 'react-device-detect';

const useSignUpMutation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  return useMutation(kakaoSignUp, {
    onSuccess: ({ content }) => {
      const { email, userId, accessToken } = content;
      setAccesToken(accessToken);
      setUser((prev) => ({
        ...prev,
        email,
        userId,
      }));
      ToastPopUp({ type: 'success', message: TOAST_SUCCESS.SIGNIN });
      if (isMobile) {
        navigate('/m-home');
        return;
      }
      navigate('/');
    },
  });
};

export default useSignUpMutation;
