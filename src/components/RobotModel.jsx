import gsap from 'gsap';
import Lenis from 'lenis';
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
      1000
    );
    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 0;

    // Initial Scene
    const scene = new THREE.Scene();

    // Initial Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.toneMappingExposure = 0; // Ubah nilai sesuai kebutuhan

    //enable shadow
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setPixelRatio(2);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const topLight = new THREE.DirectionalLight(0xffffff);
    topLight.position.set(0, 10, 5);
    scene.add(topLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    // Configure shadow details
    directionalLight.shadow.mapSize.width = window.innerWidth;
    directionalLight.shadow.mapSize.height = window.innerHeight;
    directionalLight.shadow.camera.near = 0.8;
    directionalLight.shadow.camera.far = 30;
    scene.add(directionalLight);

    // Initial Model
    let robot;
    const loader = new GLTFLoader();
    const modelPath = new URL('../assets/robot.glb', import.meta.url).href;

    let mixer,
      actions = {},
      currentAction;
    loader.load(
      modelPath,
      function (gltf) {
        if (!scene.children.includes(gltf.scene)) {
          // ✅ Cek apakah model sudah ada
          robot = gltf.scene;
          scene.add(robot);

          robot.position.y = -2;
          robot.position.x = 4;
          robot.position.z = 0.2;
          robot.scale.set(0.3, 0.3, 0.3);

          mixer = new THREE.AnimationMixer(robot);
          mixerRef.current = mixer;

          // Ambil semua animasi yang tersedia
          gltf.animations.forEach((clip) => {
            actions[clip.name] = mixer.clipAction(clip);
          });

          // Mulai dengan animasi pertama
          currentAction = actions[ROBOT_ANIMATIONS.ROOT_WALK];

          if (currentAction) {
            currentAction.setEffectiveTimeScale(1);
            currentAction.play();
          }

          modelMove();
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

    let arrPositionModel = [
      {
        id: 'welcome',
        position: {
          x: -4,
          y: -1,
          z: 0,
        },
        rotation: {
          x: 0,
          y: Math.PI / 2,
          z: 0,
        },
        animation: ROBOT_ANIMATIONS.ROOT_IDLE_ALT,
        duration: 0.8,
      },
      {
        id: 'skills',
        position: {
          x: 4,
          y: -2,
          z: -0.5,
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0,
        },
        animation: ROBOT_ANIMATIONS.ROOT_IDLE,
        duration: 0.4,
      },
    ];

    // Fungsi untuk mengganti animasi
    function switchAnimation(newAnimation, speed) {
      if (!actions[newAnimation] || !currentAction) return;

      if (currentAction._clip.name === newAnimation) return;

      const prevAction = currentAction;
      currentAction = actions[newAnimation];

      prevAction.fadeOut(0.2);
      currentAction
        .reset()
        .setEffectiveTimeScale(speed)
        .setEffectiveWeight(1)
        .fadeIn(0.3)
        .play();
    }

    const modelMove = () => {
      if (!robot) return;

      const sections = document.getElementsByTagName('section');
      console.log(sections);
      let currentSection;
      for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      }

      let currentSectionIndex = arrPositionModel.findIndex(
        (section) => section.id === currentSection
      );

      if (currentSectionIndex < 0) {
        currentSectionIndex = 0;
      }

      if (currentSectionIndex >= 0) {
        let newPositionModel = arrPositionModel[currentSectionIndex];
        gsap.to(robot.position, {
          x: newPositionModel.position.x,
          y: newPositionModel.position.y,
          z: newPositionModel.position.z,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          onStart: () => {
            //pilih animasi
            switchAnimation(ROBOT_ANIMATIONS.RUN, 1);
          },
          smoothOrigin: true,
          overwrite: 'auto',
          onComplete: () => {
            //pilih animasi
            switchAnimation(
              newPositionModel.animation,
              newPositionModel.duration
            );
          },
        });
        gsap.to(robot.rotation, {
          x: newPositionModel.rotation.x,
          y: newPositionModel.rotation.y,
          z: newPositionModel.rotation.z,
          smoothOrigin: true,
          overwrite: 'auto',
          duration: 0.8,
          ease: 'power1.out',
        });
      }
    };

    window.addEventListener('scroll', modelMove);

    reRender3D();

    if (robotRef.current) {
      robotRef.current.appendChild(renderer.domElement);
    }

    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      if (robotRef.current) {
        robotRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      window.removeEventListener('scroll', modelMove);
    };
  }, []);

  return <div ref={robotRef} className='absolute' />;
};

export default RobotModel;
