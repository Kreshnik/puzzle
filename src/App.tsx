import './App.css'

import { Canvas } from '@react-three/fiber'
import {Environment, MeshReflectorMaterial} from '@react-three/drei'
import PuzzleBoard from "./Components/Puzzle/Board";
import {CameraContext} from "./Components/Context/Camera";
import { Stats, OrbitControls } from '@react-three/drei'
import {useCallback, useState} from "react";



export const App = () => {
    const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 0, 0]);

    const handleSetCameraTarget = useCallback((x: number, y: number, z: number) => {
        setCameraTarget([x, y, z]);
    }, []);

    return (
        <CameraContext.Provider value={{ setCameraTarget: handleSetCameraTarget }}>
            <Canvas dpr={[1, 1.5]} camera={{fov: 70, position: [0, 2, 15]}}>
                <color attach="background" args={['#ececee']}/>
                <group position={[0, 0, 0]}>
                    <PuzzleBoard numberOfPieces={100}/>
                </group>
                <Environment preset="city"/>
                <OrbitControls target={cameraTarget}/>
                <Stats/>
            </Canvas>
        </CameraContext.Provider>
    );
}
