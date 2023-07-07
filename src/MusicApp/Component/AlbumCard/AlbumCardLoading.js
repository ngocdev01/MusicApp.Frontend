import { Box, Skeleton, Typography } from "@mui/material";
import { AddOutlined, PlayArrowRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export const cardStyle = (theme) => {
  return {
    background: theme.palette.background.card,
    color: theme.palette.primary.light,
    position: "relative",
    borderRadius: 1,
    width: "100%",
    padding: 2,
    overflow: "hidden",
    aspectRatio: "9/12",
  };
};

export const imageStyle = (theme) => {
  return {
    maxWidth: "100%",
    aspectRatio: "1/1",
    background: theme.palette.background.active,
    borderRadius: 1,
    display: "flex",
    "& img": {
      width: "100%",
      height: "100%",
      padding: 0,
      borderRadius: 1,
      webkitTransition: "all 2s ease",
      mozTransition: "all 2s ease",
      msTransition: "all 2s ease",
      OTransition: "all 2s ease",
    },
  };
};

function AlbumCardLoading() {
  const theme = useTheme();

  return (
    <Box sx={cardStyle(theme)}>
      <Box component="div" sx={imageStyle(theme)}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          sx={{
            width: "100%",
            height: "100%",
            background: theme.palette.background.active,
          }}
        />
      </Box>
      <Box sx={{ width: "100%", paddingY: 2 }}>
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ background: theme.palette.background.active }}
        />
      </Box>
    </Box>
  );
}

export default AlbumCardLoading;
