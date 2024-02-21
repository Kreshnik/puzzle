import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import {useFrame} from "@react-three/fiber";
import {useTexture} from "@react-three/drei";

interface PuzzlePieceProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
    index: number;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ position, rotation = [0, 0, 0], scale = [1, 1, 1], index }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [isPickedUp, setIsPickedUp] = useState(false);
    const [disappear, setDisappear] = useState(false);

    const texture = useTexture(`https://picsum.photos/100/100?random=${index}`);

    const handleClick = () => {
        setIsPickedUp(true);
    };

    useFrame((state, delta) => {
        if (meshRef.current && isPickedUp && !disappear) {
            // Move the piece upward and add rotation around the x-axis
            meshRef.current.position.y += delta * 2; // Adjust speed of upward movement as needed
            meshRef.current.rotation.x -= delta * 2; // Adjust speed of rotation to simulate being picked up

            // Check if the piece has moved enough to disappear
            if (meshRef.current.position.y > position[1] + 1) { // Adjust height as needed for the disappear condition
                setDisappear(true);
            }
        }
    });

    useEffect(() => {
        if (disappear && meshRef.current) {
            // Make the piece disappear, for example by setting visibility to false
            meshRef.current.visible = false;
        }
    }, [disappear]);

    const baseGeometry = new THREE.BoxGeometry(1, 1, 0.1);

    return (
        <mesh onClick={handleClick} ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={baseGeometry}>
            <meshStandardMaterial map={texture} emissive={'#333333'} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default PuzzlePiece;
