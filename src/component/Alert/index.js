import React from "react";
import PropTypes from "prop-types";
import { PureComponent } from "@/utils/component";
import { alertClass } from "@/styles";
import { capitalize } from "@/utils/strings";
import icons from "../icons";
import { getProps, defaultProps } from "@/utils/proptypes";

class Alert extends PureComponent {
  constructor(props) {
    super(props);

    /* 0:normal 1:running closed 2:running closed over */
    this.state = {
      dismiss: 0,
    };

    this.bindRef = this.bindRef.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.renderClose = this.renderClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dismiss !== prevProps.dismiss && this.props.dismiss) {
      this.handleClose();
    }
  }

  bindRef(el) {
    this.element = el;
  }

  dismiss() {
    const { onClose } = this.props;
    this.setState({ dismiss: 2 });
    if (typeof onClose === "function") {
      onClose();
    }
  }

  handleClose() {
    if (this.state.dismiss > 0) return;
    const { duration, outAnimation, onClose } = this.props;

    // outer animation
    // 参数传回去 本组件不处理动画 由上容器设置动画效果
    if (outAnimation) {
      if (typeof onClose === "function") {
        onClose(duration, this.element.offsetHeight);
      }
      return;
    }

    if (duration > 0) {
      this.setState({ dismiss: 1 }, () => {
        setTimeout(this.dismiss, duration);
      });
    } else {
      this.dismiss();
    }
  }

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

  /* React.cloneElement
    https://www.jianshu.com/p/9a42566e4b67
  */
  renderClose() {
    const { closeItem } = this.props;
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
    /* distrory by this */
    /* beacuse we have not effets like setTimerout.we can destory by returning null */
    if (dismiss === 2) return null;

    const { children, className, type, onClose, outAnimation } = this.props;
    const icon = this.renderIcon();

    const { style } = this.props;
    let wrapClassName = alertClass(
      "_",
      type,
      /* shrink animation control by this (dismissed) */
      !outAnimation && dismiss === 1 && "dismissed",
      onClose && "with-close",
      icon && "with-icon"
    );

    //由样式加载顺序决定 class的覆盖
    if (className) wrapClassName = `${wrapClassName} ${className}`;

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

Alert.displayName = "EthanAlert";

export default Alert;
