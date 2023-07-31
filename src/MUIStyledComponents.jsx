import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";

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
    background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)",
    border: "2px solid white",
  },
  "&:focus": {
    background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)",
    border: "2px solid white",
  },
  "&:not(:hover):not(:focus)": {
    background: "transparent",
    border: "2px solid white",
  },
}));

const WhiteDeleteIcon = styled(DeleteIcon)({
  color: "white",
});

const WhiteAddIcon = styled(Add)({
  color: "white",
});
export { WhiteTextField, GradientButton, WhiteDeleteIcon, WhiteAddIcon };
