"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle Three.js particle field — a slowly drifting 3D starfield that
 * gently parallaxes toward the pointer. This is the "live wallpaper" layer.
 * Rendered behind everything, pointer-events none, GPU-accelerated.
 */
export function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    // Background wallpaper — it never needs to be retina-sharp, and every
    // extra pixel here is fragment-shader work on every frame.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Particle geometry — sized to the device so integrated GPUs and laptops
    // with few cores aren't spending their frame budget on the wallpaper.
    const isMobile = window.innerWidth < 768;
    const lowPower = (navigator.hardwareConcurrency ?? 4) <= 4;
    const COUNT = isMobile ? 260 : lowPower ? 380 : 600;
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      scales[i] = Math.random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // Soft round particle sprite via shader
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new THREE.Color("#3b82f6") },
        uColorB: { value: new THREE.Color("#22d3ee") },
        uColorC: { value: new THREE.Color("#8b5cf6") },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        varying float vMix;
        void main() {
          vec3 p = position;
          p.y += sin(uTime * 0.3 + position.x * 0.05) * 1.5;
          p.x += cos(uTime * 0.2 + position.z * 0.05) * 1.5;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (aScale * 3.0 + 0.6) * (300.0 / -mv.z);
          vMix = aScale;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;
        varying float vMix;
        void main() {
          float d = distance(gl_PointCoord, vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d);
          vec3 col = mix(uColorA, uColorB, vMix);
          col = mix(col, uColorC, smoothstep(0.6, 1.0, vMix));
          gl_FragColor = vec4(col, alpha * 0.9);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Pointer parallax
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    let last = 0;
    const FRAME_MS = 1000 / 30; // cap to ~30fps — plenty for a subtle drift, half the GPU cost
    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      if (now - last < FRAME_MS) return;
      last = now;
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;
      points.rotation.y = t * 0.02;
      // Ease camera toward pointer
      camera.position.x += (targetX * 6 - camera.position.x) * 0.03;
      camera.position.y += (-targetY * 4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    if (!reduce) raf = requestAnimationFrame(animate);
    else renderer.render(scene, camera);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Pause when tab hidden (battery friendly)
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
