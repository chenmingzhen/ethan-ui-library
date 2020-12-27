import React from 'react'
import Checkbox from '@/component/Checkbox'

const data = [
  { id: 1, color: 'red' },
  { id: 2, color: 'orange' },
  { id: 3, color: 'yellow' },
  { id: 4, color: 'green' },
  { id: 5, color: 'cyan' },
  { id: 6, color: 'blue' },
  { id: 7, color: 'violet' },
]

class Complex extends React.Component {
  renderItem = d => {
    const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }
    return <span style={style}>{d.color}</span>
  }

  render() {
    return (
      <Checkbox.Group
        keygen="id"
        data={data}
        format="color"
        defaultValue={['blue', 'cyan']}
        renderItem={this.renderItem}
      />
    )
  }
}

const dataTwo = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
  return (
    <>
      <Checkbox>Checkbox</Checkbox>

      <div>
        <Checkbox checked={false}>not checked</Checkbox>
        <Checkbox checked>checked</Checkbox>
        <Checkbox checked="indeterminate">indeterminate</Checkbox>
      </div>

      <Checkbox
        htmlValue="ok"
        value="ok"
        onChange={(val, checked) => {
          console.log(val, checked)
        }}
      >
        value is ok
      </Checkbox>

      <Checkbox.Group keygen="id" defaultValue={[3, 5]}>
        {data.map(d => (
          <Checkbox key={d.id} htmlValue={d.id}>
            {d.color}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Complex />

      <Checkbox.Group
        keygen="id"
        block
        data={data}
        datum={{ format: 'color' }}
        defaultValue={['blue', 'cyan']}
        renderItem="color"
      />

      <div>
        <Checkbox.Group disabled keygen data={dataTwo} defaultValue={['blue', 'cyan']} renderItem={d => d} />
        <br />
        <Checkbox disabled checked={false}>
          not checked
        </Checkbox>
        <Checkbox disabled checked>
          checked
        </Checkbox>
        <Checkbox disabled checked="indeterminate">
          indeterminate
        </Checkbox>
      </div>

      <div>
        <Checkbox.Group data={dataTwo} disabled={d => d === 'yellow'} keygen value={['blue']} renderItem={d => d} />
      </div>

      <Checkbox
        inputable
        onChange={(val, checked, index) => {
          console.log(val, checked, index)
        }}
      >
        more...
      </Checkbox>
    </>
  )
}
