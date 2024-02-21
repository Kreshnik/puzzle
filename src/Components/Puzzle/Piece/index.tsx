import React, { useRef } from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

interface PuzzlePieceProps {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ position, rotation = [0, 0, 0], scale = [1, 1, 1] }) => {
    const meshRef = useRef<THREE.Mesh>(null!);

    const shape = new THREE.Shape();

    // Base rectangle
    shape.moveTo(-0.5, -0.5);
    shape.lineTo(-0.5, 0.5);
    shape.lineTo(0.5, 0.5);
    shape.lineTo(0.5, -0.5);
    shape.lineTo(-0.5, -0.5);

    // Add nobs and holes using CSG for complex shapes
    const extrudeSettings = {
        steps: 2,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 2,
    };

    const baseGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const baseMesh = new THREE.Mesh(baseGeometry);

    // Example of creating a nob using CSG, repeat for other nobs/holes
    const nobGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 8);
    const nobMesh = new THREE.Mesh(nobGeometry);
    nobMesh.position.set(0.25, 0, 0.1); // Adjust position accordingly

    // Use CSG to union the nob with the base piece
    const csgBase = CSG.fromMesh(baseMesh);
    const csgNob = CSG.fromMesh(nobMesh);
    const unionGeometry = CSG.toMesh(csgBase.union(csgNob), baseMesh.matrix);

    unionGeometry.geometry.computeVertexNormals();

    return (
        <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={unionGeometry.geometry}>
            <meshStandardMaterial color={'orange'} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default PuzzlePiece;
