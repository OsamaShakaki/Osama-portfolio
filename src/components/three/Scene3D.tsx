'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_COUNT = 14;
const BLUE = '#3b82f6';
const PURPLE = '#8b5cf6';
const BLUE_VEC = new THREE.Color(BLUE);
const PURPLE_VEC = new THREE.Color(PURPLE);

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scene3DProps {
    className?: string;
    paused?: boolean;
}

interface NeuralSceneProps {
    isDark: boolean;
    paused: boolean;
    isMobile: boolean;
}

interface NeuralNodeProps {
    position: THREE.Vector3;
    index: number;
    isDark: boolean;
    paused: boolean;
}

// ─── Utility: fibonacci sphere distribution ───────────────────────────────────

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        points.push(
            new THREE.Vector3(
                Math.cos(theta) * r * radius,
                y * radius,
                Math.sin(theta) * r * radius,
            ),
        );
    }
    return points;
}

// ─── Mouse-reactive camera rig ────────────────────────────────────────────────

function CameraRig({ paused }: { paused: boolean }) {
    const { camera, gl } = useThree();
    const mouse = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handler = (e: PointerEvent) => {
            const rect = gl.domElement.getBoundingClientRect();
            mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        gl.domElement.addEventListener('pointermove', handler);
        return () => gl.domElement.removeEventListener('pointermove', handler);
    }, [gl]);

    useFrame(() => {
        if (paused) return;
        // Smooth lerp toward mouse
        target.current.x += (mouse.current.x * 0.3 - target.current.x) * 0.05;
        target.current.y += (mouse.current.y * 0.2 - target.current.y) * 0.05;
        camera.position.x = target.current.x * 1.5;
        camera.position.y = target.current.y * 1.0;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

// ─── Single neural node (small sphere) ────────────────────────────────────────

function NeuralNode({ position, index, isDark, paused }: NeuralNodeProps) {
    const ref = useRef<THREE.Mesh>(null!);
    const basePos = useMemo(() => position.clone(), [position]);
    const phase = useMemo(() => index * 0.45, [index]);

    // Interpolated color per node (blue → purple spread)
    const color = useMemo(() => {
        const c = new THREE.Color();
        c.lerpColors(BLUE_VEC, PURPLE_VEC, index / (NODE_COUNT - 1));
        return c;
    }, [index]);

    useFrame(({ clock }) => {
        if (!ref.current || paused) return;
        const t = clock.getElapsedTime();

        // Subtle orbiting motion
        const orbit = t * 0.3 + phase;
        const breathe = 1 + Math.sin(t * 0.8 + phase) * 0.08;
        ref.current.position.set(
            basePos.x * breathe + Math.sin(orbit) * 0.15,
            basePos.y * breathe + Math.cos(orbit * 0.7) * 0.1,
            basePos.z * breathe + Math.sin(orbit * 1.3) * 0.12,
        );

        // Pulse emissive intensity
        const emissiveStrength = 0.6 + Math.sin(t * 2 + phase) * 0.4;
        const mat = ref.current.material as THREE.MeshStandardMaterial;
        if (mat.emissiveIntensity !== undefined) {
            mat.emissiveIntensity = emissiveStrength;
        }
    });

    return (
        <mesh ref={ref} position={basePos}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.6}
                roughness={0.3}
                metalness={0.5}
                transparent
                opacity={isDark ? 0.95 : 0.8}
            />
        </mesh>
    );
}

// ─── Synapse lines from nodes to center ───────────────────────────────────────

const R3FLine = 'line' as any;

function Synapses({
    nodePositions,
    isDark,
    paused,
}: {
    nodePositions: THREE.Vector3[];
    isDark: boolean;
    paused: boolean;
}) {
    const lineRefs = useRef<(THREE.Line | null)[]>([]);
    const center = useMemo(() => new THREE.Vector3(0, 0, 0), []);

    // Pre-build geometries
    const geometries = useMemo(
        () =>
            nodePositions.map((pos) => {
                const geom = new THREE.BufferGeometry().setFromPoints([
                    center,
                    pos.clone(),
                ]);
                return geom;
            }),
        [nodePositions, center],
    );

    useFrame(({ clock }) => {
        if (paused) return;
        const t = clock.getElapsedTime();
        lineRefs.current.forEach((line, i) => {
            if (!line) return;
            const geom = line.geometry as THREE.BufferGeometry;
            const positions = geom.attributes.position as THREE.BufferAttribute;
            const phase = i * 0.45;
            const breathe = 1 + Math.sin(t * 0.8 + phase) * 0.08;
            const orbit = t * 0.3 + phase;
            // Update endpoint to match the node's animated position
            positions.setXYZ(
                1,
                nodePositions[i].x * breathe + Math.sin(orbit) * 0.15,
                nodePositions[i].y * breathe + Math.cos(orbit * 0.7) * 0.1,
                nodePositions[i].z * breathe + Math.sin(orbit * 1.3) * 0.12,
            );
            positions.needsUpdate = true;

            // Pulse opacity
            const mat = line.material as THREE.LineBasicMaterial;
            mat.opacity = 0.2 + Math.sin(t * 1.5 + phase) * 0.15;
        });
    });

    return (
        <>
            {geometries.map((geom, i) => {
                const color = new THREE.Color().lerpColors(
                    BLUE_VEC,
                    PURPLE_VEC,
                    i / (NODE_COUNT - 1),
                );
                return (
                    <R3FLine
                        key={i}
                        ref={(el: THREE.Line | null) => {
                            lineRefs.current[i] = el;
                        }}
                        geometry={geom}
                    >
                        <lineBasicMaterial
                            color={color}
                            transparent
                            opacity={isDark ? 0.35 : 0.25}
                            linewidth={1}
                        />
                    </R3FLine>
                );
            })}
        </>
    );
}

// ─── Central brain mesh ───────────────────────────────────────────────────────

function BrainMesh({ isDark, paused }: { isDark: boolean; paused: boolean }) {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        if (!ref.current || paused) return;
        const t = clock.getElapsedTime();
        ref.current.rotation.y = t * 0.15;
        ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[0.7, 4]} />
                <MeshDistortMaterial
                    color={isDark ? '#6366f1' : '#818cf8'}
                    emissive={isDark ? '#4f46e5' : '#6366f1'}
                    emissiveIntensity={isDark ? 1.2 : 0.7}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.35}
                    speed={paused ? 0 : 2}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Inner glow sphere */}
            <Sphere args={[0.45, 16, 16]}>
                <meshBasicMaterial
                    color={isDark ? '#a78bfa' : '#c4b5fd'}
                    transparent
                    opacity={0.15}
                />
            </Sphere>
        </Float>
    );
}

