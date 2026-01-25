import { Button } from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { LangKey } from '~/lang/langKey';

interface ImageButtonProps {
  onDrop: (file: File) => void;
  loading?: boolean;
  label: string;
}

const ImageButton = ({ onDrop, loading, label }: ImageButtonProps) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles, fileRejections, event) => {
      onDrop(acceptedFiles[0]);
    },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button variant="contained" onClick={open} loading={loading} size="small">
        {label}
      </Button>
    </div>
  );
};

export default ImageButton;
