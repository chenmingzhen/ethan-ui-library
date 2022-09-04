/**
 * cn - 滚动
 *    -- 滚动的使用
 * en - Scroll
 *    -- Scroll usage
 */
import React from 'react'
import { Alert } from 'ethan'

export default function() {
    return (
        <>
            <div>
                <Alert.Scroll
                    onClose={() => {
                        console.log('all close')
                    }}
                >
                    <Alert type="success" icon>
                        Success Type.
                    </Alert>
                    <Alert type="info" icon>
                        Info Type.
                    </Alert>
                    <Alert type="warning" icon>
                        Warning Type.
                    </Alert>
                    <Alert type="danger" icon>
                        Danger Type.
                    </Alert>
                </Alert.Scroll>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Alert.Scroll style={{ padding: '20px' }}>
                    <Alert icon iconSize={24} type="success">
                        <h3>Set iconSize</h3>
                        iconSize=24
                    </Alert>
                    <Alert icon iconSize={24} type="info">
                        <h3>Set iconSize</h3>
                        iconSize=24
                    </Alert>
                    <Alert icon iconSize={24} type="warning">
                        <h3>Set iconSize</h3>
                        iconSize=24
                    </Alert>
                    <Alert icon iconSize={24} type="danger">
                        <h3>Set iconSize</h3>
                        iconSize=24
                    </Alert>
                </Alert.Scroll>
            </div>
        </>
    )
}
