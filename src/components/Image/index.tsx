import React, { type ForwardedRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faTrash,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import style from "./Image.module.scss";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

const cx = classNames.bind(style);

interface ImageProps {
  singleData: any;
  user: any;
  handleDelete: (id: string) => void;
}

function Image(props: ImageProps, ref: ForwardedRef<any>) {
  const { singleData, user, handleDelete } = props;

  const theme = useTheme();

  return (
    <Box className={cx("img-fluid")}>
      <img
        loading="lazy"
        className={cx("img")}
        src={singleData.imageUrl}
        alt=""
      />
      <Box className={cx("overlay")}>
        <Box className={cx("img-content")}>
          <Box className={cx("author")}>
            <Typography
              className={cx("data-label")}
              color={theme.palette.common.white}
            >
              {singleData.author}
            </Typography>
          </Box>
        </Box>
        {singleData.author === user?.username || user?.admin ? (
          <>
            <IconButton
              size="medium"
              color="error"
              className={cx("delete-btn")}
              onClick={() => handleDelete(singleData._id)}
            >
              <FontAwesomeIcon icon={faTrash as IconProp} />
            </IconButton>
            <IconButton
              size="medium"
              color="success"
              className={cx("update-btn")}
              href={`/update/${singleData._id}`}
            >
              <FontAwesomeIcon icon={faPenNib as IconProp} />
            </IconButton>
          </>
        ) : (
          ""
        )}
        <IconButton
          size="medium"
          className={cx("download-btn")}
          href={singleData.imageUrl}
          download={singleData.imageUrl}
          color="secondary"
        >
          <FontAwesomeIcon icon={faDownload as IconProp} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default React.forwardRef(Image);
