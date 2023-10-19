import React from 'react';
import { BeatLoader } from 'react-spinners';

type Props = {
  loading: boolean;
  color?: string;
  size?: number;
};

export const LoadingSpinner: React.FC<Props> = ({ loading, color = "#123abc", size = 15 }) => {
  return (
    <div className="spinner-container" style={{ textAlign: 'center', padding: '50px' }}>
    <BeatLoader loading={loading} color={color} size={size} />
  </div>
  );
};
