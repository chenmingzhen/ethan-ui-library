import React from 'react'
import Avatar from '@/component/Avatar'

export default () => (
  <div style={{ marginTop: '100px', marginLeft: '100px' }}>
    <div>
      <Avatar size="small">Y</Avatar>
      <Avatar size="small" icon="user-o" />
      <Avatar
        size="small"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
      />
      <Avatar size="small" shape="square">
        Y
      </Avatar>
      <Avatar size="small" icon="user-o" shape="square" />
      <Avatar
        size="small"
        shape="square"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
      />

      <Avatar size="default">Y</Avatar>
      <Avatar size="default" icon="user-o" />
      <Avatar
        size="default"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
      />
      <Avatar size="default" shape="square">
        Y
      </Avatar>
      <Avatar size="default" icon="user-o" shape="square" />
      <Avatar
        size="default"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
        shape="square"
      />

      <Avatar size="large">Y</Avatar>
      <Avatar size="large" icon="user-o" />
      <Avatar
        size="large"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
      />
      <Avatar size="large" shape="square">
        Y
      </Avatar>
      <Avatar size="large" icon="user-o" shape="square" />
      <Avatar
        size="large"
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
        shape="square"
      />

      <Avatar
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
        stytle={{ width: '300px', height: '300px' }}
        size={100}
      />

      <Avatar
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg"
        shape="square"
        size={100}
      />

      <Avatar size={48} style={{ fontSize: 30, backgroundColor: '#e8e8e8', color: '#dc9656' }}>
        IT
      </Avatar>

      {/*  自适应大小 */}
      <Avatar>MJ</Avatar>
      <Avatar>Billie</Avatar>
      <Avatar>Jean</Avatar>
    </div>
  </div>
)
