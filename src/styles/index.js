import genaration from "../utils/classnames"

//注意 这里的引入顺序会影响后面的样式叠加
import alertLess from "./alert.less"
import messageLess from "./message.less"

export const messageClass = genaration(messageLess, "message")
export const alertClass = genaration(alertLess, "alert")
