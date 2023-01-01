/**
 * cn - 密码
 *    -- 密码框。
 * en - Password
 *    -- Password.
 */
import React from 'react'
import { Input } from 'ethan-ui'

export default function () {
    return (
        <>
            <Input.Password placeholder="input password" style={{ width: '200px' }} clearable />

            <br />

            <Input.Password placeholder="input password" style={{ width: '200px', marginTop: 10 }} clearable disabled />
        </>
    )
}
