import { FC, memo, ReactElement } from 'react';
import classes from './Element.module.scss';

interface ElementProps {
    content: string | ReactElement,
    className?: string,
    click?: (data?: any) => void
}

const Element: FC<ElementProps> = ({ content, className, click }) => {
    return (
        <button
            className={`${classes['Element']} ${className || ''}`}
            onClick={click}
            title={typeof content === 'string' ? content : ''}
            type={'button'}
        >
            {content}
        </button>
    )
}

export default memo(Element);