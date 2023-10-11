import { createTheme } from '@mui/material'

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}
// TODO: this can go in CSS variables in global styles.

const palette = {
  mode: Mode.LIGHT,
  primary: {
    main: '#f44336',
  },
  secondary: {
    main: '#3f51b5',
  },
  tertiary: {
    main: '#fff',
  },
  neutral: {
    main: '#000',
  },
  neutralVariant: {
    main: '#fff',
  },
}

const darkPalette = {
  mode: Mode.DARK,
  primary: {
    main: '#f44336',
  },
  secondary: {
    main: '#3f51b5',
  },
  tertiary: {
    main: '#fff',
  },
  neutral: {
    main: '#000',
  },
  neutralVariant: {
    main: '#fff',
  },
}

export const generateTheme = (mode: Mode) => {
  return createTheme({
    palette: mode === Mode.DARK ? darkPalette : palette,
  })
}

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#f44336',
//     },
//   },
// })
