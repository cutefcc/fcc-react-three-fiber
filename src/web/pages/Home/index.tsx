import { memo, useEffect, useRef, Suspense, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Mesh } from 'three';
import * as THREE from 'three';
import Header from '@components/Header';
import { Canvas, ObjectMap } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  useProgress,
  useGLTF,
  useTexture,
  useKTX2,
  Text,
} from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Left, Right, Title, Button, ButtonPause, BoxContainer, BoxContainerItem } from './style';
import { useImmer } from '@hooks/useImmer';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
const planeColor = new THREE.Color(0x000000);
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
  const [showWalls, setShowWalls] = useImmer<boolean>(true); // 是否显示墙壁
  const [showModel, setShowModel] = useImmer<boolean>(true); // 是否显示主模型
  const [showFloor, setShowFloor] = useImmer<boolean>(true); // 是否显示地板
  // const [isRotate, setIsRotate] = useImmer<boolean>(false); // 是否旋转状态
  const [gsapRotation, setGsapRotation] = useImmer<gsap.core.Tween | null>(null);
  const [glb, setGlb] = useImmer<GLTF & ObjectMap>(useGLTF(`/public/models/Base.glb`));

  const handleNavClick = (index: number) => () => {
    setCurrNav(index);
  };
  useEffect(() => {}, []);
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
  const LoadAsyncModel = memo(() => {
    console.log('glb', glb);
    // enable shadow
    glb.nodes.mesh_0.castShadow = true;
    return showModel ? (
      <primitive
        castShadow
        receiveShadow
        object={glb.scene}
        scale={[0.04, 0.04, 0.04]}
        position={[0, 5, 0]}
      ></primitive>
    ) : null;
  });
  const handleBegin = () => {
    // setIsRotate(true);
    if (gsapRotation) {
      gsapRotation.play();
      return;
    }
    setGsapRotation(
      gsap.to(glb.scene.rotation, {
        y: Math.PI * 2, // 旋转一圈
        duration: 10, // 旋转一圈的时间
        repeat: -1, // 无限循环
        ease: 'linear', // 线性
        // yoyo: true, // 反向播放
      })
    );
  };
  const handlePause = () => {
    gsapRotation?.pause();
    // setIsRotate(false);
  };
  const handleWalls = () => {
    setShowWalls(!showWalls);
  };
  const handleModel = () => {
    setShowModel(!showModel);
  };
  const handleFloor = () => {
    setShowFloor(!showFloor);
  };
  const Floor = () => {
    // 用了这种方式，rotation position 只能在里面设置，不能写在mesh上（不生效）
    const [plane] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.5, 0],
    }));
    // const texture = useTexture('/public/textures/TexturesCom_FloorsCheckerboard0047_1_S.jpg');
    const texture = useTexture('/public/textures/floor01.jpg');
    useLayoutEffect(() => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 5); // x y 都是 100 * 0.5 = 50 个texture
    }, [texture]);
    return showFloor ? (
      <mesh ref={plane} receiveShadow>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          emissive={planeColor.set(0x000000)}
          // color={planeColor}
          map={texture}
          emissiveMap={texture}
          // emissiveIntensity={1}
        />
      </mesh>
    ) : null;
  };
  const Walls = () => {
    const [plane] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [0, -Math.PI / 2, 0],
      position: [50, 49.5, 0],
    }));
    const [plane1] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [0, Math.PI / 2, 0],
      position: [-50, 49.5, 0],
    }));
    const [plane2] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [0, Math.PI, 0],
      position: [0, 49.5, 50],
    }));
    const [plane3] = usePlane<THREE.Mesh>(() => ({
      mass: 0,
      rotation: [0, 0, 0],
      position: [0, 49.5, -50],
    }));
    const textureWall = useTexture(
      '/public/textures/TexturesCom_BrickJapanese0123_2_seamless_S.jpg'
    );
    // const textureWall = useTexture('/public/textures/wall2.jpg');
    const doorKtx = useKTX2('/public/textures/door1.ktx2');
    useLayoutEffect(() => {
      textureWall.wrapS = textureWall.wrapT = THREE.RepeatWrapping;
      textureWall.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      // textureWall.repeat.set(0.5, 0.5); // x y 都是 100 * 0.5 = 50 个texture
    }, [textureWall]);
    return (
      <>
        <mesh ref={plane} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          {/* <meshBasicMaterial
            attach="material"
            // emissive={planeColor.set(0xcccccc)} // 发光颜色
            color={planeColor} // 材质的颜色，默认设置为白色 (0xffffff)。
            map={doorKtx} // 纹理贴图
            // emissiveMap={doorKtx} // 发光贴图。默认为空。发光贴图颜色由发光颜色和发射强度调制。如果您有自发光贴图，请务必将自发光颜色设置为黑色以外的颜色
            // emissiveIntensity={0} // 发射光的强度。调制发光颜色。默认为 1
          /> */}
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall}
            emissiveMap={textureWall}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane1} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall}
            emissiveMap={textureWall}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane2} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall}
            emissiveMap={textureWall}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane3} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall}
            emissiveMap={textureWall}
            // emissiveIntensity={1}
          />
        </mesh>
      </>
    );
  };
  const LeftComponent = () => {
    return (
      <Left>
        <div className="relative" id="left">
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
    );
  };
  const SkyBox = () => {
    // const doorKtx = useKTX2('/public/textures/door1.ktx2');
    const texture = useTexture('/public/textures/TexturesCom_ReclaimedWoodWallColor_header4.jpg');

    return (
      <mesh>
        <sphereGeometry attach="geometry" args={[50, 50, 50]} />
        {/* 带自发光的天空盒 */}
        <meshPhongMaterial
          attach="material"
          // emissive={new THREE.Color(0xff2190)}
          // emissiveIntensity={0.1}
          side={THREE.BackSide}
          map={texture}
        />
      </mesh>
    );
  };
  const MiddleComponent = () => {
    return (
      <div className="w-full h-screen">
        <Canvas shadows={true}>
          {/* 可以改变position来调整camera的距离 和 方向，起到场景放大缩小功能 */}
          <PerspectiveCamera makeDefault position={[-8, 12, 32]} />
          {/* <PerspectiveCamera makeDefault position={[0, 20, 0]} /> */}
          <OrbitControls />
          {/* // 环境光 */}
          <ambientLight />
          {/* // 坐标轴 */}
          <axesHelper />
          {/* <pointLight position={[10, 10, 10]} /> */}
          {/* // 平行光1 */}
          <directionalLight
            position={[10, 10, 10]}
            intensity={0.7}
            castShadow={true}
            color={'#fff'}
          />
          {/*  平行光2 */}
          {/* <directionalLight
        position={[-10, 10, -10]}
        intensity={0.6}
        castShadow={true}
        color={'#Fff'}
      /> */}
          <Suspense fallback={<Loader />}>
            <LoadAsyncModel />
          </Suspense>
          <Physics>
            {/* {renderBox()} */}
            <Floor />
            {showWalls && <Walls />}
            {/* <SkyBox /> */}
          </Physics>
        </Canvas>
      </div>
    );
  };
  const RightComponent = () => {
    return (
      <Right>
        <div className="relative" id="right">
          <Title className="">操作</Title>
          <BoxContainer>
            {showModel && (
              <BoxContainerItem
                className={`p-5 mb-10 rounded-[4px]`}
                style={normalItemStyle}
                onClick={handleBegin}
              >
                开始
              </BoxContainerItem>
            )}
            {showModel && (
              <BoxContainerItem
                className={`p-5 mb-10 rounded-[4px]`}
                style={normalItemStyle}
                onClick={handlePause}
              >
                暂停
              </BoxContainerItem>
            )}

            <BoxContainerItem
              className={`p-5 mb-10 rounded-[4px]`}
              style={normalItemStyle}
              onClick={handleWalls}
            >
              {showWalls ? '隐藏房间' : '显示房间'}
            </BoxContainerItem>
            <BoxContainerItem
              className={`p-5 mb-10 rounded-[4px]`}
              style={normalItemStyle}
              onClick={handleModel}
            >
              {showModel ? '隐藏模型' : '显示模型'}
            </BoxContainerItem>
            <BoxContainerItem
              className={`p-5 mb-10 rounded-[4px]`}
              style={normalItemStyle}
              onClick={handleFloor}
            >
              {showFloor ? '隐藏Floor' : '显示Floor'}
            </BoxContainerItem>
          </BoxContainer>
        </div>
      </Right>
    );
  };
  return (
    <div ref={containerRef} className="bg-[#475569]">
      <Header onFullScreen={handleInFull} onExitFullScreen={handleExitFull} />
      <LeftComponent />
      <MiddleComponent />
      <RightComponent />
    </div>
  );
};
export default memo(Home);
