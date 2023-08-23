import { atom } from "recoil";

export const userDetailsAtom = atom({
  key: "user-details",
  default: {
    fullname: "",
    email: "",
    phno: "",
    address: "",
    github: "",
    linkedin: "",
  },
});

//export const Details = atom({ key: "Full-Details", default: {} });
