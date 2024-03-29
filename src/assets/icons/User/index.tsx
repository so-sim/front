import KakaoSignIn from './KakaoSignIn.svg';
import KakaoSignUp from './KakaoSignUp.svg';
import Group from './Group.svg';
import Person from './Person.svg';
import theme from '../../../styles/Theme';
import MobileKakaoSignIn from './MobileKakaoSignIn.svg';
import MobileKakaoSignUp from './MobileKakaoSignUp.svg';

export const USER = {
  GROUP_SM: <Group width={16} height={16} fill={theme.colors.secondary_600} />,
  GROUP_MD: <Group width={20} height={20} fill={theme.colors.secondary_600} />,
  GROUP_LG: <Group width={24} height={24} fill={theme.colors.secondary_800} />,
  PERSON_SM: <Person width={16} height={16} />,
  PERSON_MD: <Person width={21} height={21} />,
  PERSON_24: <Person width={24} height={24} />,
  PERSON_LG: <Person width={28} height={28} />,
  PERSON_XL: <Person width={32} height={32} />,
  KAKAO_SIGNIN: <KakaoSignIn />,
  KAKAO_SIGNUP: <KakaoSignUp />,
  MOBILE_KAKAO_SIGNIN: <MobileKakaoSignIn />,
  MOBILE_KAKAO_SIGNUP: <MobileKakaoSignUp />,
};
