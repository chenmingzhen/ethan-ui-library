import React from "react";
import ReactDOM from "react-dom";
import { messageClass } from "@/styles";
import Container from "./Container";

// 存放同一position类型的div容器
const elements = {};
// 存放同一position类型的组件容器
const components = {};

/* 
  type 为 position
  相同的position会放到同一个容器中
*/
function getElement(type) {
  const div = document.createElement("div");
  div.className = messageClass("_", type);

  document.body.appendChild(div);
  elements[type] = div;
  return div;
}

export function destroy(type) {
  //卸载组件 装组件的容器
  if (elements[type]) {
    ReactDOM.unmountComponentAtNode(elements[type]);
    document.body.removeChild(elements[type]);
    delete elements[type];
  }
  if (components[type]) {
    delete components[type];
  }
}

export function closeWithAnimation(type) {
  for (type in components) {
    if (components[type]) components[type].removeAllMessage();
  }
}

export function getComponent(type) {
  return new Promise((resolve) => {
    const component = components[type];
    // 判断有无这个type(position)的容器  每个type对应一个所有组件容器
    if (component) {
      resolve(component);
    } else {
      // 如果该position为第一次创建 则resolve Container的实例回去
      ReactDOM.render(
        <Container
          /* resolve这个实例回去 并记录在组件容器中 */
          ref={(comp) => {
            components[type] = comp;
            resolve(comp);
          }}
          onDestroy={destroy.bind(null, type)}
        />,
        getElement(type)
      );
    }
  });
}
