import { Meta, StoryObj } from '@storybook/react'
import { Message } from '@/lib/infrastructure/component-library/conversation/message'
import { MessageType } from '@/lib/core/entities/message'
import { DeviceType } from '@/lib/common/entity'
import { Mode } from '@/lib/common/theme'

const meta = {
  title: 'Conversation/Message',
  component: Message,
} satisfies Meta<typeof Message>

export default meta

type Story = StoryObj<typeof meta>

export const UserMessage: Story = {
  args: {
    status: true,
    id: 1,
    name: 'Luis Bordo',
    type: MessageType.USER,
    content: 'Hello, I am a user message',
    timestamp: new Date(),
    device: DeviceType.DESKTOP,
    mode: Mode.LIGHT,
  },
}
