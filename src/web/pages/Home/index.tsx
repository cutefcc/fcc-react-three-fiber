import { memo, useEffect, useRef } from 'react';
import gsap from 'gsap';
// import { Container } from './style';
import Header from '@components/Header';

const Home = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(containerRef.current);
  }, []);

  return (
    <div ref={containerRef}>
      <Header />
      <div className="w-full">home</div>
    </div>
  );
};
export default memo(Home);
