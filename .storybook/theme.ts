import { create } from '@storybook/theming/create';

/** Storybook chrome in Timequake dark: black canvas, hairline borders, mono labels. */
export default create({
  base: 'dark',
  brandTitle: 'Timequake',
  brandUrl: 'https://karavaldon.com',
  colorPrimary: '#D4FF3D',   // volt
  colorSecondary: '#862662', // mulberry/600, selected sidebar item (white text on it passes AA)
  appBg: '#121212',          // sidebar/nav: bg/canvas (dark, ink/1000)
  appContentBg: '#202020',   // main body + docs pages: bg/raised (dark, ink/900)
  appPreviewBg: '#202020',   // bg/raised (dark, ink/900)
  appBorderColor: '#2A2A2A',
  appBorderRadius: 0,
  barBg: '#121212',
  barTextColor: '#B3B3B3',
  barSelectedColor: '#D4FF3D',
  barHoverColor: '#E4FF7A',
  textColor: '#F3F2EE',
  textMutedColor: '#8A8A8A',
  textInverseColor: '#121212',
  inputBg: '#202020',
  inputBorder: '#3D3D3D',
  inputTextColor: '#F3F2EE',
  inputBorderRadius: 0,
  buttonBg: '#202020',
  buttonBorder: '#3D3D3D',
  booleanBg: '#202020',
  booleanSelectedBg: '#3D3D3D',
  fontBase: '"Instrument Sans", system-ui, sans-serif',
  fontCode: '"Chivo Mono", ui-monospace, monospace',
});
