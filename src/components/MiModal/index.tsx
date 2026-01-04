import React, { useState } from "react";

import {
  CloseFullscreen,
  CloseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MaximizeOutlined,
  Minimize,
  MinimizeOutlined,
  X,
} from "@mui/icons-material";
import {
  type Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ellipsisSx } from "~/tools/style";

interface MiModalProps {
  title: string | React.ReactElement;
  isOpen: boolean;
  size: Breakpoint | false;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: (value: any) => void;
  onScroll?: (e: any) => void;
  disablePortal?: boolean;
  isCloseByBackdrop?: boolean; // accept close modal by click away on backdrop or not, default is false
  allowFullScreen?: boolean;
}

const MiModal = (props: MiModalProps) => {
  const theme = useTheme();

  const {
    title = "New Item",
    isOpen,
    size,
    children,
    footer,
    onClose,
    onScroll,
    isCloseByBackdrop = false,
    disablePortal = false,
    allowFullScreen = false,
  } = props;

  const isMobile = false; // temp

  //state
  const [miState, setMiState] = useState({
    isShrink: false,
    isMinimize: false,
    isFullScreen: false,
  });

  // default don't close dialog when click backdorp
  const handleOnClose = (e: any, reason: "escapeKeyDown" | "backdropClick") => {
    if (reason === "backdropClick" && !isCloseByBackdrop) {
      return;
    }
    onClose && onClose(e);
  };

  return (
    <Dialog
      disablePortal={disablePortal}
      maxWidth={size}
      fullWidth
      fullScreen={miState.isFullScreen || isMobile}
      keepMounted
      onClose={handleOnClose}
      open={isOpen}
      sx={
        miState.isMinimize
          ? {
              width: 500,
              top: "auto",
              left: "auto",
              bottom: 0,
              transform: "none",
              pointerEvents: "all",
            }
          : {
              "& .MuiDialog-paper": {
                p: 0,
                ...(isMobile
                  ? {
                      mx: 0,
                      width: "100%",
                      maxHeight: "100%",
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {}),
              },
              "& .MuiDialog-container": {
                justifyContent: "center",
              },
              top: 0,
              ".MuiBackdrop-root": { bgcolor: "rgba(15,21,32,.5)" },
            }
      }
      hideBackdrop={miState.isMinimize}
    >
      <DialogTitle
        sx={{
          p: 1,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ pl: 1, pr: 0.5 }}
        >
          <Stack direction="row" alignItems="center" minWidth={0}>
            {typeof title === "string" ? (
              <Typography
                variant="h1"
                sx={{
                  ...ellipsisSx,
                  fontSize: 16,
                  fontWeight: 600,
                  color: "inherit",
                }}
              >
                {title}
              </Typography>
            ) : (
              title
            )}
          </Stack>

          {/* right */}
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {allowFullScreen && !isMobile && (
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  setMiState({
                    ...miState,
                    isFullScreen: !miState.isFullScreen,
                  });
                }}
              >
                {miState.isFullScreen ? (
                  <FullscreenExitOutlined fontSize="small" />
                ) : (
                  <FullscreenOutlined fontSize="small" />
                )}
              </IconButton>
            )}
            <IconButton color="secondary" size="small" onClick={onClose}>
              <CloseOutlined fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </DialogTitle>
      {!miState.isMinimize && (
        <>
          <Divider />
          <DialogContent
            onScroll={onScroll}
            sx={{ p: 0, bgcolor: theme.palette.background.paper }}
            className="dialog-content-print scroll-box"
            id="write-grapes"
          >
            {children}
          </DialogContent>
          {footer && (
            <>
              <Divider />
              <DialogActions
                sx={{ p: 1, bgcolor: theme.palette.background.paper }}
              >
                {footer}
              </DialogActions>
            </>
          )}
        </>
      )}
    </Dialog>
  );
};

export default MiModal;
