# Alert 提示框

# 1.依赖引入

## 外部

- prop-types

## 内部

- import { capitalize } from '../utils/strings' [// capitalize](capitalize) 首字母大写
- import { getProps, defaultProps } from '../utils/proptypes' // getProps 获取 props
- import { alertClass } from '../styles'
- import icons from '../icons'

# 2.实现思路

---

state 中的 dismiss 有三个值 0:正常显示 1:进行关闭动画中 2:完成关闭 准备销毁 dom

当点击关闭按钮时，修改 dismiss 的值 触发 componentDidUpdate 进行 handleclose 操作 在 handleclose 中 修改 dismiss 值为 1 触发动画效果 一定时间后将 dissmiss 设置为 2

---

# 3.API

---

| 属性      | 类型                                  | 默认值 | 说明                                                                                |
| --------- | ------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| chilren   | ReactNode                             |        | 内容                                                                                |
| className | string                                |        |                                                                                     |
| icon      | ReactNode\|boolean                    |        | 为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement。 |
| iconSize  | number                                | 14     | icon 的尺寸                                                                         |
| onClose   | ()=>void\|boolean                     |        | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可       |
| style     | object                                |        | 最外层扩展样式                                                                      |
| type      | success\|info\|warning\|danger\|error |        | Alert                                                                               |

# 4.Code

---

```jsx
import React from "react";
import PropTypes from "prop-types";
import { PureComponent } from "../component";
import { capitalize } from "../utils/strings";
import { getProps, defaultProps } from "../utils/proptypes";
import { alertClass } from "../styles";
import icons from "../icons";

class Alert extends PureComponent {
  constructor(props) {
    super(props);

    // 0:正常显示  1:进行关闭动画中 2:关闭完成 注销dom
    this.state = {
      dismiss: 0,
    };

    this.bindRef = this.bindRef.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderClose = this.renderClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    // 有两个dismiss 一个是state 一个是props 这个是提供给外部的 如message
    if (this.props.dismiss !== prevProps.dismiss && this.props.dismiss) {
      this.handleClose();
    }
  }

  bindRef(el) {
    this.element = el;
  }

  // 设置dismiss为2 触发render 移除dom 执行用户的关闭函数
  dismiss() {
    const { onClose } = this.props;
    this.setState({ dismiss: 2 });
    if (typeof onClose === "function") {
      onClose();
    }
  }

  handleClose() {
    // 如果处于正在关闭 不操作  eg:点击关闭按钮后 进行动画期间 用户点击无反应
    if (this.state.dismiss > 0) return;
    const { duration, outAnimation, onClose } = this.props;

    // 如果props设置animation true  将duration element的部分属性返回给调用者
    // 让调用者自行动画操作
    // outer animation
    if (outAnimation) {
      if (typeof onClose === "function") {
        onClose(duration, this.element.offsetHeight);
      }
      return;
    }

    // 改变dismiss值 执行动画
    if (duration > 0) {
      this.setState({ dismiss: 1 }, () => {
        setTimeout(this.dismiss, duration);
      });
    } else {
      this.dismiss();
    }
  }

  // 渲染svg icon
  renderIcon() {
    let { icon } = this.props;
    const { type, iconSize } = this.props;
    if (typeof icon === "boolean" && icon) {
      icon = icons[capitalize(type)];
    }

    if (!icon) return null;
    const style = {
      width: iconSize,
      height: iconSize,
      marginRight: iconSize / 2,
    };

    return (
      <div className={alertClass("icon")} style={style}>
        {icon}
      </div>
    );
  }

  // 渲染关闭按钮
  renderClose() {
    const { closeItem } = this.props;

    // 如果调用手动传入关闭的dom 对dom进行克隆 并赋值onClick事件
    if (React.isValidElement(closeItem))
      return React.cloneElement(closeItem, { onClick: this.handleClose });
    return (
      <a className={alertClass("close")} onClick={this.handleClose}>
        {closeItem || icons.Close}
      </a>
    );
  }

  render() {
    const { dismiss } = this.state;
    // 由于没有setTimeout等副作用函数 直接返回null当作销毁dom  不会触发componentWillUnmount
    if (dismiss === 2) return null;

    const { children, className, type, onClose, outAnimation } = this.props;
    const icon = this.renderIcon();

    const { style } = this.props;
    // 根据dismissed属性进行动画操作
    let wrapClassName = alertClass(
      "_",
      type,
      /* ↓ 动画操作 */
      !outAnimation && dismiss === 1 && "dismissed",
      onClose && "with-close",
      icon && "with-icon"
    );
    if (className) wrapClassName += ` ${className}`;

    return (
      <div ref={this.bindRef} className={wrapClassName} style={style}>
        {onClose && this.renderClose()}
        {icon}
        <div className={alertClass("content")}>{children}</div>
      </div>
    );
  }
}

Alert.propTypes = {
  ...getProps(PropTypes, "type"),
  children: PropTypes.any,
  dismiss: PropTypes.bool,
  duration: PropTypes.number,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  iconSize: PropTypes.number,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Alert.defaultProps = {
  ...defaultProps,
  duration: 200,
  iconSize: 16,
  type: "warning",
};

Alert.displayName = "ShineoutAlert";

export default Alert;
```

## 核心样式

```jsx
/*动画*/
  transform-origin: 0 0;
  transition: transform 0.216s, opacity 0.216s ease-out;

/*动画*/
  &-dismissed {
    opacity: 0;
    transform: scaleY(0);
  }
```
