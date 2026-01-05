import { IconButton, SxProps } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { forwardRef, Ref } from 'react';

interface BlurIconButtonProps {
  icon: SvgIconComponent;
  sx?: SxProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function BlurIconButton({ icon: Icon, onClick, sx }: BlurIconButtonProps, ref: Ref<HTMLButtonElement>) {
  return (
    <IconButton
      onClick={onClick}
      ref={ref}
      sx={{
        color: '#fff',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(0,0,0,0)',

        '&:hover': {
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0,0,0,0.35)',
        },
        ...sx,
      }}
    >
      <Icon />
    </IconButton>
  );
}

export default forwardRef(BlurIconButton);
