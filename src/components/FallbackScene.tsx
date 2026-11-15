"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Procedural Three.js gallery — the fallback shown only when a photo
 * fails to load. A warm, minimal room: limestone floor, wood slat
 * wall, two round wall lights, soft daylight. Lightweight by design.
 */
export default function FallbackScene({
  stationId,
}: {
  stationId: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x141210);
    scene.fog = new THREE.Fog(0x141210, 8, 26);

    const camera = new THREE.PerspectiveCamera(
      55,
      host.clientWidth / host.clientHeight,
      0.1,
      60
    );
    camera.position.set(0, 1.6, 9);

    // Limestone floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0xbdb2a0, roughness: 0.9 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Warm cream back wall with a slatted rhythm
    const wall = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 10),
      new THREE.MeshStandardMaterial({ color: 0x8a7358, roughness: 0.8 })
    );
    wall.position.set(0, 5, -8);
    scene.add(wall);

    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x5f4a33,
      roughness: 0.7,
    });
    for (let i = 0; i < 22; i++) {
      const slat = new THREE.Mesh(new THREE.BoxGeometry(0.12, 10, 0.12), slatMat);
      slat.position.set(-11 + i * 1.05, 5, -7.9);
      scene.add(slat);
    }

    // Side walls
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x6b5a44,
      roughness: 0.85,
    });
    const left = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), sideMat);
    left.rotation.y = Math.PI / 2;
    left.position.set(-14, 5, 0);
    scene.add(left);
    const right = new THREE.Mesh(new THREE.PlaneGeometry(30, 10), sideMat);
    right.rotation.y = -Math.PI / 2;
    right.position.set(14, 5, 0);
    scene.add(right);

    // Round wall lights
    const lightMat = new THREE.MeshStandardMaterial({
      color: 0xf5ead6,
      emissive: 0xffd9a0,
      emissiveIntensity: 1.6,
    });
    const glow = new THREE.PointLight(0xffc98a, 24, 22, 2);
    glow.position.set(-5, 3.4, -7.6);
    scene.add(glow);
    const glow2 = new THREE.PointLight(0xffc98a, 18, 22, 2);
    glow2.position.set(5, 3.4, -7.6);
    scene.add(glow2);
    for (const x of [-5, 5]) {
      const disc = new THREE.Mesh(new THREE.CircleGeometry(0.55, 40), lightMat);
      disc.position.set(x, 3.4, -7.85);
      scene.add(disc);
    }

    // Soft daylight from above
    const sun = new THREE.DirectionalLight(0xfff2df, 1.1);
    sun.position.set(2, 10, 4);
    scene.add(sun);
    scene.add(new THREE.AmbientLight(0x8a7a66, 0.55));

    // A couple of lounge volumes for depth
    const seatMat = new THREE.MeshStandardMaterial({
      color: 0x241f1a,
      roughness: 0.95,
    });
    for (const x of [-3.4, 3.4]) {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.7, 1.1), seatMat);
      seat.position.set(x, 0.35, 1.5);
      scene.add(seat);
    }

    // Gentle camera sway reacting to the pointer
    let px = 0;
    let py = 0;
    const onMove = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      camera.position.x += (px * 0.6 - camera.position.x + Math.sin(t * 0.12) * 0.35) * 0.03;
      camera.position.y += (1.6 - py * 0.25 - camera.position.y) * 0.03;
      camera.lookAt(0, 1.6, -8);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!host.clientWidth) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      host.removeChild(renderer.domElement);
    };
  }, [stationId]);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0"
      role="img"
      aria-label="Stylised fallback illustration of a warm gallery interior"
    />
  );
}
