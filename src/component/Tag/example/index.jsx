import React, { useState } from 'react'
import Tag from '@/component/Tag'

class Dynamic extends React.Component {
  state = {
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    inputVisible: false,
  }

  remove = removedTag => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const tags = this.state.tags.filter(tag => tag !== removedTag)
    this.setState({ tags })
  }

  showInput = () => {
    this.setState({ inputVisible: true })
  }

  handleInputBlur = value => {
    const { tags } = this.state
    let newTags = tags
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value]
    }
    console.log(newTags)
    this.setState({
      tags: newTags,
      inputVisible: false,
    })
  }

  render() {
    const { tags, inputVisible } = this.state
    return (
      <div>
        {tags.map(a => (
          <Tag key={a} onClose={() => this.remove(a)}>
            {a}
          </Tag>
        ))}
        {inputVisible ? (
          <Tag.Input onBlur={this.handleInputBlur} />
        ) : (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            + New Tag
          </Tag>
        )}
      </div>
    )
  }
}

export default function() {
  const [value, setValue] = useState('abc')
  return (
    <>
      <div>
        <Tag>Tag 1</Tag>
        <Tag>Tag 2</Tag>
        <Tag onClose={() => console.log('I am close')} onClick={() => console.log('I am click')}>
          Tag 3
        </Tag>
      </div>

      <div>
        <Tag>Default</Tag>
        <Tag type="success">Success</Tag>
        <Tag type="info">Info</Tag>
        <Tag type="warning">Warning</Tag>
        <Tag type="danger">Danger</Tag>
      </div>

      <div>
        <Tag backgroundColor="#eeeeee">#eeeeee</Tag>
        <Tag backgroundColor="#613400">#613400</Tag>
        <Tag
          style={{
            color: '#eb2f96',
            background: '#fff0f6',
            borderColor: '#ffadd2',
          }}
        >
          #f50
        </Tag>
        <Tag
          style={{
            color: '#52c41a',
            background: '#f6ffed',
            borderColor: '#b7eb8f',
          }}
        >
          #87d068
        </Tag>
      </div>

      <div>
        <Tag onClose>onClose=true</Tag>

        <Tag onClose={() => console.log('close')}>onClose=function</Tag>

        <Tag
          onClose={() =>
            new Promise(resolve => {
              setTimeout(() => {
                console.log('promise close')
                resolve(true)
              }, 3000)
            })
          }
        >
          onClose=promise
        </Tag>
      </div>

      <div>
        <Tag disabled>Tag 1</Tag>
        <Tag disabled type="info">
          Tag 2
        </Tag>
        <Tag disabled onClose>
          Tag 3
        </Tag>
      </div>

      <Dynamic />

      <div>
        <Tag
          onCompleted={val => {
            setValue(val)
          }}
          onClose={() => {
            console.log('close')
          }}
        >
          {value}
        </Tag>
      </div>
    </>
  )
}
