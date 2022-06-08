/** Select Warning */

export const SELECT_RENDER_ITEM = '__SELECT_RENDER_ITEM__'

const SELECT_RENDER_ITEM_MESSAGE = '[Ethan UI:Select]:renderItem must be a string of a function that return ReactNode'

export const SELECT_RENDER_RESULT = '__SELECT_RENDER_RESULT__'

const SELECT_RENDER_RESULT_MESSAGE =
    '[Ethan UI:Select]:renderResult must be a string of a function that return ReactNode'

export const warningMessageMap = {
    [SELECT_RENDER_ITEM]: SELECT_RENDER_ITEM_MESSAGE,
    [SELECT_RENDER_RESULT]: SELECT_RENDER_RESULT_MESSAGE,
}
