import { useNavigate } from 'react-router-dom';
import { TopHeader } from './style';

const Header = () => {
  const navigate = useNavigate();

  return <TopHeader className="h-58 pl-20 pr-20 xl:pl-0 xl:pr-0"></TopHeader>;
};
export default Header;
