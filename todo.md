# 记录一些想去实现的需求以及现存的 bug

-   [x] 多选创建模式，输入值后，仍需让 Input 拿到焦点

-   [x] 输入模式的 result 怎么拿到完整的 data,（不能使用 Format）

-   [x] loading 模式与滚动到底部的回调

-   [x] 滚动时，是如何判断什么时候释放外层滚动[捕获阶段事件 1](https://stackoverflow.com/questions/1009753/pass-mouse-events-through-absolutely-positioned-element) [捕获阶段事件 1](https://www.cnblogs.com/songdongdong/p/9115668.html)

-   [x] 有默认值，但是打开下拉时，不是滚动到默认值所属的位置

-   [x] TransformY 动画有残影，完善贝茨曲线

-   [x] Select 新增 CustomRender，可以自定义头部和底部的内容

-   [x] 键盘滚动到下面，将内容清除，出现空白 bug(hoverMove 滚动比例计算不正确)，fix:封装 computeScroll 方法计算滚动比例，废弃之前的计算方式

*   [x] Select 当输入内容时，Hover 第一个,

-   [x] 多选 Backspace 键删除选项（输入为 null）处理删除后 Input 聚焦问题，如果意图是删除 Input 的内容，不是 Tag，需要一个锁去延迟从删除 Input 到 Tag 的过程

-   [x] SelectOptionList 和 LazyList 的滚动逻辑合并在一起

-   [x] LazyList 添加一个 defaultIndex 的属性，用于非受控的情况下，滚动到默认的位置

-   [x] 滚动到 defaultIndex 出现空白 bug，原因在于现在滚动到 defaultIndex 是在固定在第一行，比如，defaultIndex 是最后一个，也放置到视图第一个位置是错误的

-   [x] 将 Select 的默认高度改成 256，hoverMove 出现 hoverIndex 不在视图内的情况

-   [x] BoxOption 多次重复渲染 bug

-   [x] 进一步封装 LazyList 的受控情况，可以在使用时只受控 currentIndex，不暴露 scrollToView

-   [x] LazyList 移除 itemInView

-   [x] absolute 模式下点击 custom 后再点击 document 无法关闭 Select

-   [ ] 打包 dist 后，生成 main.js 文件，编写一个 WebpackPlugin 或使用一个插件清除这个文件

-   [x] CheckGroup 受控处理，检验表单组件受控情况

-   [x] 移除 Scroll 的 stableProps,高度增加时，重新计算滚动的位置，之前的 Select didupdate 有处理

-   [x] 修改所有 Select 模式的 loading，懒加载数据使用另外的逻辑处理，到时候写一个 DEMO

-   [x] Cascader 点击清除不能失去焦点 bug

-   [x] Select BoxList 支持分组

-   [x] Select OptionList 的 handleScroll 计算 scrollTopRatio 和 Scroll/Scroll 的 wheelOrTouchDispatchScroll 计算不一致，原因在于 wheelOrTouchDispatchScroll 的高度是使用 scrollHeight 而不是 contentHeight,到时统一使用 contentHeight 计算

-   [ ] Tree 改用 AnimationList 动画，并添加 Fade 的类型

-   [x] cascader 的 index 编写，document 的 mouseDown 没有在捕获执行,可以验证一下

-   [ ] 将 SelectOptionList 的样式过一遍

-   [ ] 完成 Select 后实现 innerTitle

-   [ ] 拆分构建过程到新的工具包

-   [x] Inputable 拆分 Form 的逻辑

-   [x] Form 支持简单的 defaultValue 和复杂的 defaultValue

-   [x] Form 校验错误与显示错误

-   [x] 补全 Form，FormItem，DatumForm 的泛型

-   [ ] validateTrigger 实现

-   [x] FieldSet 处理数组或对象

-   [x] FieldSet rule 和触发校验

-   [x] FormItem 和 FieldSet 增加 flow 属性

-   [x] Form 顶层实现和 submit

-   [x] Form hooks 实现

-   [x] Form 滚动到错误中

-   [x] Form 移除值时添加一个 props 是否移除 name 的值
