import React from 'react';

interface CameraContextType {
    setCameraTarget: (x: number, y: number, z: number) => void;
}

export const CameraContext = React.createContext<CameraContextType | undefined>(undefined);
