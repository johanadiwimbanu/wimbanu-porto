import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
gsap.registerPlugin(ScrollTrigger);

const Fox = () => {
  const modelRef = useRef(null);
  const mixerRef = useRef();
  const isMounted = useRef(null);
  let currentAction;

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 70, 150); // Ubah posisi kamera agar bisa melihat bayangan

    const scene = new THREE.Scene();

    // ✅ Tambahkan Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    // ✅ Tambahkan Directional Light dengan Shadow
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 20, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = window.innerWidth;
    directionalLight.shadow.mapSize.height = window.innerHeight;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.bias = -0.0001; // Mengurangi shadow artifacts
    scene.add(directionalLight);

    // Posisikan lightTarget tepat di bawah model
    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);
    scene.add(lightTarget);
    directionalLight.target = lightTarget;

    // Tambahkan Plane sebagai Lantai untuk Bayangan
    const planeGeo = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight
    );
    const meshMaterial = new THREE.ShadowMaterial({
      opacity: 0.5, // Material khusus untuk menampilkan bayangan
    });
    const mesh = new THREE.Mesh(planeGeo, meshMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // ✅ Load Model
    const loader = new GLTFLoader();
    const modelPath = new URL('../assets/3d/fox.glb', import.meta.url).href;
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        scene.add(model);

        // ✅ Aktifkan Bayangan pada Model
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
          }
        });
        // ✅ Tambahkan Animasi
        const animationMixer = new THREE.AnimationMixer(model);
        mixerRef.current = animationMixer;
        setAnimation(
          animationMixer,
          gltf.animations,
          'Fox_Somersault_InPlace',
          false,
          () => {
            setAnimation(
              animationMixer,
              gltf.animations,
              'Fox_Sit1',
              false,
              () => {
                setAnimation(
                  animationMixer,
                  gltf.animations,
                  'Fox_Sit_Idle_Break'
                );
              }
            );
          }
        );

        gsap.to(model.rotation, {
          scrollTrigger: {
            trigger: '.welcome',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: -0.8,
          delay: 1,
          ease: 'power2.in',
        });

        gsap.to(model.position, {
          scrollTrigger: {
            trigger: '.welcome',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          x: 100,
          y: -20,
          delay: 0.5,
          duration: 2,
          ease: 'power3.inOut',
          onReverseComplete: () => {
            setAnimation(
              animationMixer,
              gltf.animations,
              'Fox_Somersault_InPlace',
              false,
              () => {
                setAnimation(
                  animationMixer,
                  gltf.animations,
                  'Fox_Sit1',
                  false,
                  () => {
                    setAnimation(
                      animationMixer,
                      gltf.animations,
                      'Fox_Sit_Idle_Break'
                    );
                  }
                );
              }
            );
          },
          onStart: () => {
            setAnimation(animationMixer, gltf.animations, 'Fox_Walk_InPlace');
          },
          onUpdate: () => {
            // Update light untuk mengikuti model dengan tepat
            mesh.position.y = model.position.y;

            gsap.to(mesh.position, {
              x: model.position.x,
              y: model.position.y,
              z: model.position.z,
            });

            directionalLight.position.set(
              model.position.x,
              +20,
              model.position.y + 20, // Kurangi offset
              model.position.z + 20 // Tambah sedikit offset Z untuk sudut shadow yang lebih baik
            );

            lightTarget.position.set(
              model.position.x,
              model.position.y, // Tepat di ground plane
              model.position.z
            );
          },
          onComplete: () => {
            setAnimation(animationMixer, gltf.animations, 'Fox_Sit_Idle_Break');
          },
        });
        gsap.to(model.scale, {
          scrollTrigger: {
            trigger: '.welcome',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          x: 3,
          y: 3,
          z: 3,
        });
      },
      undefined,
      (error) => console.error(error)
    );

    // ✅ Inisialisasi Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Animasi smooth saat berhenti
    controls.dampingFactor = 0.05; // Seberapa cepat kontrol berhenti
    controls.screenSpacePanning = false; // Tidak bisa digeser ke atas/bawah secara bebas
    controls.minDistance = 150; // Zoom minimum
    controls.maxDistance = 300; // Zoom maksimum
    controls.maxPolarAngle = Math.PI / 2; // Batas atas rotasi kamera (0 = bebas)
    controls.enablePan = false; // Hindari geser horizontal
    controls.enableZoom = false; // Hindari geser horizontal

    const clock = new THREE.Clock();
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      controls.update(); // Tambahkan ini agar smooth
      renderer.render(scene, camera);
      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }
    };
    reRender3D();

    if (!modelRef.current.hasChildNodes()) {
      modelRef.current.appendChild(renderer.domElement);
    }

    // Debug
    // 📌 4.1 CameraHelper untuk melihat shadow camera frustrum
    // const lightHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(lightHelper);

    return () => {
      if (modelRef.current?.hasChildNodes()) {
        modelRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const setAnimation = (
    mixer,
    animations,
    newAnimation,
    loop = true,
    onFinished = () => {}
  ) => {
    if (!animations || animations.length === 0) return;
    const clip = animations.find((anim) => anim.name === newAnimation);
    if (!clip) {
      console.warn('Animation name not found');
      return;
    }

    const newAction = mixer.clipAction(clip);
    if (!loop) {
      newAction.clampWhenFinished = true;
      newAction.loop = THREE.LoopOnce;
    }

    if (currentAction) {
      currentAction.fadeOut(0.3);
      newAction.enabled = true;
      newAction.setEffectiveWeight(1);
      newAction.setEffectiveTimeScale(1);
    }

    newAction.reset().fadeIn(0.3).play();
    newAction.getMixer().addEventListener('finished', (e) => {
      if (e.action === newAction) {
        onFinished();
      }
    });
    currentAction = newAction;
  };

  return <div ref={modelRef} className='fixed border border-blue-900'></div>;
};

export default Fox;
