import { useNavigate } from 'react-router-dom';
import { TopHeader, FullScreen } from './style';

const Header = props => {
  const { onFullScreen = () => {}, onExitFullScreen = () => {} } = props;
  const navigate = useNavigate();
  const handleFull = () => {
    const fullElement = document.fullscreenElement;
    if (!fullElement) {
      onFullScreen();
    } else {
      onExitFullScreen();
    }
  };

  return (
    <TopHeader className="h-[6vh] w-full absolute">
      <span>WZ8涡轴发动机工作原理教学系统</span>
      <FullScreen onClick={handleFull}></FullScreen>
    </TopHeader>
  );
};
export default Header;
