/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */

import React from 'react'
import { Avatar, Icon } from 'ethan-ui'

export default function () {
    return (
        <div>
            <style>{`.avatar-list {display: flex;}.avatar-list{margin-top: 10px;}.avatar-list > span {margin-left: 5px;}`}</style>

            <div className="avatar-list">
                <Avatar size="small">User</Avatar>
                <Avatar size="small" icon={<Icon.FontAwesome name="user" />} />
                <Avatar size="small" src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg" />
                <Avatar size="small" shape="square">
                    User
                </Avatar>
                <Avatar size="small" shape="square" icon={<Icon.FontAwesome name="user" />} />
                <Avatar
                    size="small"
                    shape="square"
                    src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg"
                />
            </div>
            <div className="avatar-list">
                <Avatar>User</Avatar>
                <Avatar icon={<Icon.FontAwesome name="user" />} />
                <Avatar src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg" />
                <Avatar shape="square">User</Avatar>
                <Avatar shape="square" icon={<Icon.FontAwesome name="user" />} />
                <Avatar shape="square" src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg" />
            </div>
            <div className="avatar-list">
                <Avatar size="large">User</Avatar>
                <Avatar size="large" icon={<Icon.FontAwesome name="user" />} />
                <Avatar size="large" src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg" />
                <Avatar size="large" shape="square">
                    User
                </Avatar>
                <Avatar size="large" shape="square" icon={<Icon.FontAwesome name="user" />} />
                <Avatar
                    size="large"
                    shape="square"
                    src="https://chenmingzhen.github.io/ethan-ui-library/images/2_s.jpg"
                />
            </div>
        </div>
    )
}
