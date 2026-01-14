import { Delete, DeleteOutline } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, Stack, Typography, useTheme } from '@mui/material';
import { t } from 'i18next';
import React, { type CSSProperties, useEffect, useMemo } from 'react';
import { type FileWithPath, useDropzone } from 'react-dropzone';
import { LangKey } from '~/lang/langKey';
import { ellipsisSx } from '~/tools/style';

interface ImageDropZoneProps {
  name?: string;
  value: FileWithPath[];
  onChange: (nVal: FileWithPath[]) => void;
  disabled?: boolean;
}

function ImageDropZone({ name, value, onChange, disabled = false }: ImageDropZoneProps) {
  const theme = useTheme();
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    disabled,
    // maxFiles: 1,
    accept: { 'image/*': [] },
    onDropAccepted(files, event) {
      onChange(
        files?.map((_item: any) => {
          _item.src = URL.createObjectURL(_item) || '';
          return _item;
        })
      );
    },
  });

  useEffect(() => {
    if (Array.isArray(value) && value?.length > 0) {
      return () => {
        value?.forEach((file: any) => {
          URL.revokeObjectURL(file.preview);
        });
      };
    }
  }, [value]);

  const baseStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.palette.grey['400'],
    borderStyle: 'dashed',
    backgroundColor: 'transparent',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  const focusedStyle = {
    borderColor: '#2196f3',
  };

  const acceptStyle = {
    borderColor: '#00e676',
  };

  const rejectStyle = {
    borderColor: '#ff1744',
  };

  const style: CSSProperties = {
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
  };

  return (
    <section style={{ width: '100%' }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p> {t(LangKey.dragAndDropFileToUpload)}</p>
      </div>

      {value?.length > 0 && (
        <Stack spacing={2} mt={2}>
          {value.map((file: any) => (
            <Stack
              direction="row"
              alignItems="center"
              key={file.path}
              sx={{ pl: 0, display: 'flex', alignItems: 'center', width: 1 }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: theme.palette.common.black,
                  mr: 1,
                  flexShrink: 0,
                }}
              />
              <img alt={file?.name} src={file?.src} style={{ width: 24, height: 24, marginRight: 8 }} />
              <Typography sx={{ ...ellipsisSx }}>
                {file.path} - {file.size} bytes
              </Typography>
              <IconButton
                size="small"
                color="error"
                sx={{ ml: 'auto' }}
                onClick={() => {
                  onChange(value?.filter((_item) => _item?.path !== file?.path));
                }}
              >
                <DeleteOutline />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </section>
  );
}

export default ImageDropZone;