// ─── Ambient floating particles ───────────────────────────────────────────────

function AmbientParticles({
    count,
    isDark,
    paused,
}: {
    count: number;
    isDark: boolean;
    paused: boolean;
}) {
    const ref = useRef<THREE.Points>(null!);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return arr;
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current || paused) return;
        ref.current.rotation.y = clock.getElapsedTime() * 0.02;
        ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color={isDark ? '#a5b4fc' : '#818cf8'}
                transparent
                opacity={isDark ? 0.6 : 0.4}
                sizeAttenuation
            />
        </points>
    );
}

// ─── Full neural scene composition ────────────────────────────────────────────

function NeuralScene({ isDark, paused, isMobile }: NeuralSceneProps) {
    const nodePositions = useMemo(
        () => fibonacciSphere(NODE_COUNT, 1.6),
        [],
    );

    const particleCount = isMobile ? 60 : 150;

    return (
        <>
            {/* Lights */}
            <ambientLight intensity={isDark ? 0.25 : 0.4} />
            <pointLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 0.5} color={BLUE} />
            <pointLight position={[-5, -3, 3]} intensity={isDark ? 0.5 : 0.3} color={PURPLE} />
            <pointLight position={[0, -5, -5]} intensity={0.3} color="#6366f1" />

            {/* Camera rig for mouse reactivity */}
            <CameraRig paused={paused} />

            {/* Central brain */}
            <BrainMesh isDark={isDark} paused={paused} />

            {/* Neural nodes */}
            {nodePositions.map((pos, i) => (
                <NeuralNode
                    key={i}
                    position={pos}
                    index={i}
                    isDark={isDark}
                    paused={paused}
                />
            ))}

            {/* Synapse connections */}
            <Synapses
                nodePositions={nodePositions}
                isDark={isDark}
                paused={paused}
            />

            {/* Ambient particles */}
            <AmbientParticles count={particleCount} isDark={isDark} paused={paused} />
        </>
    );
}

// ─── CSS Gradient fallback ────────────────────────────────────────────────────

function CSSFallback({ isDark, className }: { isDark: boolean; className: string }) {
    return (
        <div
            className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
            style={{
                background: isDark
                    ? 'radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.1) 0%, transparent 50%), #0a0a0f'
                    : 'radial-gradient(ellipse at 30% 40%, rgba(99,102,241,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.06) 0%, transparent 50%), #fafafe',
            }}
        >
            {/* Animated gradient orbs as fallback */}
            <div
                style={{
                    position: 'absolute',
                    width: '40%',
                    height: '40%',
                    top: '25%',
                    left: '30%',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                    animation: 'pulse 4s ease-in-out infinite',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: '30%',
                    height: '30%',
                    top: '35%',
                    left: '35%',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
                    animation: 'pulse 3s ease-in-out infinite 1s',
                }}
            />
        </div>
    );
}

// ─── Main exported component ──────────────────────────────────────────────────

export function Scene3D({ className = '', paused = false }: Scene3DProps) {
    const [mounted, setMounted] = useState(false);
    const [webGLFailed, setWebGLFailed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    useEffect(() => {
        setMounted(true);

        // Detect mobile for performance scaling
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Probe for WebGL support
        try {
            const canvas = document.createElement('canvas');
            const gl =
                canvas.getContext('webgl2') || canvas.getContext('webgl');
            if (!gl) setWebGLFailed(true);
        } catch {
            setWebGLFailed(true);
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Pre-mount placeholder
    if (!mounted) {
        return <div className={`absolute inset-0 -z-10 ${className}`} />;
    }

    // Fallback if WebGL is unsupported
    if (webGLFailed) {
        return <CSSFallback isDark={isDark} className={className} />;
    }

    return (
        <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 50 }}
                dpr={isMobile ? [1, 1.5] : [1, 2]}
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: 'high-performance',
                    failIfMajorPerformanceCaveat: false,
                }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0);
                }}
                onError={() => setWebGLFailed(true)}
                style={{ background: 'transparent' }}
            >
                <NeuralScene isDark={isDark} paused={paused} isMobile={isMobile} />
            </Canvas>
        </div>
    );
}
