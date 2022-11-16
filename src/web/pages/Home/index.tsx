import { memo, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
// import { Container } from './style';
import Header from '@components/Header';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useProgress, useGLTF } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Left, Title, Button, ButtonPause, BoxContainer, BoxContainerItem } from './style';
import { useImmer } from '@hooks/useImmer';

const config = [
  {
    key: 1,
    text: '发动机',
    names: ['Etageres_Books'],
    animation: {
      position: [15, 10, -5],
      target: [2.3, 0, -2.3],
    },
  },
  {
    key: 2,
    text: '座舱操作',
    names: ['Bureau_Accueil'],
    animation: {
      position: [5, 10, -0],
      target: [11.4, 0, -0],
    },
  },
  {
    key: 3,
    text: '原理演示',
    names: ['Tables_Lectures'],
    animation: {
      position: [-11, 10, 0],
      target: [5, 0, -7.5],
    },
  },
  {
    key: 4,
    text: '控制训练',
    names: ['Murs_Groupe'],
    animation: {
      position: [11, 10, 0],
      target: [-5.5, 0, -5.8],
    },
  },
  {
    key: 5,
    text: '退出登录',
    names: ['Presentoire_Journaux'],
    animation: {
      position: [17, 10, -12],
      target: [7.3, 0, -3.6],
    },
  },
];
const currItemStyle = {
  background: 'rgba(81, 99, 140, 0.8)',
};
const normalItemStyle = {
  background: 'rgba(81, 99, 140, 0.3)',
};

const Home = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currNav, setCurrNav] = useImmer<number>(0);

  const handleNavClick = (index: number) => () => {
    setCurrNav(index);
  };
  useEffect(() => {
    // console.log(containerRef.current);
  }, []);
  const handleInFull = () => {
    console.log('handleFull');
    // make the element go to full-screen mode
    containerRef?.current
      ?.requestFullscreen()
      .then(function () {
        console.log('success');
        // element has entered fullscreen mode successfully
      })
      .catch(function (error) {
        console.log('error', error);
        // element could not enter fullscreen mode
      });
  };
  const handleExitFull = () => {
    // make the element out full-screen mode
    document
      .exitFullscreen()
      .then(function () {
        console.log('success');
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };
  const LoadAsyncModel = () => {
    const glb = useGLTF(`/public/models/Base.glb`);
    console.log('glb', glb);
    // 开启shadow
    glb.nodes.mesh_0.castShadow = true;
    return (
      <primitive
        castShadow
        receiveShadow
        object={glb.scene}
        scale={[0.04, 0.04, 0.04]}
        position={[0, 4, 0]}
      ></primitive>
    );
  };
  const Floor = () => {
    // 用了这种方式，rotation position 只能在里面设置，不能写在mesh上（不生效）
    const [plane] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
    }));
    return (
      <mesh ref={plane} receiveShadow>
        <planeGeometry attach="geometry" args={[40, 40]} />
        <meshStandardMaterial attach="material" color="#cccccc" />
      </mesh>
    );
  };
  const Box = (props: BoxProps) => {
    const [ref, api] = useBox<THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>>(() => ({
      mass: 1,
      position: props.position,
    }));
    return (
      <mesh
        ref={ref}
        castShadow
        onClick={e => {
          // console.log('click', e);
          ref.current?.material.color.set('green');
        }}
        onPointerOver={e => {
          ref.current?.material.color.set('#f60');
        }}
        // onPointerOut={e => {
        //   ref.current?.material.color.set('hotpink');
        // }}
      >
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color="hotpink" />
      </mesh>
    );
  };
  const renderBox = () => {
    {
      /* 创建几个个Box */
    }
    return Array.from({ length: 30 }, (_, i) => i).map((_, i) => {
      let x = 0,
        y = 0,
        z = 0;
      if (i === 0) {
        x = 4;
        y = 15;
        z = 0;
      } else if (i === 1) {
        x = 0;
        y = 15;
        z = 4;
      } else if (i === 2) {
        x = -4;
        y = 15;
        z = 0;
      } else if (i === 3) {
        x = 0;
        y = 15;
        z = -4;
      } else {
        x = Math.random() * 10 - 5;
        y = Math.random() * 10;
        z = Math.random() * 10 - 5;
      }

      return <Box key={i} position={[x, y, z]} />;
    });
  };
  return (
    <div ref={containerRef} className="bg-[#475569]">
      <Header onFullScreen={handleInFull} onExitFullScreen={handleExitFull} />
      <Left>
        <div className="relative">
          <Title className="">
            场景导航
            <Button></Button>
          </Title>
          <BoxContainer>
            {config.map((item, index) => {
              return (
                <BoxContainerItem
                  key={item.key}
                  className={`p-5 mb-10 rounded-[4px]`}
                  style={index === currNav ? currItemStyle : normalItemStyle}
                  onClick={handleNavClick(index)}
                >
                  {item.text}
                </BoxContainerItem>
              );
            })}
          </BoxContainer>
        </div>
      </Left>
      <div className="w-full h-screen">
        <Canvas shadows={true}>
          {/* 可以改变position来调整camera的距离 和 方向，起到场景放大缩小功能 */}
          <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
          {/* <PerspectiveCamera makeDefault position={[0, 20, 0]} /> */}
          <OrbitControls />
          {/* // 环境光 */}
          <ambientLight />
          {/* <pointLight position={[10, 10, 10]} /> */}
          {/* // 平行光1 */}
          <directionalLight
            position={[10, 10, 10]}
            intensity={0.6}
            castShadow={true}
            color={'#fff'}
          />
          {/* // 平行光2 */}
          <directionalLight
            position={[-10, 10, -10]}
            intensity={0.6}
            castShadow={true}
            color={'#Fff'}
          />
          <Suspense fallback={<Loader />}>
            <LoadAsyncModel />
          </Suspense>
          <Physics>
            {/* {renderBox()} */}
            <Floor />
          </Physics>
        </Canvas>
      </div>
    </div>
  );
};
export default memo(Home);
