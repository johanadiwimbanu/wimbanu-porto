import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const ROBOT_ANIMATIONS = {
  RUN: 'run',
  IDLE: 'IDLE',
  WALK: 'walk',
  BASE_POSE: 'root|Base-pose',
  ROOT_IDLE: 'root|idle',
  ROOT_IDLE_ALT: 'root|IDLE',
  ROOT_RUN: 'root|run',
  ROOT_WALK: 'root|walk',
};

const RobotModel = () => {
  const robotRef = useRef(null);
  const mixerRef = useRef(null);
  const isMounted = useRef(false); // 🔹 Cegah useEffect dipanggil dua kali

  useEffect(() => {
    if (isMounted.current) return; // 🔹 Jika sudah pernah di-mount, return
    isMounted.current = true;

    // Initial Camera
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.z = 10;
    camera.position.x = 2.5;
    camera.position.y = 1;

    // Initial Scene
    const scene = new THREE.Scene();

    // Initial Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Initial Model
    let robot;
    const loader = new GLTFLoader();
    const modelPath = new URL('../assets/robot.glb', import.meta.url).href;

    loader.load(
      modelPath,
      function (gltf) {
        if (!scene.children.includes(gltf.scene)) {
          // ✅ Cek apakah model sudah ada
          robot = gltf.scene;
          scene.add(robot);
          gltf.scene.rotation.y = Math.PI / 2;

          const mixer = new THREE.AnimationMixer(robot);
          mixerRef.current = mixer;

          //pilih animasi
          if (gltf.animations.length > 0) {
            const action = mixer.clipAction(
              gltf.animations.find(
                (anim) => anim.name === ROBOT_ANIMATIONS.ROOT_IDLE_ALT
              )
            );
            action.setDuration(0.8);
            action.play();
          }
        }
      },
      undefined,
      function (error) {
        console.error('Error loading model:', error);
      }
    );

    // Render Loop
    const clock = new THREE.Clock();
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }
    };
    reRender3D();

    if (robotRef.current) {
      robotRef.current.appendChild(renderer.domElement);
    }

    return () => {
      if (robotRef.current) {
        robotRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={robotRef} className='absolute' />;
};

export default RobotModel;
