import { createEventBusContainer } from '@/utils/EventBus'
import { ColorBoardEvent } from './type'

export const {
    Provider: ColorBoardEventProvider,
    useSubscribe: useColorBoardEventSubscribe,
    usePublish: useColorBoardEventPublish,
} = createEventBusContainer<ColorBoardEvent>()
