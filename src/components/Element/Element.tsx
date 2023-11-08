import { FC, memo, ReactElement } from 'react';
import classes from './Element.module.scss';

interface ElementProps {
    content: string | ReactElement,
    className?: string,
    click?: (data?: any) => void
}

const Element: FC<ElementProps> = ({ content: Content, className, click }) => {
    return (
        <button
            className={`${classes['Element']} ${className || ''}`}
            onClick={click}
            title={typeof Content === 'string' ? Content : ''}
        >
            {Content}
        </button>
    )
}

export default memo(Element);