# Message

# 入口路径 /src/component

- index.js
    - ./messager.js
        - @/component/style/index.js
            - ./message.less
            - src/util/classname
                - ../config
        - ./Container.js

            
        

---

# 2.实现思路

index.js中导出各种类型的message构造方法 构造方法Create中传入type返回一个函数 函数中会通过从message.js中获取的Container实例执行addMessage方法 给Message容器中添加一条新的message  

message.js中导出getComponent的方法 此方法返回一个Promise resolve 一个Container的实例 

Container.js state中存放着同一类型position的message  通过修改dismiss的值 触发Alert中的componentDidUpdate 然后触发closeMessageForAnimation 执行完动画移除message 执行callback

---

# 3.API

- Message.show(content, [duration], [options])
- Message.info(content, [duration], [options])
- Message.success(content, [duration], [options])
- Message.warn(content, [duration], [options])
- Message.error(content, [duration], [options])
- Message.close() // Close all messages without animation
- Message.closeAll() // Close all messages with animation

## message

| 属性     | 类型      | 默认值 | 说明                                             |
| -------- | --------- | ------ | ------------------------------------------------ |
| content  | ReactNode | 必填   | 消息内容                                         |
| duration | number    | 3      | 消息持续时间，单位秒；如果设置为 0，必须手动关闭 |
| options  | object    | null   | Message的option属性                              |

## Message Options

| 属性     | 类型     | 默认值 | 说明                                                         |
| -------- | -------- | ------ | ------------------------------------------------------------ |
| onClose  | function | null   | 关闭后回调事件                                               |
| position | string   | top    | 消息显示的位置，可选值 ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |
| title    | string   | null   | 标题文字                                                     |



---

# 4.TODO

- [ ]  Loading类型message