import { Physics, usePlane, useBox } from '@react-three/cannon';
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
import { memo, useLayoutEffect } from 'react';
import * as THREE from 'three';

const planeColor = new THREE.Color(0x000000);

interface Props {
  showFloor: { show: boolean };
}

const Floor = memo((props: Props) => {
  console.log('floor render');
  const { showFloor } = props;
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
  return showFloor.show ? (
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
});
export default Floor;
