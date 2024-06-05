import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

test.skip('Shows current result container', () => {
    render(<Calculator />);
    const currResultElement = screen.getByTitle(/current result/i);
    expect(currResultElement).toBeInTheDocument();
})

test.skip('Should display current result as user types inside input', async () => {
    render(<Calculator />);
    // screen.logTestingPlaygroundURL();
    const input = screen.getByRole('textbox');
    // screen.debug();
    const number1 = Math.ceil(Math.random() * 10);
    const number2 = Math.ceil(Math.random() * 10);
    act(() => { userEvent.type(input, `${number1}+${number2}`) });
    const addResult = number1 + number2;
    const span = await screen.findByTitle(/current result/i);
    expect(span).toHaveTextContent(addResult);
})

test.skip('* operator', async () => {
    render(<Calculator />);
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.keyboard('2*5');
    await waitFor(() => {
        userEvent.click(euqalKey);
    })
    expect(input).toHaveValue('10');
})

test.skip('+ operator', async () => {
    render(<Calculator />);
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.keyboard('12+6');
    await waitFor(() => {
        userEvent.click(euqalKey);
    })
    expect(input).toHaveValue('18');
})

test.skip('- operator', async () => {
    render(<Calculator />);
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.keyboard('9-4');
    await waitFor(() => {
        userEvent.click(euqalKey);
    })
    expect(input).toHaveValue('5');
})

test.skip('/ operator', async () => {
    render(<Calculator />);
    const euqalKey = screen.getByRole('button', { name: /=/ });
    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.keyboard('15/5');
    await waitFor(() => {
        userEvent.click(euqalKey);
    })
    expect(input).toHaveValue('3');
})

test.skip('should render history button', () => {
    render(<Calculator />);
    // screen.logTestingPlaygroundURL();
    const historyButton = screen.getByTitle(/history/i);
    expect(historyButton).toBeInTheDocument();
})

test('history should be hidden initially', () => {
    render(<Calculator />);
    const clearHistoryButton = screen.queryByRole('button', { name: /clear history/i });
    expect(clearHistoryButton).not.toBeInTheDocument();
})

test('history should be visible when clicked on history button', async () => {
    render(<Calculator />);
    const historyButton = screen.getByTitle(/history/i);
    userEvent.click(historyButton);
    const clearHistoryButton = await screen.findByRole('button', { name: /clear history/i })
    expect(clearHistoryButton).toBeInTheDocument();
})