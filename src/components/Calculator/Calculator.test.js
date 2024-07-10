import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

beforeEach(() => {
    render(<Calculator />);
})

test('Shows current result container', () => {
    const currResultElement = screen.getByTitle(/current result/i);
    expect(currResultElement).toBeInTheDocument();
})

test('Should display current result as user types inside input', async () => {
    // screen.logTestingPlaygroundURL();
    // screen.debug();
    const number1 = Math.ceil(Math.random() * 10);
    const number2 = Math.ceil(Math.random() * 10);
    const input = screen.getByRole('textbox');
    act(() => { userEvent.type(input, `${number1}+${number2}`) });
    const addResult = number1 + number2;
    const span = await screen.findByTitle(/current result/i);
    expect(span).toHaveTextContent(addResult);
})

test('* operator', async () => {
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    // userEvent.keyboard('2*5');
    const number1 = Math.ceil(Math.random() * 10).toString();
    const number2 = Math.ceil(Math.random() * 10).toString();
    act(() => {
        userEvent.type(input, `${number1}*${number2}`);
    });
    act(() => {
        userEvent.click(euqalKey);
    });
    waitFor(() => {
        expect(input).toHaveValue(number1 * number2);
    });
})

test('+ operator', async () => {
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    const number1 = Math.ceil(Math.random() * 10).toString();
    const number2 = Math.ceil(Math.random() * 10).toString();
    userEvent.keyboard(`${number1}+${number2}`);
    userEvent.click(euqalKey);
    waitFor(() => {
        expect(input).toHaveValue(number1 + number2);
    });
})

test('- operator', async () => {
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    const number1 = Math.ceil(Math.random() * 10).toString();
    const number2 = Math.ceil(Math.random() * 10).toString();
    userEvent.click(input);
    userEvent.keyboard(`${number1}-${number2}`);
    userEvent.click(euqalKey);
    waitFor(() => {
        expect(input).toHaveValue(number1 - number2);
    });
})

test('/ operator', async () => {
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    const number1 = Math.ceil(Math.random() * 10).toString();
    const number2 = Math.ceil(Math.random() * 10).toString();
    userEvent.click(input);
    userEvent.keyboard(`${number1}/${number2}`);
    userEvent.click(euqalKey);
    waitFor(() => {
        expect(input).toHaveValue(number1 / number2);
    });
})

test('should render history button', () => {
    // screen.logTestingPlaygroundURL();
    const historyButton = screen.getByTitle(/history/i);
    expect(historyButton).toBeInTheDocument();
})

test('history should be hidden initially', () => {
    const clearHistoryButton = screen.queryByRole('button', { name: /clear history/i });
    expect(clearHistoryButton).not.toBeInTheDocument();
})

test('history should be visible when clicked on history button', async () => {
    const historyButton = screen.getByTitle(/history/i);
    userEvent.click(historyButton);
    const clearHistoryButton = await screen.findByRole('button', { name: /clear history/i })
    expect(clearHistoryButton).toBeInTheDocument();
})