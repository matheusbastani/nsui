import React from 'react'
import { Button, ButtonProps } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    prefix: { control: { type: 'text' } },
    suffix: { control: { type: 'text' } },
    children: { control: { type: 'text' } }
  }
}

export const Default = (args: ButtonProps) => (
  <Button
    {...args}
    classNames={
      args.classNames ?? {
        root: 'bg-gray-300 rounded-md border-1 border-gray-400/50 text-gray-700 font-medium hover:bg-gray-400 active:scale-97'
      }
    }
  >
    {args.children ?? 'Button'}
  </Button>
)
