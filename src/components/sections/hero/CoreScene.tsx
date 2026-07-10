"use client";

import { useEffect, useRef } from "react";

/* ─── Simplex noise GLSL ─── */
const noiseGLSL = `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/* ─── Shaders ─── */
const vertexShader = `
  varying vec3 vNormal;
  varying float vNoise;
  uniform float uTime;
  ${noiseGLSL}
  void main(){
    vec3 pos = position;
    float n = snoise(pos * 0.9 + vec3(0.0, 0.0, uTime * 0.18));
    float n2 = snoise(pos * 2.1 - vec3(uTime * 0.12, 0.0, 0.0)) * 0.35;
    float disp = (n + n2) * 0.42;
    pos += normal * disp;
    vNoise = disp;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying float vNoise;
  uniform vec3 uColorDeep;
  uniform vec3 uColorBright;
  void main(){
    float rim = pow(1.0 - abs(vNormal.z), 2.2);
    float core = smoothstep(-0.4, 0.5, vNoise);
    vec3 col = mix(uColorDeep, uColorBright, core);
    col += rim * uColorBright * 0.9;
    float alpha = clamp(rim * 0.6 + core * 0.16, 0.04, 0.65);
    gl_FragColor = vec4(col, alpha);
  }
`;

export default function CoreScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let destroyed = false;
    const currentCleanupRef = cleanupRef;
    currentCleanupRef.current = null;

    (async () => {
      const THREE = await import("three");
      if (destroyed) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        42,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 9.5);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      el.appendChild(renderer.domElement);

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const coreGeo = new THREE.IcosahedronGeometry(2.5, 8);
      const coreMat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColorDeep: { value: new THREE.Color(0x05140a) },
          uColorBright: { value: new THREE.Color(0x1FC77E) },
        },
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

      const glowGeo = new THREE.SphereGeometry(1.9, 32, 32);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x1FC77E,
        transparent: true,
        opacity: 0.1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glow);

      const dustCount = 200;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        const r = 5 + Math.random() * 9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
        dustPos[i * 3 + 2] = r * Math.cos(phi) * 0.6 - 2;
      }
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0x169B62,
        size: 0.015,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      let targetX = 0, targetY = 0, curX = 0, curY = 0;

      const handleMouse = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
        targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      };
      window.addEventListener("mousemove", handleMouse, { passive: true });

      const handleResize = () => {
        if (destroyed) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      const clock = new THREE.Clock();
      let animationId = 0;

      const animate = () => {
        if (destroyed) return;
        animationId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        if (!reduceMotion) {
          coreMat.uniforms.uTime.value = t;
          core.rotation.y = t * 0.04;
          core.rotation.x = Math.sin(t * 0.07) * 0.04;
          glow.rotation.y = -t * 0.02;
          const s = 1 + Math.sin(t * 0.4) * 0.015;
          glow.scale.set(s, s, s);
          dust.rotation.y = t * 0.006;
          curX += (targetX - curX) * 0.03;
          curY += (targetY - curY) * 0.03;
          camera.position.x = curX;
          camera.position.y = -curY;
          camera.lookAt(0, 0, 0);
        }

        renderer.render(scene, camera);
      };
      animate();

      currentCleanupRef.current = () => {
        destroyed = true;
        cancelAnimationFrame(animationId);
        window.removeEventListener("mousemove", handleMouse);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        coreGeo.dispose();
        coreMat.dispose();
        glowGeo.dispose();
        glowMat.dispose();
        dustGeo.dispose();
        dustMat.dispose();
        if (el.contains(renderer.domElement)) {
          el.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      destroyed = true;
      currentCleanupRef.current?.();
      currentCleanupRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
