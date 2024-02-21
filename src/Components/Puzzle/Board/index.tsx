import React, {useContext, useEffect, useMemo} from 'react';
import PuzzlePiece from "../Piece";
import { CameraContext } from "../../Context/Camera";

interface PuzzleBoardProps {
    numberOfPieces: number;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ numberOfPieces }) => {
    const { setCameraTarget } = useContext(CameraContext)!;
    const pieces = [];

    // Calculate rows and columns more flexibly
    const cols = Math.ceil(Math.sqrt(numberOfPieces));
    const rows = Math.ceil(numberOfPieces / cols);
    const spacing = 1.1; // Space between pieces to ensure they don't overlap

    const { centerOffsetX, centerOffsetZ } = useMemo(() => {
        const offsetX = ((cols - 1) * spacing) / 2;
        const offsetZ = ((rows - 1) * spacing) / 2;
        return { centerOffsetX: offsetX, centerOffsetZ: offsetZ };
    }, [numberOfPieces, cols, rows, spacing]);

    useEffect(() => {
        if (setCameraTarget) {
            setCameraTarget(centerOffsetX, 0, centerOffsetZ);
        }
    }, [centerOffsetX, centerOffsetZ, setCameraTarget]);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Check to not exceed the pieceCount
            if (i * cols + j < numberOfPieces) {
                pieces.push(
                    <PuzzlePiece
                        key={`${i}-${j}`}
                        position={[j * spacing, 0, i * spacing]} // Adjusted for xz plane
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                );
            }
        }
    }

    return <>{pieces}</>;
};

export default PuzzleBoard;
