/**
 * cn - 适应
 *    -- 内置了多种适应容器的方式。同 <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"> object-fit。</a>
 * en - Fit
 *    -- There are four built ways that fit the container. Same with <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit"> object-fit。</a>.
 */
import React from 'react'
import { Image } from 'ethan-ui'

export default function () {
    return (
        <div>
            {['fill', 'contain', 'cover', 'none', 'scale-down'].map((fit: any) => (
                <div key={fit} style={{ padding: 4, display: 'inline-block' }}>
                    <Image
                        width="100px"
                        height="100px"
                        shape="thumbnail"
                        fit={fit}
                        src="https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"
                    />
                    <div style={{ textAlign: 'center', paddingTop: 4 }}>{fit}</div>
                </div>
            ))}
        </div>
    )
}
