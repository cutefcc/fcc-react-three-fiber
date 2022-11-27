import Header from '@components/Header';
import ReactPlayer from 'react-player';

const Flv = (): JSX.Element => {
  return (
    <div className="w-full h-screen">
      <Header fr="flv" />
      <ReactPlayer
        loop
        className="w-full h-screen"
        width="100%"
        height="100%"
        url="/public/models/animation.mp4"
        controls={true}
      />
      {/* <ReactFlvPlayer url="/public/models/animation.flv" heigh="100%" width="100%" /> */}
    </div>
  );
};
export default Flv;
