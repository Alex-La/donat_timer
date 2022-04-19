import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import React from "react";

const Preloader: React.FC = () => {
  const theme = useTheme();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Preloader;
