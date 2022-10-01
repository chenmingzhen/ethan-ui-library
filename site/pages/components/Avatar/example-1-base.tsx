/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */

import React from 'react'
import { Avatar } from 'ethan-ui'

export default function() {
    return (
        <>
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
        </>
    )
}
