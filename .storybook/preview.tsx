import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/global.css';
import theme from './theme';

// Docs pages render outside the theme decorator: default the iframe to dark so tokens match the dark docs chrome.
if (typeof document !== 'undefined' && !document.documentElement.hasAttribute('data-theme')) document.documentElement.setAttribute('data-theme', 'dark');

const preview: Preview = {
  parameters: {
    layout: 'padded',
    docs: { theme },
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: { disable: true }, // theme decorator paints bg/canvas instead
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    options: { storySort: { order: ['Introduction', 'Foundations', ['Color', 'Typography', 'Spacing & Shape', 'Icons', 'Photography'], 'Core', 'Running', 'Screens'] } },
  },
  decorators: [
    withThemeByDataAttribute({ themes: { light: 'light', dark: 'dark' }, defaultTheme: 'dark', attributeName: 'data-theme' }),
    (Story) => <div style={{ background: 'var(--kv-color-bg-canvas)', color: 'var(--kv-color-text-primary)', padding: 4, minHeight: '100%' }}><Story /></div>,
  ],
  tags: ['autodocs'],
};
export default preview;
