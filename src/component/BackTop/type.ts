export interface BackTopProps {
    right?: number
    bottom?: number
    height?: number
    children?: React.ReactNode
    onClick?(evt: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}
