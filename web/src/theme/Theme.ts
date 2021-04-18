import {createMuiTheme} from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
    typography: {
        fontFamily: [
            "'Montserrat', sans-serif"
        ].join(','),
        allVariants: {
            color: '#04243D',
        },
    },
    palette: {
        primary: {
            main: '#5575CF',
            dark: '#04243D',
        }
    },
    overrides: {
        // Style sheet name ⚛️
    },
});