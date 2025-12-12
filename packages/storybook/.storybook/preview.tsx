import type { Preview } from '@storybook/nextjs-vite'
import { NSUIProvider } from '@nsui/provider'
import './globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <NSUIProvider>
        <Story />
      </NSUIProvider>
    )
  ]
}

export default preview
