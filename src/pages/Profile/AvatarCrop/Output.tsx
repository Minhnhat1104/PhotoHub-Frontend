import { Area } from 'react-easy-crop';
import { CROP_AREA_ASPECT } from '.';
import './style.css';

interface OutputProps {
  image: string;
  croppedArea: Area;
}

const Output = ({ image, croppedArea }: OutputProps) => {
  const scale = 100 / croppedArea.width;
  console.log('🚀 ~ Output ~ croppedArea:', croppedArea);
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: 'calc(100% + 0.5px)',
    height: 'auto',
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div className="output" style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}>
      <img src={image} alt="" style={imageStyle} />
    </div>
  );
};

export default Output;
