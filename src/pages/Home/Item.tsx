import { DownloadOutlined, FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton, ImageListItem, ImageListItemBar, Slide, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { BASE_URL } from '~/config/config';
import BlurIconButton from './BlurIconButton';

interface ItemProps {
  data: any;
}

const Item = ({ data }: ItemProps) => {
  const containerRef = useRef<HTMLLIElement>(null);

  const [isHover, setIsHover] = useState(false);

  const imageSrc = `${BASE_URL}/v1/image/file/${data?.id}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageSrc);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();

      // Create blob link to download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', data?.name || 'downloaded-file'); // Set the download attribute with a filename

      // Append to html link element page, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('File download failed. Check console for details.');
    }
  };

  return (
    <ImageListItem
      ref={containerRef}
      key={data.id}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        // srcSet={`${data.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        srcSet={`${BASE_URL}/v1/image/file/${data?.id}`}
        src={`${BASE_URL}/v1/image/file/${data?.id}`}
        alt={data.name}
        loading="lazy"
      />

      <Slide in={isHover} direction="left" container={containerRef.current} timeout={200}>
        <BlurIconButton sx={{ color: 'white', position: 'absolute', top: 8, right: 8 }} icon={FavoriteBorderOutlined} />
      </Slide>

      <Slide in={isHover} direction="up" container={containerRef.current} timeout={200}>
        <Stack direction="row" alignItems="center" width={1} sx={{ position: 'absolute', bottom: 8, px: '8px' }}>
          <Stack direction="row" alignItems="center">
            <Typography color="#fff" sx={{ fontWeight: 500, fontSize: 18 }}>
              {data?.name}
            </Typography>
          </Stack>

          <BlurIconButton
            sx={{ color: 'white', ml: 'auto' }}
            icon={DownloadOutlined}
            onClick={() => handleDownload()}
          />
        </Stack>
      </Slide>
    </ImageListItem>
  );
};

export default Item;
