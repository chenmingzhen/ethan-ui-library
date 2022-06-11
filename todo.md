# 记录一些想去实现的需求以及现存的 bug

-   [x] 多选创建模式，输入值后，仍需让 Input 拿到焦点

-   [x] 输入模式的 result 怎么拿到完整的 data,（不能使用 Format）

-   [x] loading 模式与滚动到底部的回调

-   [x] 滚动时，是如何判断什么时候释放外层滚动[捕获阶段事件 1](https://stackoverflow.com/questions/1009753/pass-mouse-events-through-absolutely-positioned-element) [捕获阶段事件 1](https://www.cnblogs.com/songdongdong/p/9115668.html)

-   [x] 有默认值，但是打开下拉时，不是滚动到默认值所属的位置

-   [x] TransformY 动画有残影，完善贝茨曲线

-   [x] Select 新增 CustomRender，可以自定义头部和底部的内容

*   [] 多选 Backspace 键删除选项（输入为 null）

*   [ ] Tree 改用 AnimationList 动画，并添加 Fade 的类型

*   [ ] cascader 的 index 编写，document 的 mouseDown 没有在捕获执行,可以验证一下

*   [ ] 将 SelectOptionList 的样式过一遍

*   [ ] 完成 Select 后实现 innerTitle
