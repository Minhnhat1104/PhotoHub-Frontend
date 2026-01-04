import {
  Box,
  Button,
  IconButton,
  Stack,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faUpload } from "@fortawesome/free-solid-svg-icons";
import Logo from "~/assets/img/logo";
import React, { useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useConfig from "~/hooks/useConfig";
import Write from "~/pages/Write";
import { defaultLayoutWidth } from "~/config/config";
import { useAuthMutation } from "~/hooks/useAuthMutation";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "~/atoms";
import { Image, Upload } from "@mui/icons-material";
import { COOKIE_KEY, cookieService } from "~/tools/storages";

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();
  const [openWrite, setOpenWrite] = useState<boolean>(false);
  const { mUserLogout } = useAuthMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await mUserLogout.mutateAsync({});
    setUser(null);
    cookieService.remove(COOKIE_KEY.REFRESH_TOKEN);
    navigate("/login");
  };

  return (
    <>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: 80,
          // position: 'fixed',
          top: 0,
          zIndex: 1,
          // boxShadow: `0 3px 6px ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            margin: "auto",
            width: defaultLayoutWidth,
            maxWidth: "100%",
            height: "100%",
            padding: "0 30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              height={"100%"}
            >
              <Logo />
              <Typography
                color="primary"
                fontWeight="600"
                fontSize={"20px"}
                fontStyle={"unset"}
              >
                My Blog 2
              </Typography>
            </Stack>
          </Link>
          {user ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="medium" onClick={() => setOpenWrite(true)}>
                <Upload />
              </IconButton>
              <IconButton size="medium" href="/">
                <Image />
              </IconButton>
              <Switch
                checked={mode === "light"}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => onChangeMode(checked ? "light" : "dark")}
              />
              <Typography pr={1}>{user.username}</Typography>
              <Button size="medium" variant="outlined" onClick={handleLogout}>
                Log Out
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button component={Link} to="/login">
                Login
              </Button>
              <Button variant="outlined" component={Link} to="/register">
                Register
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>

      {openWrite && (
        <Write isOpen={openWrite} onClose={() => setOpenWrite(false)} />
      )}
    </>
  );
}

export default Header;
