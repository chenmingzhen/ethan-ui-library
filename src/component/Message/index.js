import { destroy, getComponent, closeWithAnimation } from "./messager";

// 构造函数
const create = (type) => (content, duration = 3, options = {}) => {
  const {
    onClose,
    position = "top",
    title,
    className = "",
    top = "auto",
  } = options;

  const find = [
    "top",
    "middle",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ].indexOf(position);

  if (find < 0) {
    console.warn(
      "Ethan message component need a right position ! please select one from top,middle,top-left,top-right,bottom-left,bottom-right"
    );
  }
  getComponent(position).then((messager) => {
    messager.addMessage({
      content,
      duration,
      type,
      onClose,
      title,
      className,
      top,
      position,
    });
  });
};

// 导入此依赖就会执行  create (type)=>这个函数  返回闭包
export default {
  show: create("default"),
  success: create("success"),
  info: create("info"),
  warn: create("warning"),
  warning: create("warning"),
  danger: create("danger"),
  error: create("danger"),
  close: (position) => {
    if (position) destroy(position);
    else {
      [
        "top",
        "middle",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ].forEach((c) => {
        destroy(c);
      });
    }
  },
  closeAll: (position) => {
    closeWithAnimation(position);
  },
};
