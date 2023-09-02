import { FC } from 'react';
import classes from './History.module.scss';

interface HistoryProps {
    data: { statement: string, result: string }[],
    clearHistory: () => void
}

const History: FC<HistoryProps> = ({ data, clearHistory }) => {
    return (
        <div className={classes['History']}>
            <div className={classes['HistoryItems']}>
                {
                    data.map(({ statement, result }, index) => {
                        return (
                            <div key={`history-item-${index}`} className={classes['HistoryItem']}>
                                <div className={classes['HistoryStatement']}>{statement}</div>
                                <div className={classes['HistoryResult']}>={result}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={classes['ClearButtonContainer']}>
                <div className={classes['ClearButton']} onClick={clearHistory}>Clear history</div>
            </div>
        </div>
    )
}

export default History;