import React, { Suspense, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float, useGLTF, Center, Bounds, Clone } from '@react-three/drei';
import * as THREE from 'three';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error("CarViewer Error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center h-full w-full border border-red-500/20 bg-red-500/5 rounded-xl text-center p-6">
                    <div>
                        <span className="text-red-500 font-mono text-sm uppercase tracking-widest block mb-2">3D Model Error</span>
                        <p className="text-xs text-muted font-mono">{this.state.error?.message || "Failed to load car.glb"}</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const CarModel = () => {
    const { scene } = useGLTF(`${import.meta.env.BASE_URL}car.glb`);

    // Center and scale the model automatically if needed
    //scene.scale.set(1, 1, 1);

    // Use <Clone> instead of <primitive> because this component is mounted 
    // in multiple Canvases (Hero and SpecsPanel) simultaneously.
    return <Clone object={scene} />;
};

const CarViewer = ({ scrollProgress = 0 }) => {
    return (
        <div className="w-full h-full min-h-[500px] relative">
            <ErrorBoundary>
                <Canvas shadows dpr={[1, 2]}>
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={50} />

                        {/* Flood the scene with light so the car is clearly visible */}
                        <ambientLight intensity={1.4} />
                        <directionalLight position={[5, 15, 10]} intensity={4} castShadow />
                        <directionalLight position={[-5, 10, -5]} intensity={4} />
                        <spotLight position={[10, 20, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
                        <pointLight position={[-8, 5, -8]} color="#E63946" intensity={2} />
                        <pointLight position={[8, 5, 8]} color="#ffffff" intensity={2} />

                        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
                            <Bounds fit clip observe margin={1}>
                                <Center>
                                    <CarModel />
                                </Center>
                            </Bounds>
                        </Float>

                        <OrbitControls
                            makeDefault
                            enableZoom={true}
                            enablePan={true}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI}
                            autoRotate={false}
                            autoRotateSpeed={0.5}
                        />

                        <Environment preset="city" />
                    </Suspense>
                </Canvas>
            </ErrorBoundary>

            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        </div>
    );
};

export default CarViewer;
