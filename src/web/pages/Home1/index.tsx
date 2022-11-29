import { memo, useEffect, useRef, Suspense, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { Mesh } from 'three';
import * as THREE from 'three';
import Header from '@components/Header';
import { useNavigate } from 'react-router-dom';
import { Canvas, ObjectMap, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  useProgress,
  useGLTF,
  useTexture,
  useKTX2,
  Text,
  PositionalAudio,
} from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { useLoader } from '@react-three/fiber';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import { Left, Right, Title, SvgButton, BoxContainer, BoxContainerItem } from './style';
import { useImmer } from '@hooks/useImmer';
import Floor from './Floor';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
// import Button from '@mui/material/Button';
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

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sound = useRef(null);
  const camera = useRef(null);
  const dLight = useRef(null);
  const [currNav, setCurrNav] = useImmer<number>(0);
  const [showWalls, setShowWalls] = useImmer<boolean>(true); // 是否显示墙壁
  const [showModel, setShowModel] = useImmer<boolean>(true); // 是否显示主模型
  const [enableZoom, setEnableZoom] = useImmer<boolean>(true); // 是否运行场景缩放
  const [showFloor, setShowFloor] = useImmer<{ show: boolean }>({ show: true }); // 是否显示地板
  // const [isRotate, setIsRotate] = useImmer<boolean>(false); // 是否旋转状态
  const [gsapRotation, setGsapRotation] = useImmer<gsap.core.Tween | null>(null);
  // const [glb, setGlb] = useImmer<GLTF & ObjectMap>(useGLTF(`/public/models/Base.glb`));
  const [glb, setGlb] = useImmer<GLTF & ObjectMap>(
    useGLTF('/public/models/exhaust_nozzle_y.glb')
    // useGLTF('/public/models/test1.glb')
    // useLoader(OBJLoader, '/public/models/exhaust_nozzle.glb')
  );

  const handleNavClick = (index: number) => () => {
    setCurrNav(index);
  };
  useEffect(() => {}, []);

  const handleZoom = () => {
    setEnableZoom(!enableZoom);
  };
  const handleCameraTop = () => {
    gsap.to(camera.current.position, { x: 0, y: 35, z: 0, duration: 5, ease: 'power3' });
    gsap.to(dLight.current.position, { x: 0, y: 35, z: 0, duration: 5, ease: 'power3' });
  };
  const handleCameraBank = () => {
    gsap.to(camera.current.position, { x: 35, y: 12, z: 0, duration: 5, ease: 'power3' });
    gsap.to(dLight.current.position, { x: 35, y: 12, z: 0, duration: 5, ease: 'power3' });
  };
  const handleCameraFront = () => {
    gsap.to(camera.current.position, { x: -35, y: 12, z: 0, duration: 5, ease: 'power3' });
    gsap.to(dLight.current.position, { x: -35, y: 12, z: 0, duration: 5, ease: 'power3' });
  };
  const handleCameraSide1 = () => {
    gsap.to(camera.current.position, { x: 0, y: 12, z: 35, duration: 5, ease: 'power3' });
    gsap.to(dLight.current.position, { x: 0, y: 12, z: 35, duration: 5, ease: 'power3' });
  };
  const handleCameraSide2 = () => {
    gsap.to(camera.current.position, { x: 0, y: 12, z: -35, duration: 5, ease: 'power3' });
    gsap.to(dLight.current.position, { x: 0, y: 12, z: -35, duration: 5, ease: 'power3' });
  };
  const handleToFlv = () => {
    navigate('/flv');
  };
  const handleMusic = () => {
    sound?.current?.play();
  };
  const handleStopMusic = () => {
    sound?.current?.pause(); // 暂停
    // sound?.current?.stop(); // 停止
  };
  const handleInFull = () => {
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
    // enable shadow
    // glb.nodes.mesh_0.castShadow = true;
    console.log('glb', glb);
    // useFrame((state, delta) => {
    //   // console.log('state', state);
    //   camera.current.position.x += 0.01;
    // });
    glb.nodes.exhaust_nozzle_8.castShadow = true;
    // glb.nodes.Polygonal_Model_1_Triangles_0.castShadow = true;
    return showModel ? (
      <primitive
        castShadow
        receiveShadow
        object={glb.scene}
        // object={glb}
        scale={[0.02, 0.02, 0.02]}
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
    setShowFloor(draft => {
      draft.show = !draft.show;
    });
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
    const textureWall1 = useTexture('/public/images/WechatIMG8.jpeg');
    const textureWall2 = useTexture('/public/images/WechatIMG9.jpeg');
    const textureWall3 = useTexture('/public/images/WechatIMG10.jpeg');
    const textureWall4 = useTexture('/public/images/WechatIMG11.jpeg');
    // const textureWall = useTexture('/public/textures/wall2.jpg');
    // const doorKtx = useKTX2('/public/textures/door1.ktx2');
    useLayoutEffect(() => {
      // textureWall.wrapS = textureWall.wrapT = THREE.RepeatWrapping;
      // textureWall.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      textureWall1.wrapS = textureWall1.wrapT = THREE.RepeatWrapping;
      // textureWall1.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      textureWall2.wrapS = textureWall2.wrapT = THREE.RepeatWrapping;
      // textureWall2.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      textureWall3.wrapS = textureWall3.wrapT = THREE.RepeatWrapping;
      // textureWall3.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      textureWall4.wrapS = textureWall4.wrapT = THREE.RepeatWrapping;
      // textureWall4.repeat.set(3, 3); // x y 都是 100 * 0.5 = 50 个texture
      // textureWall.repeat.set(0.5, 0.5); // x y 都是 100 * 0.5 = 50 个texture
    }, [textureWall1, textureWall2, textureWall3, textureWall4]);
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
            map={textureWall1}
            emissiveMap={textureWall1}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane1} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall2}
            emissiveMap={textureWall2}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane2} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall3}
            emissiveMap={textureWall3}
            // emissiveIntensity={1}
          />
        </mesh>
        <mesh ref={plane3} receiveShadow>
          <planeGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial
            attach="material"
            emissive={planeColor.set(0xcccccc)}
            // color={planeColor}
            map={textureWall4}
            emissiveMap={textureWall4}
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
            <SvgButton></SvgButton>
          </Title>
          <BoxContainer>
            {config.map((item, index) => {
              return (
                <BoxContainerItem
                  key={item.key}
                  className={`p-5 mb-10 rounded-[4px]`}
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
          <PerspectiveCamera ref={camera} makeDefault position={[-8, 12, 32]} />
          {/* <PerspectiveCamera makeDefault position={[0, 20, 0]} /> */}
          {/* // OrbitControls 用于控制相机的位置 */}
          <OrbitControls enableZoom={enableZoom} />
          {/* // 环境光 */}
          <ambientLight />
          {/* // 坐标轴 */}
          <axesHelper />
          {/* <pointLight position={[10, 10, 10]} /> */}
          {/* // 平行光1 */}
          <directionalLight
            ref={dLight}
            position={[10, 10, 15]}
            intensity={0.7}
            castShadow={true}
            color={'#f0f'}
          />
          <PositionalAudio
            ref={sound}
            url="/public/music/please-calm-my-mind-125566.mp3"
            distance={1}
            // loop
            // autoplay
            // {...props} // All THREE.PositionalAudio props are valid
          />
          <Suspense fallback={<Loader />}>
            <LoadAsyncModel />
          </Suspense>
          <Physics>
            <Floor showFloor={showFloor} />
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
              <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleBegin}>
                开始旋转
              </BoxContainerItem>
            )}
            {showModel && (
              <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handlePause}>
                暂停旋转
              </BoxContainerItem>
            )}
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleWalls}>
              {showWalls ? '隐藏墙壁' : '显示墙壁'}
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleModel}>
              {showModel ? '隐藏模型' : '显示模型'}
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleFloor}>
              {showFloor.show ? '隐藏地板' : '显示地板'}
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleMusic}>
              播放bgm
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleStopMusic}>
              暂停bgm
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleToFlv}>
              拆解动画
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleZoom}>
              {enableZoom ? '禁止缩放' : '允许缩放'}
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleCameraTop}>
              俯视图
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleCameraFront}>
              前视图
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleCameraBank}>
              后视图
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleCameraSide1}>
              侧视图1
            </BoxContainerItem>
            <BoxContainerItem className={`p-5 mb-10 rounded-[4px]`} onClick={handleCameraSide2}>
              侧视图2
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
