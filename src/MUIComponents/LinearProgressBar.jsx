import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // margin: "2rem 3rem 2rem 3rem",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: "#fff",
            "& .MuiLinearProgress-barColorPrimary": {
              backgroundColor: "#7c50b1", // Set the color of the progress indicator
            },
          }}
        />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ currentPage }) {
  const [progress, setProgress] = React.useState(1);
  console.log(currentPage);
  React.useEffect(() => {
    setProgress(Math.round((currentPage / 8) * 100));
    console.log((currentPage / 8) * 100);
  }, [currentPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
