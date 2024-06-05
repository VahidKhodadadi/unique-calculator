import { FC } from 'react';
import classes from './History.module.scss';

interface HistoryProps {
    data: { statement: string, result: string }[],
    clearHistory: () => void
}

const History: FC<HistoryProps> = ({ data, clearHistory }) => {
    return (
        <div className={classes['History']}>
            <ul className={classes['HistoryItems']}>
                {
                    data.map(({ statement, result }, index) => {
                        return (
                            <li key={`history-item-${index}`} className={classes['HistoryItem']}>
                                <span className={classes['HistoryStatement']}>{statement}</span>
                                <span className={classes['HistoryResult']}>={result}</span>
                            </li>
                        )
                    })
                }
            </ul>
            <button className={classes['ClearButton']} onClick={clearHistory}>Clear history</button>
        </div>
    )
}

export default History;