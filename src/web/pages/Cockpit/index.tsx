import Header from '@components/Header';
import LeftNav from '@components/LeftNav';
import Button from '@mui/material/Button/Button';
import { Right, Title, BoxContainer } from './style';

const Cockpit = (): JSX.Element => {
  const MiddleComponent = () => {
    return (
      <div className="bg-[#ccc] pt-[6vh] h-[100vh]">
        <img className="block w-full h-full" src="/public/images/cockpit.webp" alt="直9" />
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <Right>
        <div className="relative" id="right">
          <Title className="">操作</Title>
          <BoxContainer className="w-full">
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                //   onClick={handleBegin}
                variant="contained"
                className="p-5 mb-10"
              >
                动力系统
              </Button>
            </div>

            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                //   onClick={handlePause}
                variant="contained"
                className="p-5 mb-10"
              >
                燃油系统
              </Button>
            </div>
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleWalls}
                variant="contained"
                className="p-5 mb-10"
              >
                滑油系统
              </Button>
            </div>

            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleModel}
                variant="contained"
                className="p-5"
              >
                电气系统
              </Button>
            </div>
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleFloor}
                variant="contained"
                className="p-5"
              >
                火警系统
              </Button>
            </div>
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleMusic}
                variant="contained"
                className="p-5"
              >
                操纵系统
              </Button>
            </div>
          </BoxContainer>
        </div>
      </Right>
    );
  };
  return (
    <div className="w-full h-screen">
      <Header />
      <LeftNav />
      <MiddleComponent />
      <RightComponent />
    </div>
  );
};
export default Cockpit;
