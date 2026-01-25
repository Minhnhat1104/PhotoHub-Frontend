import { Area } from 'react-easy-crop';
import { CROP_AREA_ASPECT } from '.';
import './style.css';

interface OutputProps {
  image: string;
  croppedArea: Area;
  rotation: number;
}

const getRotatedSize = (width: number, height: number, rotation: number) => {
  const rad = (rotation * Math.PI) / 180;

  return {
    width: Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad)),
    height: Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad)),
  };
};

const Output = ({ image }: OutputProps) => {
  return (
    <div className="output" style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}>
      <img src={image} alt="" style={{ width: '100%' }} />
    </div>
  );
};

export default Output;
