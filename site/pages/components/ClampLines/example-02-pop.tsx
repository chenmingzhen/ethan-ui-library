/**
 * cn - 显示提示
 *    -- 显示提示
 * en - Pop
 *    -- Show Popover
 */
import React from 'react'
import { ClampLines } from 'ethan-ui'

const text =
    'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js. However, React is only concerned with state management and rendering that state to the DOM, so creating React applications usually requires the use of additional libraries for routing, as well as certain client-side functionality'

export default function () {
    return <ClampLines text={text} pop lines={2} />
}
