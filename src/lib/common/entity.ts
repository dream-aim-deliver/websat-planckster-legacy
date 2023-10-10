export enum DeviceType {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
  TABLET = 'tablet',
}

interface Typography {}
interface BasePalette {}
interface Spacing {}
interface BaseBreakpoint {}
interface ZIndex {}
interface Transitions {}
interface Component {}
interface BaseTheme {
  typography: Typography
  palette: BasePalette
  spacing: Spacing
  breakpoints: BaseBreakpoint
  zIndex: ZIndex
  transitions: Transitions
  components: Component
}

interface AccentColorScheme {
  primaryKey: string
  secondaryKey: string
  tertiaryKey: string
}

interface NeutralColorScheme {
  neutralVariantKey: string
  neutralKey: string
}

interface BaseColorScheme {
  accent: AccentColorScheme
  neutral: NeutralColorScheme
}
