import { FC, memo, ReactElement } from 'react';
import classes from './Element.module.scss';

interface ElementProps {
    content: string | ReactElement,
    className?: string,
    click?: (data?: any) => void
}

const Element: FC<ElementProps> = ({ content: Content, className, click }) => {
    return (
        <div
            className={`${classes['Element']} ${className || ''}`}
            onClick={click}
        >
            {Content}
        </div>
    )
}

export default memo(Element);