import React, { useContext } from 'react'
import Button from '../Button'
import { context } from './context'

interface CardSubmitProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    loading: boolean
}

const Submit: React.FC<CardSubmitProps> = ({ loading, children, ...props }) => {
    const { onSubmit, formStatus } = useContext(context)

    const handleClick = (e: React.MouseEvent) => {
        e.persist()

        setTimeout(() => {
            onSubmit(e.target)
        }, 50)
    }

    return (
        <Button
            {...props}
            type="primary"
            disabled={formStatus === 'disabled'}
            loading={formStatus === 'pending' || loading}
            onClick={handleClick}
        >
            {children}
        </Button>
    )
}

export default React.memo(Submit)
