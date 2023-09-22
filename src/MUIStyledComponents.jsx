import { styled } from "@mui/material/styles";
import { TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

const WhiteTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black", // Border color
    },
    "&:hover fieldset": {
      borderColor: "black", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Border color when focused
    },
  },
  "& .MuiInputLabel-root": {
    color: "black", // Label color
  },
  "& .MuiInputLabel-root": {
    color: "black", // Label color
    "&.Mui-focused": {
      color: "black", // Label color when focused
    },
  },
});

const GradientButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  border: "2px solid white",
  color: "black",
  "&:hover": {
    // background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)",
    // background: "linear-gradient(45deg, #ce4949 30%, #D5CEA3 90%)",
    backgroundColor: "#ce4949",
    border: "2px solid white",
    color: "white",
  },
  "&:focus": {
    // background: "linear-gradient(45deg, #4977ce 30%, #7c50b1 90%)",
    backgroundColor: "#ce4949",
    border: "2px solid white",
    color: "white",
  },
  // "&:not(:hover):not(:focus)": {
  //   background: "transparent",
  //   border: "2px solid black",
  // },
}));

const WhiteDeleteIcon = styled(DeleteIcon)({
  color: "white",
});

const WhiteAddIcon = styled(Add)({
  color: "white",
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: "70%",
  margin: "0 auto",
  borderRadius: "1rem",
  marginTop: "1rem",
  backdropFilter: "blur(5px)",
  backgroundColor: "#e5e5cb58",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
  },
}));

export {
  WhiteTextField,
  GradientButton,
  WhiteDeleteIcon,
  WhiteAddIcon,
  StyledAppBar,
};
