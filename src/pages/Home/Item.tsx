import { DownloadOutlined, Edit, Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { Avatar, IconButton, ImageListItem, ImageListItemBar, Slide, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { BASE_URL } from '~/config/constants';
import BlurIconButton from './BlurIconButton';
import { downloadURI, getImageSrc, getUserAvatarSrc } from '~/tools/image';
import { useImageMutation } from '~/hooks/Image/useImageMutation';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '~/config/queryKeys';
import { useRecoilValue } from 'recoil';
import { userState } from '~/atoms';
import ImageEditModal from '../ImageEditModal';
import dayjs from 'dayjs';
interface ItemProps {
  data: any;
}

const Item = ({ data }: ItemProps) => {
  const containerRef = useRef<HTMLLIElement>(null);
  const queryClient = useQueryClient();
  const user = useRecoilValue(userState);
  const isAuthor = user?.id === data?.creator?.id;

  const [isHover, setIsHover] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mSetFavorite } = useImageMutation();

  const imageSrc = `${BASE_URL}/v1/image/file/${data?.id}`;

  const handleFavorite = async () => {
    await mSetFavorite.mutateAsync(
      {
        imageId: data?.id,
        favorite: !data?.favorite,
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.imageList],
          });
        },
      }
    );
  };

  const currentTimeStamp = data?.edit_at ? dayjs(data?.edit_at)?.unix() : undefined;

  return (
    <>
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
          srcSet={`
            ${getImageSrc(data?.id, { v: currentTimeStamp, width: 400 })} 400w,
            ${getImageSrc(data?.id, { v: currentTimeStamp, width: 800 })} 800w,
            ${getImageSrc(data?.id, { v: currentTimeStamp, width: 1600 })} 1600w
          `}
          sizes="(max-width: 768px) 100vw, 40vw"
          src={getImageSrc(data?.id, { v: currentTimeStamp, width: 800 })}
          alt={data.name}
          loading="lazy"
        />

        <Slide in={isHover} direction="down" container={containerRef.current} timeout={200}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ position: 'absolute', top: 8, right: 8 }}>
            {isAuthor && <BlurIconButton sx={{ color: 'white' }} icon={Edit} onClick={() => setOpenEdit(true)} />}

            <BlurIconButton
              onClick={handleFavorite}
              sx={{ color: 'white' }}
              {...(data?.favorite
                ? {
                    icon: Favorite,
                    iconColor: 'error',
                  }
                : {
                    icon: FavoriteBorderOutlined,
                  })}
            />
          </Stack>
        </Slide>

        <Slide in={isHover} direction="up" container={containerRef.current} timeout={200}>
          <Stack direction="row" alignItems="center" width={1} sx={{ position: 'absolute', bottom: 8, px: '8px' }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                alt="profile user"
                src={getUserAvatarSrc(data?.creator?.id || '')}
                sx={{ width: 32, height: 32 }}
              />

              <Typography color="#fff" sx={{ fontWeight: 500, fontSize: 18 }}>
                {data?.name}
              </Typography>
            </Stack>

            <BlurIconButton
              sx={{ color: 'white', ml: 'auto' }}
              icon={DownloadOutlined}
              onClick={() => downloadURI(imageSrc, data?.name)}
            />
          </Stack>
        </Slide>
      </ImageListItem>

      {openEdit && <ImageEditModal isOpen={openEdit} onClose={() => setOpenEdit(false)} imageId={data?.id} />}
    </>
  );
};

export default Item;
