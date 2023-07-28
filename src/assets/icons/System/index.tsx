import Article from './Article.svg';
import Close from './Close.svg';
import Home from './Home.svg';
import Link from './Link.svg';
import Logout from './Logout.svg';
import Notice from './Notice.svg';
import Plus from './Plus.svg';
import Settings from './Settings.svg';
import Dots from './Dots.svg';
import PreParing from './PreParing.svg';
import Search from './Search.svg';

export const SYSTEM = {
  ARTICLE: <Article />,
  CLOSE_SM: <Close width={16} height={16} />,
  CLOSE_LG: <Close width={24} height={24} />,
  HOME: <Home />,
  LINK: <Link fill="#ffffff" />,
  LINK_BLACK: <Link fill="#3C3C3C" />,
  LOGOUT: <Logout />,
  NOTICE: <Notice />,
  PLUS: <Plus fill="#3C3C3C" width={32} height={32} />,
  PLUS_GRAY_SM: <Plus fill="#9C9C9C" width={16} height={16} />,
  PLUS_GRAY: <Plus fill="#9C9C9C" width={32} height={32} />,
  SETTING_SM: <Settings width={14} height={14} />,
  SETTING_MD: <Settings width={17} height={17} />,
  SETTING_LG: <Settings width={21} height={21} />,
  DOTS: <Dots />,
  PREPARING: <PreParing />,
  SEARCH_BLACK: <Search fill="#3C3C3C" />,
  SEARCH_GRAY: <Search fill="#9C9C9C" />,
};
