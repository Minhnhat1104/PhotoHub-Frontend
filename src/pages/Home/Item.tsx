import { DownloadOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import { BASE_URL } from "~/config/config";

interface ItemProps {
  data: any;
}

const Item = ({ data }: ItemProps) => {
  return (
    <ImageListItem key={data.id}>
      <img
        // srcSet={`${data.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        srcSet={`${BASE_URL}/v1/image/file/${data?.id}`}
        src={`${BASE_URL}/v1/image/file/${data?.id}`}
        alt={data.name}
        loading="lazy"
      />

      <ImageListItemBar
        position="top"
        actionIcon={
          <IconButton sx={{ color: "white" }} aria-label={`star ${data?.name}`}>
            <FavoriteBorderOutlined />
          </IconButton>
        }
        actionPosition="right"
      />

      <ImageListItemBar
        title={data?.name}
        subtitle={data?.direction}
        position="bottom"
        actionIcon={
          <IconButton sx={{ color: "white" }} aria-label={`star ${data?.name}`}>
            <DownloadOutlined />
          </IconButton>
        }
        actionPosition="right"
      />
    </ImageListItem>
  );
};

export default Item;
