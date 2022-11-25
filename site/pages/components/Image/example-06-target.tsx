/**
 * cn - 打开方式
 *    -- 提供了 4 种方式展示原始图片，弹出层、新窗口打开、当前窗口打开、下载
 * en - Target
 *    -- There are 4 ways to display the original image, pop-up layer, new window open, current window open, download.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return (
        <div>
            {['_modal', '_blank', '_self', '_download'].map((target: any) => (
                <div key={target} style={{ display: 'inline-block', marginRight: 12, textAlign: 'center' }}>
                    <Image
                        width={80}
                        height={80}
                        target={target}
                        shape="thumbnail"
                        src="https://chenmingzhen.github.io/ethan-ui-library/images/1_s.jpg"
                        thumbnail="https://chenmingzhen.github.io/ethan-ui-library/images/1_s.jpg"
                    />
                    <br />
                    {target}
                </div>
            ))}
        </div>
    )
}
