import { FC } from 'react';

interface HistoryProps {
    data: { statement: string, result: string }[],
    clearHistory: () => void
}

const History: FC<HistoryProps> = ({ data, clearHistory }) => {
    return (
        <div className={'absolute bottom-0 left-0 w-full h-full bg-white p-5 flex justify-start items-end flex-col border-2 border-gray-500'}>
            <ul className={'h-[calc(100%-60px)] w-full pl-5 overflow-scroll flex justify-start items-end flex-col'}>
                {
                    data.map(({ statement, result }, index) => {
                        return (
                            <li key={`history-item-${index}`} className={'w-full flex-col flex justify-start items-start mb-5'}>
                                <span className={'text-2xl'}>{statement}</span>
                                <span className={'text-4xl text-green-500'}>={result}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <button
                className={'mt-3 w-full h-[34px] text-2xl bg-gray-200 text-black flex justify-center items-center rounded-sm cursor-pointer'}
                onClick={clearHistory}
            >
                Clear history
            </button>
        </div>
    )
}

export default History;