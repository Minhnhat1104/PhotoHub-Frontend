import { Avatar, Box, Button, Stack, useTheme } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUserMutation } from '~/hooks/useUserMutation';
import userImagePlaceholder from '~/assets/img/UserPlaceholder.png';
import { useRecoilState } from 'recoil';
import { userState } from '~/atoms';
import { getUserAvatarSrc } from '~/tools/image';
import { LangKey } from '~/lang/langKey';
import { t } from 'i18next';
import BaseAvatar from '~/components/BaseAvatar';
import AvatarCrop from './AvatarCrop';
import { Edit } from '@mui/icons-material';
import ImageButton from '~/components/ImageButton';

function AvatarWrite() {
  const theme = useTheme();
  const [user, setUser] = useRecoilState(userState);
  const { mSetAvatar, mDeleteAvatar } = useUserMutation();

  const [openAvatarWrite, setOpenAvatarWrite] = useState<{ isOpen: boolean; file: File | null }>({
    isOpen: false,
    file: null,
  });

  const handleSave = ({ file, editFile }: { file: File; editFile: File | null }) => {
    const formData = new FormData();

    formData.append('photo', editFile || file);
    mSetAvatar.mutateAsync(formData);
  };

  const handleDelete = async () => {
    const res = await mDeleteAvatar.mutateAsync({});
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <img
          src={getUserAvatarSrc(user?.id || '')}
          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 999 }}
        />

        <ImageButton
          label={t(LangKey.changeAvatar)}
          loading={mSetAvatar.isPending}
          onDrop={(file) => setOpenAvatarWrite({ isOpen: true, file })}
        />

        <Button
          variant="contained"
          onClick={handleDelete}
          loading={mSetAvatar.isPending}
          size="small"
          color="secondary"
        >
          Delete
        </Button>
      </Stack>

      {openAvatarWrite?.isOpen && openAvatarWrite?.file && (
        <AvatarCrop
          isOpen={openAvatarWrite?.isOpen}
          file={openAvatarWrite?.file}
          onClose={() => setOpenAvatarWrite({ isOpen: false, file: null })}
          onSave={handleSave}
        />
      )}
    </>
  );
}

export default AvatarWrite;
