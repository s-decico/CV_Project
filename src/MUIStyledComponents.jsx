import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";

const WhiteTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white", // Border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "white", // Label color
  },
  "& .MuiInputLabel-root": {
    color: "white", // Label color
    "&.Mui-focused": {
      color: "white", // Label color when focused
    },
  },
});

const GradientButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  border: "2px solid white",
  color: "white",
  "&:hover": {
    background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)", // Gradient on hover
  },
  "&:focus": {
    background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)", // Yellow background on focus
  },
}));

export { WhiteTextField, GradientButton };
