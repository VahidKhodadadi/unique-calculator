import { useCallback, useState, useRef, useEffect, useMemo, ReactElement, memo } from 'react';
import classes from './Calculator.module.scss';
import Element from '../Element/Element';
import History from '../History/History';
import { ReactComponent as HistoryIcon } from 'src/theme/svg/time-line.svg';
import { ReactComponent as CalculatorIcon } from 'src/theme/svg/calculator-line.svg';
import { ReactComponent as MathCompassIcon } from 'src/theme/svg/math-compass.svg';
import { ReactComponent as SwapIcon } from 'src/theme/svg/swap-horizontal.svg';
import { ReactComponent as RemoveIcon } from 'src/theme/svg/delete-back-2-line.svg';

const Calculator = () => {
    const [result, setResult] = useState('');
    const resultRef = useRef<HTMLInputElement>(null);
    const [history, setHistory] = useState<{ statement: string, result: string }[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showEngineerMode, setShowEngineerMode] = useState(false);
    const lastChar = useMemo(() => result.charAt(result.length - 1), [result]);
    const [angleMode, setAngleMode] = useState<'Rad' | 'Deg'>('Rad');
    const [mathMode, setMathMode] = useState<'Mode1' | 'Mode2'>('Mode1');

    useEffect(() => {
        if (resultRef && resultRef.current) {
            resultRef.current.focus();
        }
        const fetchedHistory = localStorage.getItem('calculatorHistory');
        if (fetchedHistory) {
            setHistory(JSON.parse(fetchedHistory));
        }
    }, [])

    useEffect(() => {
        if (showEngineerMode) {
            window.screen.orientation.lock('landscape');
        }
        else {
            window.screen.orientation.lock('portrait');
        }
    }, [showEngineerMode])

    const calcMathOperations = useCallback((statement: string) => {
        // temp convertion
        const formattedStatement = statement
            .replaceAll('asin', 'as-temp')
            .replaceAll('acos', 'ac-temp')
            .replaceAll('atan', 'at-temp')
            .replaceAll('sin', 's-temp')
            .replaceAll('cos', 'c-temp')
            .replaceAll('tan', 't-temp')
            .replaceAll('sinh', 'sh-temp')
            .replaceAll('cosh', 'ch-temp')
            .replaceAll('tanh', 'th-temp')
            .replaceAll('asinh', 'ash-temp')
            .replaceAll('acosh', 'ach-temp')
            .replaceAll('atanh', 'ath-temp')

            // real convertion
            .replaceAll('as-temp', 'Math.asin')
            .replaceAll('ac-temp', 'Math.acos')
            .replaceAll('at-temp', 'Math.atan')
            .replaceAll('s-temp', 'Math.sin')
            .replaceAll('c-temp', 'Math.cos')
            .replaceAll('t-temp', 'Math.tan')
            .replaceAll('sh-temp', 'Math.sinh')
            .replaceAll('ch-temp', 'Math.cosh')
            .replaceAll('th-temp', 'Math.tanh')
            .replaceAll('ash-temp', 'Math.asinh')
            .replaceAll('ach-temp', 'Math.acosh')
            .replaceAll('ath-temp', 'Math.atanh')

            .replaceAll('^', '**')
            .replaceAll('abs', 'Math.abs')
            .replaceAll('log', 'Math.log10')
            .replaceAll('ln', 'Math.log');

        return formattedStatement;
    }, [])

    const addToHistory = useCallback((item: { statement: string, result: string }) => {
        const updatedHistory = [...history];
        localStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory.concat(item)));
        setHistory(updatedHistory.concat(item));
    }, [history])

    const calculateResult = useCallback(() => {
        const evaluatedResult = parseFloat(eval(calcMathOperations(result))).toString();
        addToHistory({ statement: result, result: evaluatedResult });
        setResult(evaluatedResult);
    }, [result, calcMathOperations, addToHistory])

    const clearHistory = useCallback(() => {
        localStorage.setItem('calculatorHistory', JSON.stringify([]));
        setHistory([]);
    }, [])

    const addChars = useCallback((content: string) => {
        setResult(prevResult => `${prevResult}${content}`);
    }, [])

    const clickNumberHandler = useCallback((content: string) => {
        addChars(content);
    }, [addChars])

    const clearResult = useCallback(() => {
        setResult('');
    }, [])

    const useParenthesis = useCallback(() => {
        const resultChars = Array.from(result);
        const openParenthesisLength = resultChars.filter(char => char === '(').length;
        const closeParenthesisLength = resultChars.filter(char => char === ')').length;
        // const lastCharIndex = result.length - 1;
        // const lastChar = result[lastCharIndex];
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(lastChar)) {
            setResult(prev => prev + ')');
        }
        else if (lastChar === ')') {
            if (closeParenthesisLength < openParenthesisLength) {
                setResult(prev => prev + ')');
            }
            else {
                setResult(prev => prev + '*(');
            }
        }
        else if (lastChar === '(') {
            setResult(prev => prev + '(');
        }
        else {
            setResult(prev => prev + '(');
        }
    }, [result, lastChar])

    const isLastCharOperator = useCallback(() => {
        if (['+', '-', '*', '/'].includes(lastChar) || result.trim() === '') {
            return true;
        }
        return false;
    }, [lastChar, result])

    const addOperator = useCallback((content: string) => {
        if (isLastCharOperator()) {
            return;
        }
        addChars(content);
    }, [isLastCharOperator, addChars])

    const changeMathMode = useCallback(() => {
        if (mathMode === 'Mode1') {
            setMathMode('Mode2');
        }
        else {
            setMathMode('Mode1');
        }
    }, [mathMode])

    const calculateRad = () => {

    }

    const changeAngleMode = useCallback(() => {
        if (angleMode === 'Deg') {
            setAngleMode('Rad');
        }
        else {
            setAngleMode('Deg');
        }
    }, [angleMode])

    const factorial = useCallback((num: number): number => {
        if (num < 0) {
            throw new Error("Num must not be negative");
        }
        return num <= 1 ? 1 : num * factorial(num - 1);
    }, [])

    const addTriGonometryOperator = useCallback((operator: string) => {
        if (isLastCharOperator() || lastChar === '(') {
            setResult(prev => prev + operator);
        }
        else {
            setResult(prev => `${prev}*${operator}(`);
        }
    }, [isLastCharOperator, lastChar])

    const addLogarithmOperator = (operator: string) => {
        if (isLastCharOperator() || lastChar === '(') {
            setResult(prev => prev + operator);
        }
        else {
            setResult(prev => `${prev}*${operator}(`);
        }
    }

    const addPowerOperator = useCallback(() => {
        if (isLastCharOperator() || lastChar === '(') {
            return;
        }
        else {
            setResult(prev => `${prev}^(`);
        }
    }, [isLastCharOperator, lastChar])

    const onClearLastChar = useCallback(() => {
        if (result.length <= 0) {
            return;
        }
        setResult(prev => prev.substring(0, prev.length - 1));
    }, [result])

    const addAbsoluteOperator = useCallback(() => {
        if (isLastCharOperator()) {
            setResult(prev => prev + 'abs(');
        }
        else {
            setResult(prev => `${prev}*abs(`);
        }
    }, [isLastCharOperator])

    const engineerButtons: {
        content: string | ReactElement,
        click: () => any,
        className?: string
    }[] = [
            {
                content: <SwapIcon
                    className={classes['Icon']}
                    onClick={changeMathMode}
                />,
                click: changeMathMode
            },
            {
                content: angleMode,
                click: changeAngleMode
            },
            {
                content: 'asin',
                click: () => addTriGonometryOperator('asin')
            },
            {
                content: 'acos',
                click: () => addTriGonometryOperator('acos')
            },
            {
                content: 'atan',
                click: () => addTriGonometryOperator('atan')
            },
            {
                content: 'sinh',
                click: () => addTriGonometryOperator('sinh')
            },
            {
                content: 'cosh',
                click: () => addTriGonometryOperator('cosh')
            },
            {
                content: 'tanh',
                click: () => addTriGonometryOperator('tanh')
            },
            {
                content: 'asinh',
                click: () => addTriGonometryOperator('asinh')
            },
            {
                content: 'acosh',
                click: () => addTriGonometryOperator('acosh')
            },
            {
                content: 'atanh',
                click: () => addTriGonometryOperator('atanh')
            },
            {
                content: <div><span>2</span><sup>x</sup></div>,
                click: () => setResult(prev => `2^(${prev})`)
            },
            {
                content: <div><span>x</span><sup>3</sup></div>,
                click: () => setResult(prev => `${prev}^(3)`)
            },
            {
                content: 'x!',
                click: () => setResult(prev => factorial(parseFloat(prev)).toString())
            }
        ]

    const mathematicButtons: {
        content: string | ReactElement,
        click: () => any,
        className?: string
    }[] = [
            {
                content: <SwapIcon className={classes['Icon']} onClick={changeMathMode} />,
                click: changeMathMode
            },
            {
                content: angleMode,
                click: changeAngleMode
            },
            {
                content: 'sin',
                click: () => addTriGonometryOperator('sin')
            },
            {
                content: 'cos',
                click: () => addTriGonometryOperator('cos')
            },
            {
                content: 'tan',
                click: () => addTriGonometryOperator('tan')
            },
            {
                content: 'ln',
                click: () => addLogarithmOperator('ln')
            },
            {
                content: 'log',
                click: () => addLogarithmOperator('log')
            },
            {
                content: '1/x',
                click: () => setResult(prev => `1/(${prev})`)
            },
            {
                content: <div><span>e</span><sup>x</sup></div>,
                click: () => setResult(prev => `e^${prev}`)
            },
            {
                content: <div><span>x</span><sup>2</sup></div>,
                click: () => setResult(prev => `${prev}^(2)`)
            },
            {
                content: <div><span>x</span><sup>y</sup></div>,
                click: addPowerOperator
            },
            {
                content: '|x|',
                click: addAbsoluteOperator
            },
            {
                content: 'π',
                click: () => addChars(Math.PI.toString())
            },
            {
                content: 'e',
                click: () => addChars(Math.E.toString())
            },
        ]

    const buttons: {
        content: string,
        click: () => any,
        className?: string
    }[] = [
            {
                content: 'C',
                click: clearResult,
                className: classes['Red']
            },
            {
                content: '()',
                className: classes['ColorGreen'],
                click: useParenthesis
            },
            {
                content: '%',
                className: classes['ColorGreen'],
                click: () => addOperator('%')
            },
            {
                content: '/',
                className: classes['ColorGreen'],
                click: () => addOperator('/')
            },
            {
                content: '7',
                click: () => clickNumberHandler('7')
            },
            {
                content: '8',
                click: () => clickNumberHandler('8')
            },
            {
                content: '9',
                click: () => clickNumberHandler('9')
            },
            {
                content: '*',
                className: classes['ColorGreen'],
                click: () => addOperator('*')
            },
            {
                content: '4',
                click: () => clickNumberHandler('4')
            },
            {
                content: '5',
                click: () => clickNumberHandler('5')
            },
            {
                content: '6',
                click: () => clickNumberHandler('6')
            },
            {
                content: '-',
                className: classes['ColorGreen'],
                click: () => addOperator('-')
            },
            {
                content: '1',
                click: () => clickNumberHandler('1')
            },
            {
                content: '2',
                click: () => clickNumberHandler('2')
            },
            {
                content: '3',
                click: () => clickNumberHandler('3')
            },
            {
                content: '+',
                className: classes['ColorGreen'],
                click: () => addOperator('+')
            },
            {
                content: '+/-',
                click: () => { }
            },
            {
                content: '0',
                click: () => clickNumberHandler('0')
            },
            {
                content: '.',
                click: () => {
                    if (result.charAt(result.length - 1) === '.') {
                        return;
                    }
                    if (result.trim() === '') {
                        setResult('0.');
                    }
                    else {
                        setResult(prevResult => `${prevResult}.`);
                    }
                }
            },
            {
                content: '=',
                click: calculateResult,
                className: classes['BackGreen']
            }
        ]



    return (
        <div className={`${classes['Calculator']} ${showEngineerMode ? classes['EngineerMode'] : ''}`}>
            <input
                ref={resultRef}
                type={'text'}
                value={result}
                onChange={(event) => setResult(event.target.value)}
                className={classes['Result']}
            />

            <div className={classes['SpecialButtons']}>
                {
                    !showHistory ?
                        <HistoryIcon className={classes['Icon']} onClick={() => setShowHistory(true)} />
                        :
                        <CalculatorIcon className={classes['Icon']} onClick={() => setShowHistory(false)} />
                }
                <MathCompassIcon
                    className={classes['Icon']}
                    onClick={() => setShowEngineerMode(prev => !prev)}
                />

                <RemoveIcon
                    onClick={onClearLastChar}
                    className={`${classes['Icon']} ${classes['ClearIcon']}`}
                />
            </div>

            <div className={classes['Buttons']}>
                {
                    showEngineerMode &&
                    <div className={classes['EngineerButtons']}>
                        {(mathMode === 'Mode1' ? engineerButtons : mathematicButtons)
                            .map(({ content, click, className }, index: number) => {
                                return (
                                    <Element
                                        className={className}
                                        key={`engineer-button-${index}`}
                                        content={content}
                                        click={() => {
                                            click();

                                            if (resultRef && resultRef.current) {
                                                (resultRef.current as HTMLInputElement).style.color = 'green';
                                            }
                                            resultRef.current?.focus();
                                        }}
                                    />
                                )
                            })}
                    </div>
                }

                <div className={classes['DefaultButtons']}>
                    {buttons.map(({ content, click, className }) => {
                        return (
                            <Element
                                className={className}
                                key={content}
                                content={content}
                                click={() => {
                                    click();

                                    if (resultRef && resultRef.current) {
                                        (resultRef.current as HTMLInputElement).style.color = 'green';
                                    }
                                    resultRef.current?.focus();
                                }}
                            />
                        )
                    })}
                </div>
            </div>
            {showHistory && <History clearHistory={clearHistory} data={history} />}
        </div>
    )
}

export default memo(Calculator);