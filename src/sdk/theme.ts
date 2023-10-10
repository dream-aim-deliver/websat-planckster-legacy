import { createTheme } from "@mui/material";

export enum Mode {
    LIGHT = "light",
    DARK = "dark",
}

const theme = createTheme({
    palette: {
        primary: {
        main: "#f44336",
        },
    },
});