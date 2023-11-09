import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from './Calculator';

test('Shows current result container', () => {
    render(<Calculator />);
    const currResultElement = screen.getByTitle(/current result/i);
    expect(currResultElement).toBeInTheDocument();
})

test('Should display current result as user types inside input', async () => {
    render(<Calculator />);
    const input = screen.getByRole('textbox');
    // screen.debug();
    const number1 = Math.ceil(Math.random() * 10);
    const number2 = Math.ceil(Math.random() * 10);
    act(() => { userEvent.type(input, `${number1}+${number2}`) });
    const addResult = number1 + number2;
    const span = await screen.findByTitle(/current result/i);
    expect(span).toHaveTextContent(addResult);
})