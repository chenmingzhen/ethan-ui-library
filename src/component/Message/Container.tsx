import React from 'react'
import useMessage from './hooks/useMessage'

interface ContainerProps {
  onDestroy(type): void
}

const Container: React.FC<ContainerProps> = ({ onDestroy }) => {
  const { messages, addMessage, removeAllMessage, closeMessageForAnimation } = useMessage()
}

export default React.memo(Container)
