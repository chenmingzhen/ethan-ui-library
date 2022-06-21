/** Select Warning */
export const SELECT_RENDER_ITEM = '__SELECT_RENDER_ITEM__'
export const SELECT_RENDER_RESULT = '__SELECT_RENDER_RESULT__'

const SELECT_RENDER_RESULT_MESSAGE =
    '[Ethan UI:Select]:renderResult must be a string of a function that return ReactNode'
const SELECT_RENDER_ITEM_MESSAGE = '[Ethan UI:Select]:renderItem must be a string of a function that return ReactNode'

/** Datum List */
export const DATUM_LIST_INVALID_VALUES = '__DATUM_LIST_INVALID_VALUES__'

const DATUM_LIST_INVALID_VALUES_MESSAGE =
    '[Ethan UI:Datum.List]:the defaultValue or value props is not a valid value.MayBe you should pass an array'

export const warningMessageMap = {
    /** Select */
    [SELECT_RENDER_ITEM]: SELECT_RENDER_ITEM_MESSAGE,
    [SELECT_RENDER_RESULT]: SELECT_RENDER_RESULT_MESSAGE,
    /** Datum List */
    [DATUM_LIST_INVALID_VALUES]: DATUM_LIST_INVALID_VALUES_MESSAGE,
}
