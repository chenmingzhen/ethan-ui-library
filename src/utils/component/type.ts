// eslint-disable-next-line max-classes-per-file
import React from 'react'

export declare class EComponent<P = Record<string, never>, S = Record<string, never>> extends React.Component<P, S> {
    setImmerState(fn: (state: S) => void, callback?: () => void)
}

export declare class EPureComponent<P = Record<string, never>, S = Record<string, never>> extends React.PureComponent<
    P,
    S
> {
    setImmerState(fn: (state: S) => void, callback?: () => void)
}
