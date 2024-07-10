import { FC, memo, ReactElement } from 'react';

interface ElementProps {
    content: string | ReactElement,
    className?: string,
    click?: (data?: any) => void
}

const Element: FC<ElementProps> = ({ content, className, click }) => {
    return (
        <button
            className={`${'w-1/5 max-w-1/4 aspect-square bg-gray-200 rounded-full transition-all select-none text-3xl flex justify-center items-center active:scale-95 active:bg-green-600 active:text-white'} ${className || ''}`}
            onClick={click}
            title={typeof content === 'string' ? content : ''}
            type={'button'}
        >
            {content}
        </button>
    )
}

export default memo(Element);