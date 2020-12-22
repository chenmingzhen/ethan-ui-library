import React, { useState, useCallback } from 'react'
import Tabs from '@/component/Tabs'
import Icon from '@/component/Icon'
import Button from '@/component/Button'

const url = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
const FontAwesome = Icon(url, 'FontAwesome', 'fa')

const panelStyle = { padding: '12px 0' }
const contact = (
  <span>
    <FontAwesome name="user" style={{ marginRight: '10px' }} />
    Contact
  </span>
)

export default function() {
  return (
    <>
      <Tabs defaultActive={1}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs defaultActive={1}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact" disabled>
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs lazy={false}>
        <Tabs.Panel border="transparent" background="#ffe7ba" style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel border="transparent" background="#ffc069" style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel border="transparent" color="#fff" background="#d46b08" style={panelStyle} tab={contact}>
          3
        </Tabs.Panel>
        <Tabs.Panel border="transparent" color="#fff" background="#873800" style={panelStyle} tab="Setting">
          4
        </Tabs.Panel>
        <Tabs.Panel border="#b7eb8f" background="#f6ffed" style={panelStyle} tab="Message">
          5
        </Tabs.Panel>
      </Tabs>

      <Tabs inactiveBackground="#f2f2f2">
        {Array.from({ length: 20 }).map((_, i) => (
          <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
            {i}
          </Tabs.Panel>
        ))}
      </Tabs>

      <Tabs shape="line" defaultActive={1}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs shape="button" defaultActive={1}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs shape="dash" defaultActive={1}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs defaultActive={1} align="right">
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs defaultActive={1} align="vertical-left" shape="line">
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs defaultActive={1} align="vertical-right">
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs shape="line" collapsible>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <Tabs defaultActive={1} style={{ height: 200 }} tabBarExtraContent={<Button type="link">extra</Button>}>
        <Tabs.Panel style={panelStyle} tab="Home">
          1
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Profile">
          2
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="Contact">
          3
        </Tabs.Panel>
      </Tabs>

      <LinkDemo />
    </>
  )
}

const LinkDemo = () => {
  const [active, setActive] = useState(1)
  const handleChange = useCallback(
    v => {
      setActive(v)
    },
    [active]
  )

  return (
    <Tabs active={active} onChange={handleChange} shape="line">
      <Tabs.Link href="www.baidu.com">Href</Tabs.Link>
      <Tabs.Link href="www.baidu.com">Href</Tabs.Link>
      {/* <Tabs.Link> */}
      {/*  <Link to="#tab-link">Link</Link> */}
      {/* </Tabs.Link> */}
    </Tabs>
  )
}
