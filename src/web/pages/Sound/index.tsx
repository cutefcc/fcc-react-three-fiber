import Header from '@components/Header';
import LeftNav from '@components/LeftNav';
import Button from '@mui/material/Button/Button';
import { Right, Title, BoxContainer } from './style';

const Sound = (): JSX.Element => {
  const MiddleComponent = () => {
    return (
      <div className="bg-[#ccc] pt-[6vh] h-[100vh] flex justify-center items-center">
        <div>这里到时候放一个XX图</div>
        {/* <img className="block w-full h-full" src="/public/images/cockpit.webp" alt="直9" /> */}
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
                慢车
              </Button>
            </div>

            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                //   onClick={handlePause}
                variant="contained"
                className="p-5 mb-10"
              >
                起飞
              </Button>
            </div>
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleWalls}
                variant="contained"
                className="p-5 mb-10"
              >
                巡航1
              </Button>
            </div>

            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleModel}
                variant="contained"
                className="p-5"
              >
                巡航2
              </Button>
            </div>
            <div className="mr-5 mb-10">
              <Button
                style={{ background: 'rgba(81, 99, 140, 0.4)' }}
                // onClick={handleFloor}
                variant="contained"
                className="p-5"
              >
                应急
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
export default Sound;
