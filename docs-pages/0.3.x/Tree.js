(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[446],{20902:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return s}});var r=t(67154),a=t.n(r),n=t(24698),d=t.n(n),r=t(69048),o=t(85993),n=t(39174),i=(0,n.default)("# Tree *树形选择*\r\n\r\n## \r\n\r\n#### 本页面中用到的数据如下（数据量比较大，请谨慎点开）\r\n<example name=\"data\" />\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| className | string | 无 | 扩展className |\r\n| onChange | (value: string[]) => void | 无 | 设置 onChange 属性时，显示 选择框。参数为当前选中值，和 mode 属性相关 |\r\n| data | object[] | [] | 数据，子节点为children，如果 children 值为 null 或 长度为 0 时，视为叶子节点 |\r\n| defaultExpanded | string[] | 无 | 默认展开的节点 key（非受控） |\r\n| disabled | (data: any) => boolean \\| boolean | false | 显示选择框时有效，为 true 时，所有节点禁用选择，为函数时，根据函数返回结果确定是否禁用 |\r\n| expanded | string[] | 无 | 展开的节点 key （受控） |\r\n| keygen | ((data: any, parentKey: string) => string) \\| string | 必填 | 生成key的辅助方法<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d) => d.id |\r\n| line | boolean | true | 是否显示连接线 |\r\n| loader | (key: string) => void | 无 | 设置loader属性后，未定义children的节点视为动态加载节点，点击展开触发 loader事件，children 为 null 或者长度为 0 视为叶子节点 |\r\n| mode | 0 \\| 1 \\| 2 \\| 3 \\| 4 | 1 | 选中值模式<br />0: 只返回完全选中的节点，包含父节点<br />1: 返回全部选中的节点和半选中的父节点<br />2: 只返回选中的子节点<br />3: 如果父节点选中，只返回父节点 |\r\n| onExpand | (value: string[]) => void | 无 | 节点展开回调，参数为当前展开节点 key 数组 |\r\n| renderItem | (data: object) => ReactNode | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 |\r\n| defaultValue | string[] | 无 | 默认选中的 key （非受控） | \r\n| value | string[] | 无 | 选中的 key （受控） | \r\n| onDrop | (data: object, key: string, targetKey: string, position: number) => void | 无 | 设置 onDrop 属性时，为可拖动状态<br />data: 拖动后重新排序的完整数据<br />key: 拖动的节点key<br />targetKey: 目标节点 key<br />position: 在目标节点的位置，以 0 开始 | \r\n| defaultExpandAll | boolean | false | 默认展开所有节点 | \r\n| childrenKey | string | 'children' | 指定子数据的属性名 |\r\n| expandIcons | \\[ReactNode, ReactNode] | 无 | 自定义展开/收起按钮 |\r\n| dragImageSelector | (data: object) => string \\| string | 无 | 定义拖拽图片的选择器 |\r\n| dragImageStyle | object | 无 | 拖拽图片的样式 |\r\n| leafClass | (data: object) => string \\| string | 无 | 叶子节点的 class, 函数的参数为该条叶子节点数据 |\r\n| dragHoverExpand | boolean | false | 拖拽时自动展开含有子节点的节点 |\r\n| doubleClickExpand | boolean | false | 双击是否展开节点 |\r\n| onClick | (data: object) => void | 无 | 节点点击事件 |\r\n| iconClass | string | 无 | 展开/收起按钮的类名 |\r\n| nodeClass | string \\| ((data: any) => string) | 无 | 节点的class，如果是函数，参数为该节点数据 |\r\n| dragSibling | boolean  | 无 | 是否只能平级拖拽 |\r\n","# Tree\r\n\r\n##\r\n\r\n#### The data used on this page is as follows (the amount of data is large, please be careful)\r\n<example name=\"data\" />\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| className | string | - | Extend className |\r\n| data | object[] | [] | data. The child node is children. If the children value is null or its length is 0, it is render as a leaf node. |\r\n| defaultExpanded | string[] | - | Default expanded node key. |\r\n| disabled | (data: any) => boolean \\| boolean | false | When it is true, all nodes disable the selection; when it is a function, it determines whether it is disabled according to the return result of the function. |\r\n| expanded | string[] | - | Expanded node key (controlled) |\r\n| keygen | ((data: any, parentKey: string) => string) \\| string | required | Auxiliary method for generating key. <br />When it is a function, use the return value of this function. <br /> When it is a string, use the data value corresponding to this string. For example, 'id' is the same thing as (d) => d.id. |\r\n| line | boolean | true | Whether to display the connection line. |\r\n| loader | (key: string) => void | - | If the loader attribute is a function, the node with no children is regarded as dynamically loaded node. Click expanded button to trigger the loader event. The children property is null or its length is 0 will be regarded as a leaf node. |\r\n| mode | 0 \\| 1 \\| 2 \\| 3 \\| 4 | 1 | mode <br />0: Returns only the fully selected node including the parent node. <br />1: Returns all selected nodes and semi-selected nodes. <br />2: Return only the selected child nodes. <br />3: If the parent node is full selected, only return the parent node. |\r\n| onChange | (value: string[]) => void | - | When the onChange property is set, the selection box is displayed. The parameter is the current selected value, which is related to the mode property. |\r\n| onExpand |  (value: string[]) => void | - | The callback function for expanding the node. The parameter is the key array of the currently expanded nodes. |\r\n| renderItem | (data: object) => ReactNode | required | When it is a string, return d\\[string].<br /> When it is a function, return the result of this function. |\r\n| defaultValue | string[] | - | Default selected key (not controlled) | \r\n| value | string[] | - | Selected key (controlled) |\r\n| onDrop | (data: object, key: string, targetKey: string, position: number) => void | - | It is draggable when setting the onDrop property. <br />data: Full data after dragging.<br />key: the key of dragged node<br />targetKey: the key of target node<br />position: The position of the target node. start at 0. | \r\n| defaultExpandAll | boolean | false | default expand all nodes | \r\n| childrenKey | string | 'children' | the key of the children data name | \r\n| expandIcons | \\[ReactNode, ReactNode] | none | custom expand/collapse button |\r\n| dragImageSelector | (data: object) => string \\| string | - | the selector of drag image |\r\n| dragImageStyle | object | - | the style of drag Image |\r\n| leafClass | (data: object) => string \\| string | - | the class of lead, the params of function is data |\r\n| dragHoverExpand | boolean | false | auto expand the node when drag over |\r\n| doubleClickExpand | boolean | false | expand node while double click |\r\n| onClick | (data: object) => void | none | node click |\r\n| iconClass | string | - | expand/collapse button's class |\r\n| nodeClass | string \\| ((data: any) => string) | - | The class of the node, if it is a function, the parameter is the node data. |\r\n| dragSibling | boolean  | - | whether drag can only be level |"),l=[{name:"01-basex",title:(0,n.default)("基本用法 \n 基础的 Tree 用法","Base \n Basic usage of Tree"),component:t(31810).Z,rawText:t(12175).Z},{name:"02-iconx",title:(0,n.default)("图标 \n 在 renderItem 中根据状态展示不同的图标","Icons \n Display different icon in the renderItem."),component:t(12600).Z,rawText:t(429).Z},{name:"03-clickx",title:(0,n.default)("点击事件 \n 设置 onClick 属性监听节点点击","Click \n Set the onClick property to listen the node click."),component:t(99109).Z,rawText:t(13817).Z},{name:"04-nolinex",title:(0,n.default)("无连接线 \n 设置 line 为 false，隐藏连接线","Line \n Set the line property to false to hid the connecting line."),component:t(17932).Z,rawText:t(79791).Z},{name:"05-expandedx",title:(0,n.default)("控制展开 \n 受控的展开（此示例数据量太大，第一次全部展开会比较慢）","Expanded \n Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)"),component:t(63314).Z,rawText:t(65857).Z},{name:"06-changex",title:(0,n.default)("可选择 \n 选中值取值提供了 4 种模式 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点","onChange \n Selected values provide 4 modes \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected."),component:t(66289).Z,rawText:t(11567).Z},{name:"07-disabledx",title:(0,n.default)("禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点","disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes."),component:t(67722).Z,rawText:t(11972).Z},{name:"08-dragx",title:(0,n.default)("拖动 \n 设置 onDrop 属性可以拖动节点，设置 dragSibling 限制兄弟节点之间拖动","Drag \n Set the onDrop property to drag nodes."),component:t(30834).Z,rawText:t(49919).Z},{name:"08-styledragx",title:(0,n.default)("设置拖动样式 \n 可以通过 dragImageSelector, dragImageStyle, dragHoverExpand定义一些拖动的设置","Set the drag style \n Some drag settings can be defined by dragImageSelector, dragImageStyle, dragHoverExpand"),component:t(87632).Z,rawText:t(37151).Z},{name:"09-lazyloadx",title:(0,n.default)("动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数","Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded."),component:t(96366).Z,rawText:t(10537).Z},{name:"datax",title:(0,n.default)("",""),component:t(23047).Z,rawText:t(35464).Z}],s=(0,r.default)(function(e){return d().createElement(o.ZP,a()({},e,{codes:void 0,source:i,examples:l}))})},12175:function(e,n){"use strict";n.Z="/**\r\n * cn - 基本用法\r\n *    -- 基础的 Tree 用法\r\n * en - Base\r\n *   -- Basic usage of Tree\r\n */\r\nimport React from 'react'\r\nimport { Tree } from 'ethan/index'\r\n\r\nconst data = [\r\n  {\r\n    id: '1',\r\n    text: '1',\r\n    children: [\r\n      {\r\n        id: '1-1',\r\n        text: '1-1',\r\n        children: [{ id: '1-1-1', text: '1-1-1' }, { id: '1-1-2', text: '1-1-2' }],\r\n      },\r\n      { id: '1-2', text: '1-2' },\r\n    ],\r\n  },\r\n  { id: '2', text: '2', children: [{ id: '2-1', text: '2-1' }, { id: '2-2', text: '2-2' }] },\r\n  { id: '3', text: '3', children: [{ id: '3-1', text: '3-1' }] },\r\n  { id: '4', text: '4', children: [{ id: '4-1', text: '4-1' }] },\r\n  { id: '5', text: '5', children: [{ id: '5-1', text: '5-1' }] },\r\n]\r\n\r\nexport default function() {\r\n  return <Tree data={data} keygen=\"id\" defaultExpanded={['2']} renderItem={n => `node ${n.text}`} />\r\n}\r\n"},429:function(e,n){"use strict";n.Z="/**\r\n * cn - 图标\r\n *    -- 在 renderItem 中根据状态展示不同的图标\r\n * en - Icons\r\n *    -- Display different icon in the renderItem.\r\n */\r\nimport React from 'react'\r\nimport { Tree, FontAwesome } from 'ethan/index'\r\nimport data from 'doc/data/tree'\r\n\r\nfunction renderItem(node, isExpanded) {\r\n  let icon\r\n  if (!node.children || node.children.length === 0) {\r\n    icon = <FontAwesome name=\"file-text-o\" />\r\n  } else if (isExpanded) {\r\n    icon = <FontAwesome name=\"folder-open\" style={{ color: '#ffd666' }} />\r\n  } else {\r\n    icon = <FontAwesome name=\"folder\" style={{ color: '#ffd666' }} />\r\n  }\r\n\r\n  return (\r\n    <span>\r\n      {icon} {node.text}\r\n    </span>\r\n  )\r\n}\r\n\r\nexport default function() {\r\n  return <Tree data={data} keygen=\"id\" renderItem={renderItem} doubleClickExpand />\r\n}\r\n"},13817:function(e,n){"use strict";n.Z="/**\r\n * cn - 点击事件\r\n *    -- 设置 onClick 属性监听节点点击\r\n * en - Click\r\n *    -- Set the onClick property to listen the node click.\r\n */\r\nimport React, { Component } from 'react'\r\nimport immer from 'immer'\r\nimport { Tree } from 'ethan/index'\r\nimport tree from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { active: undefined, data: tree }\r\n    this.defaultExpanded = ['1']\r\n  }\r\n\r\n  handleClick = (node, id) => {\r\n    console.log('click', id)\r\n    this.setState({ active: id })\r\n  }\r\n\r\n  handleEdit = event => {\r\n    const newText = event.target.value\r\n    const path = this.state.active.split(',')\r\n    this.setState(\r\n      immer(draft => {\r\n        let { data } = draft\r\n        path.forEach((id, index) => {\r\n          data = data.find(d => d.id === id)\r\n          if (index < path.length - 1) data = data.children\r\n        })\r\n        data.text = newText\r\n        draft.active = undefined\r\n      })\r\n    )\r\n  }\r\n\r\n  handleKeyDown = event => {\r\n    if (event.keyCode === 13) event.target.blur()\r\n  }\r\n\r\n  keyGenerator = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')\r\n\r\n  renderItem = (node, isExpanded, isActive) =>\r\n    isActive ? (\r\n      <input\r\n        // eslint-disable-next-line\r\n        autoFocus\r\n        size=\"small\"\r\n        onBlur={this.handleEdit}\r\n        onKeyDown={this.handleKeyDown}\r\n        defaultValue={node.text}\r\n        type=\"text\"\r\n      />\r\n    ) : (\r\n      `node ${node.text}`\r\n    )\r\n\r\n  render() {\r\n    return (\r\n      <Tree\r\n        active={this.state.active}\r\n        data={this.state.data}\r\n        keygen={this.keyGenerator}\r\n        defaultExpanded={this.defaultExpanded}\r\n        onClick={this.handleClick}\r\n        onExpand={this.handleExpand}\r\n        renderItem={this.renderItem}\r\n      />\r\n    )\r\n  }\r\n}\r\n"},79791:function(e,n){"use strict";n.Z="/**\r\n * cn - 无连接线\r\n *    -- 设置 line 为 false，隐藏连接线\r\n * en - Line\r\n *    -- Set the line property to false to hid the connecting line.\r\n */\r\nimport React from 'react'\r\nimport { Tree } from 'ethan/index'\r\nimport data from 'doc/data/tree'\r\n\r\nexport default function() {\r\n  return <Tree data={data} defaultExpanded={['1', '2']} line={false} keygen=\"id\" renderItem={n => `node ${n.id}`} />\r\n}\r\n"},65857:function(e,n){"use strict";n.Z="/**\r\n * cn - 控制展开\r\n *    -- 受控的展开（此示例数据量太大，第一次全部展开会比较慢）\r\n * en - Expanded\r\n *    -- Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Tree, Button } from 'ethan/index'\r\nimport data, { allIds } from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { expanded: ['1'] }\r\n\r\n    this.collapseAll = this.handleExpand.bind(this, [])\r\n    this.expandAll = this.handleExpand.bind(this, [...allIds])\r\n  }\r\n\r\n  handleExpand = expanded => {\r\n    this.setState({ expanded })\r\n  }\r\n\r\n  renderItem = node => `node ${node.id}`\r\n\r\n  render() {\r\n    return (\r\n      <div>\r\n        <div style={{ marginBottom: 12 }}>\r\n          <Button onClick={this.expandAll}>Expand all</Button>\r\n          <Button onClick={this.collapseAll}>Collapse all</Button>\r\n        </div>\r\n        <Tree\r\n          data={data}\r\n          keygen=\"id\"\r\n          line={false}\r\n          expanded={this.state.expanded}\r\n          onExpand={this.handleExpand}\r\n          renderItem={this.renderItem}\r\n        />\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},11567:function(e,n){"use strict";n.Z="/**\r\n * cn - 可选择\r\n *    -- 选中值取值提供了 4 种模式\r\n *    -- 0: 只返回完全选中的节点，包含父节点\r\n *    -- 1: 返回全部选中的节点和半选中的父节点\r\n *    -- 2: 只返回选中的子节点\r\n *    -- 3: 如果父节点选中，只返回父节点\r\n * en - onChange\r\n *    -- Selected values provide 4 modes\r\n *    -- 0: Return only the fully selected node, including the parent node.\r\n *    -- 1: Return the fully selected nodes and semi-selected parent nodes.\r\n *    -- 2: Return only the selected child node.\r\n *    -- 3: Return only the parent node, if the parent node is selected.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Tree, Radio } from 'ethan/index'\r\nimport data from 'doc/data/tree'\r\n\r\nconst resultStyle = {\r\n  position: 'absolute',\r\n  right: 30,\r\n  top: 100,\r\n  bottom: 40,\r\n  width: 240,\r\n  overflow: 'auto',\r\n  background: '#f2f2f2',\r\n  padding: 10,\r\n  zIndex: 100,\r\n}\r\n\r\nconst modeList = [\r\n  { value: 0, text: 'mode=0 (full)' },\r\n  { value: 1, text: 'mode=1 (half)' },\r\n  { value: 2, text: 'mode=2 (child only)' },\r\n  { value: 3, text: 'mode=3 (shallow)' },\r\n]\r\n\r\nfunction getValue(list, value) {\r\n  const [node] = list\r\n  if (!node) return\r\n  value.push(node.id)\r\n  if (node.children) getValue(node.children, value)\r\n}\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n\r\n    const value = []\r\n    getValue(data, value)\r\n\r\n    this.state = { mode: 1, value }\r\n  }\r\n\r\n  handleChange = value => {\r\n    this.setState({ value })\r\n  }\r\n\r\n  handleModeChange = mode => {\r\n    this.setState({ mode, value: [] })\r\n  }\r\n\r\n  renderItem = node => `node ${node.id}`\r\n\r\n  render() {\r\n    const { mode, value } = this.state\r\n\r\n    return (\r\n      <div>\r\n        <Radio.Group\r\n          keygen=\"value\"\r\n          value={mode}\r\n          format=\"value\"\r\n          onChange={this.handleModeChange}\r\n          data={modeList}\r\n          renderItem=\"text\"\r\n        />\r\n\r\n        <br />\r\n\r\n        <Tree\r\n          data={data}\r\n          defaultExpanded={['0', '2']}\r\n          keygen=\"id\"\r\n          mode={mode}\r\n          onChange={this.handleChange}\r\n          renderItem={this.renderItem}\r\n          value={value}\r\n        />\r\n\r\n        <div style={resultStyle}>\r\n          Current select value:\r\n          <pre style={{ background: '#f2f2f2' }}>{JSON.stringify(value, null, 2)}</pre>\r\n        </div>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},11972:function(e,n){"use strict";n.Z="/**\r\n * cn - 禁用\r\n *    -- disabled 为函数时，根据返回结果禁用节点，同时禁用子节点\r\n *    -- disabled 为 true 时，禁用全部节点\r\n * en - disabled\r\n *    -- When the disabled property is a function, disable the node and its child nodes according to the returned result.\r\n *    -- When the disabled property is true, disable all nodes.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Tree } from 'ethan/index'\r\nimport data from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  handleChange = value => {\r\n    console.log(value)\r\n  }\r\n\r\n  isDisabled = node => node.id === '1-0'\r\n\r\n  renderItem = node => `node ${node.id}`\r\n\r\n  render() {\r\n    return (\r\n      <Tree\r\n        data={data}\r\n        defaultExpanded={['1', '2']}\r\n        disabled={this.isDisabled}\r\n        keygen=\"id\"\r\n        onChange={this.handleChange}\r\n        renderItem={this.renderItem}\r\n      />\r\n    )\r\n  }\r\n}\r\n"},49919:function(e,n){"use strict";n.Z="/**\r\n * cn - 拖动\r\n *    -- 设置 onDrop 属性可以拖动节点，设置 dragSibling 限制兄弟节点之间拖动\r\n * en - Drag\r\n *    -- Set the onDrop property to drag nodes.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Tree } from 'ethan/index'\r\nimport tree from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { data: tree }\r\n    this.defaultExpanded = ['1']\r\n  }\r\n\r\n  handleDrop = (data, key, targetKey, position) => {\r\n    console.log(data, key, targetKey, position)\r\n    this.setState({ data })\r\n  }\r\n\r\n  renderItem = node => (\r\n    <div>\r\n      <span>node </span>\r\n      <span id={`node-id-${node.id}`}>{node.text}</span>\r\n    </div>\r\n  )\r\n\r\n  render() {\r\n    return (\r\n      <Tree\r\n        data={this.state.data}\r\n        keygen=\"id\"\r\n        defaultExpanded={this.defaultExpanded}\r\n        onDrop={this.handleDrop}\r\n        renderItem={this.renderItem}\r\n      />\r\n    )\r\n  }\r\n}\r\n"},37151:function(e,n){"use strict";n.Z="/**\r\n * cn - 设置拖动样式\r\n *    -- 可以通过 dragImageSelector, dragImageStyle, dragHoverExpand定义一些拖动的设置\r\n * en - Set the drag style\r\n *    -- Some drag settings can be defined by dragImageSelector, dragImageStyle, dragHoverExpand\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Tree } from 'ethan/index'\r\nimport tree from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { data: tree }\r\n    this.defaultExpanded = ['1']\r\n  }\r\n\r\n  handleDrop = (data, key, targetKey, position) => {\r\n    console.log(data, key, targetKey, position)\r\n    this.setState({ data })\r\n  }\r\n\r\n  renderItem = node => (\r\n    <div>\r\n      <span>node </span>\r\n      <span id={`node-id-${node.id}`}>{node.text}</span>\r\n    </div>\r\n  )\r\n\r\n  render() {\r\n    return (\r\n      <Tree\r\n        data={this.state.data}\r\n        keygen=\"id\"\r\n        defaultExpanded={this.defaultExpanded}\r\n        onDrop={this.handleDrop}\r\n        dragImageSelector={d => `#node-id-${d.id}`}\r\n        dragImageStyle={{ color: 'red' }}\r\n        renderItem={this.renderItem}\r\n        dragHoverExpand\r\n      />\r\n    )\r\n  }\r\n}\r\n"},10537:function(e,n){"use strict";n.Z="/**\r\n * cn - 动态加载\r\n *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数\r\n * en - Lazy load\r\n *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.\r\n */\r\nimport React, { Component } from 'react'\r\nimport immer from 'immer'\r\nimport { Tree } from 'ethan/index'\r\n\r\nconst initData = ['0', '1', '2', '3', '4'].map(i => ({ id: i }))\r\nconst createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { data: initData, value: [] }\r\n  }\r\n\r\n  loader = key => {\r\n    const path = key.split(',')\r\n\r\n    setTimeout(() => {\r\n      this.setState(\r\n        immer(draft => {\r\n          let { data } = draft\r\n          path.forEach((pid, i) => {\r\n            data = data.find(d => d.id === pid)\r\n            if (i < path.length - 1) data = data.children\r\n          })\r\n          data.children = [...createRange().map(i => ({ id: `${data.id}-${i}` }))]\r\n        })\r\n      )\r\n    }, 500)\r\n  }\r\n\r\n  keyGenerator = (node, parentKey) => `${parentKey},${node.id}`.replace(/^,/, '')\r\n\r\n  handleChange = value => this.setState({ value })\r\n\r\n  renderItem = node => `node ${node.id}`\r\n\r\n  render() {\r\n    return (\r\n      <Tree\r\n        data={this.state.data}\r\n        keygen={this.keyGenerator}\r\n        loader={this.loader}\r\n        renderItem={this.renderItem}\r\n        onChange={this.handleChange}\r\n        value={this.state.value}\r\n      />\r\n    )\r\n  }\r\n}\r\n"},35464:function(e,n){"use strict";n.Z="import React, { Component } from 'react'\r\nimport data, { allIds } from 'doc/data/tree'\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { expand: false }\r\n  }\r\n\r\n  toggle = () => {\r\n    this.setState({ expand: !this.state.expand })\r\n  }\r\n\r\n  render() {\r\n    const { expand } = this.state\r\n    return (\r\n      <div>\r\n        Current node count: {allIds.length}. <a onClick={this.toggle}>{expand ? 'Collapse' : 'Expand'} Code</a>\r\n        <pre style={{ display: expand ? 'block' : 'none' }}>{JSON.stringify(data, null, 2)}</pre>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},31810:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),a=t(79136),d=[{id:"1",text:"1",children:[{id:"1-1",text:"1-1",children:[{id:"1-1-1",text:"1-1-1"},{id:"1-1-2",text:"1-1-2"}]},{id:"1-2",text:"1-2"}]},{id:"2",text:"2",children:[{id:"2-1",text:"2-1"},{id:"2-2",text:"2-2"}]},{id:"3",text:"3",children:[{id:"3-1",text:"3-1"}]},{id:"4",text:"4",children:[{id:"4-1",text:"4-1"}]},{id:"5",text:"5",children:[{id:"5-1",text:"5-1"}]}];n.Z=function(){return r.default.createElement(a.Tree,{data:d,keygen:"id",defaultExpanded:["2"],renderItem:function(e){return"node "+e.text}})}},12600:function(e,n,t){"use strict";var r=t(70655),a=r.__importDefault(t(24698)),d=t(79136),o=r.__importDefault(t(10496));function i(e,n){n=e.children&&0!==e.children.length?n?a.default.createElement(d.FontAwesome,{name:"folder-open",style:{color:"#ffd666"}}):a.default.createElement(d.FontAwesome,{name:"folder",style:{color:"#ffd666"}}):a.default.createElement(d.FontAwesome,{name:"file-text-o"});return a.default.createElement("span",null,n," ",e.text)}n.Z=function(){return a.default.createElement(d.Tree,{data:o.default,keygen:"id",renderItem:i,doubleClickExpand:!0})}},99109:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=a.__importDefault(t(18172)),i=t(79136),l=a.__importDefault(t(10496)),a=(r=d.Component,a.__extends(s,r),s.prototype.render=function(){return d.default.createElement(i.Tree,{active:this.state.active,data:this.state.data,keygen:this.keyGenerator,defaultExpanded:this.defaultExpanded,onClick:this.handleClick,onExpand:this.handleExpand,renderItem:this.renderItem})},s);function s(e){var a=r.call(this,e)||this;return a.handleClick=function(e,n){console.log("click",n),a.setState({active:n})},a.handleEdit=function(e){var n=e.target.value,r=a.state.active.split(",");a.setState(o.default(function(e){var t=e.data;r.forEach(function(n,e){t=t.find(function(e){return e.id===n}),e<r.length-1&&(t=t.children)}),t.text=n,e.active=void 0}))},a.handleKeyDown=function(e){13===e.keyCode&&e.target.blur()},a.keyGenerator=function(e,n){return(n+","+e.id).replace(/^,/,"")},a.renderItem=function(e,n,t){return t?d.default.createElement("input",{autoFocus:!0,size:"small",onBlur:a.handleEdit,onKeyDown:a.handleKeyDown,defaultValue:e.text,type:"text"}):"node "+e.text},a.state={active:void 0,data:l.default},a.defaultExpanded=["1"],a}n.Z=a},17932:function(e,n,t){"use strict";var r=t(70655),a=r.__importDefault(t(24698)),d=t(79136),o=r.__importDefault(t(10496));n.Z=function(){return a.default.createElement(d.Tree,{data:o.default,defaultExpanded:["1","2"],line:!1,keygen:"id",renderItem:function(e){return"node "+e.id}})}},63314:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=t(79136),i=a.__importStar(t(10496)),t=(r=d.Component,a.__extends(l,r),l.prototype.render=function(){return d.default.createElement("div",null,d.default.createElement("div",{style:{marginBottom:12}},d.default.createElement(o.Button,{onClick:this.expandAll},"Expand all"),d.default.createElement(o.Button,{onClick:this.collapseAll},"Collapse all")),d.default.createElement(o.Tree,{data:i.default,keygen:"id",line:!1,expanded:this.state.expanded,onExpand:this.handleExpand,renderItem:this.renderItem}))},l);function l(e){var n=r.call(this,e)||this;return n.handleExpand=function(e){n.setState({expanded:e})},n.renderItem=function(e){return"node "+e.id},n.state={expanded:["1"]},n.collapseAll=n.handleExpand.bind(n,[]),n.expandAll=n.handleExpand.bind(n,a.__spreadArray([],a.__read(i.allIds))),n}n.Z=t},66289:function(e,n,t){"use strict";var r=t(70655),a=r.__importStar(t(24698)),d=t(79136),o=r.__importDefault(t(10496)),i={position:"absolute",right:30,top:100,bottom:40,width:240,overflow:"auto",background:"#f2f2f2",padding:10,zIndex:100},l=[{value:0,text:"mode=0 (full)"},{value:1,text:"mode=1 (half)"},{value:2,text:"mode=2 (child only)"},{value:3,text:"mode=3 (shallow)"}];var s,t=(s=a.Component,r.__extends(c,s),c.prototype.render=function(){var e=this.state,n=e.mode,e=e.value;return a.default.createElement("div",null,a.default.createElement(d.Radio.Group,{keygen:"value",value:n,format:"value",onChange:this.handleModeChange,data:l,renderItem:"text"}),a.default.createElement("br",null),a.default.createElement(d.Tree,{data:o.default,defaultExpanded:["0","2"],keygen:"id",mode:n,onChange:this.handleChange,renderItem:this.renderItem,value:e}),a.default.createElement("div",{style:i},"Current select value:",a.default.createElement("pre",{style:{background:"#f2f2f2"}},JSON.stringify(e,null,2))))},c);function c(e){var n=s.call(this,e)||this;n.handleChange=function(e){n.setState({value:e})},n.handleModeChange=function(e){n.setState({mode:e,value:[]})},n.renderItem=function(e){return"node "+e.id};e=[];return function e(n,t){n=r.__read(n,1)[0];n&&(t.push(n.id),n.children&&e(n.children,t))}(o.default,e),n.state={mode:1,value:e},n}n.Z=t},67722:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=t(79136),i=a.__importDefault(t(10496)),a=(r=d.Component,a.__extends(l,r),l.prototype.render=function(){return d.default.createElement(o.Tree,{data:i.default,defaultExpanded:["1","2"],disabled:this.isDisabled,keygen:"id",onChange:this.handleChange,renderItem:this.renderItem})},l);function l(){var e=null!==r&&r.apply(this,arguments)||this;return e.handleChange=function(e){console.log(e)},e.isDisabled=function(e){return"1-0"===e.id},e.renderItem=function(e){return"node "+e.id},e}n.Z=a},30834:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=t(79136),i=a.__importDefault(t(10496)),a=(r=d.Component,a.__extends(l,r),l.prototype.render=function(){return d.default.createElement(o.Tree,{data:this.state.data,keygen:"id",defaultExpanded:this.defaultExpanded,onDrop:this.handleDrop,renderItem:this.renderItem})},l);function l(e){var a=r.call(this,e)||this;return a.handleDrop=function(e,n,t,r){console.log(e,n,t,r),a.setState({data:e})},a.renderItem=function(e){return d.default.createElement("div",null,d.default.createElement("span",null,"node "),d.default.createElement("span",{id:"node-id-"+e.id},e.text))},a.state={data:i.default},a.defaultExpanded=["1"],a}n.Z=a},87632:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=t(79136),i=a.__importDefault(t(10496)),a=(r=d.Component,a.__extends(l,r),l.prototype.render=function(){return d.default.createElement(o.Tree,{data:this.state.data,keygen:"id",defaultExpanded:this.defaultExpanded,onDrop:this.handleDrop,dragImageSelector:function(e){return"#node-id-"+e.id},dragImageStyle:{color:"red"},renderItem:this.renderItem,dragHoverExpand:!0})},l);function l(e){var a=r.call(this,e)||this;return a.handleDrop=function(e,n,t,r){console.log(e,n,t,r),a.setState({data:e})},a.renderItem=function(e){return d.default.createElement("div",null,d.default.createElement("span",null,"node "),d.default.createElement("span",{id:"node-id-"+e.id},e.text))},a.state={data:i.default},a.defaultExpanded=["1"],a}n.Z=a},96366:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=a.__importDefault(t(18172)),i=t(79136),l=["0","1","2","3","4"].map(function(e){return{id:e}}),t=(r=d.Component,a.__extends(s,r),s.prototype.render=function(){return d.default.createElement(i.Tree,{data:this.state.data,keygen:this.keyGenerator,loader:this.loader,renderItem:this.renderItem,onChange:this.handleChange,value:this.state.value})},s);function s(e){var n=r.call(this,e)||this;return n.loader=function(e){var r=e.split(",");setTimeout(function(){n.setState(o.default(function(e){var t=e.data;r.forEach(function(n,e){t=t.find(function(e){return e.id===n}),e<r.length-1&&(t=t.children)}),t.children=a.__spreadArray([],a.__read(Array.from({length:Math.round(4*Math.random())},function(e,n){return n}).map(function(e){return{id:t.id+"-"+e}})))}))},500)},n.keyGenerator=function(e,n){return(n+","+e.id).replace(/^,/,"")},n.handleChange=function(e){return n.setState({value:e})},n.renderItem=function(e){return"node "+e.id},n.state={data:l,value:[]},n}n.Z=t},23047:function(e,n,t){"use strict";var r,a=t(70655),d=a.__importStar(t(24698)),o=a.__importStar(t(10496)),a=(r=d.Component,a.__extends(i,r),i.prototype.render=function(){var e=this.state.expand;return d.default.createElement("div",null,"Current node count: ",o.allIds.length,". ",d.default.createElement("a",{onClick:this.toggle},e?"Collapse":"Expand"," Code"),d.default.createElement("pre",{style:{display:e?"block":"none"}},JSON.stringify(o.default,null,2)))},i);function i(e){var n=r.call(this,e)||this;return n.toggle=function(){n.setState({expand:!n.state.expand})},n.state={expand:!1},n}n.Z=a}}]);