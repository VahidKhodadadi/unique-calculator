import { render, screen } from '@testing-library/react';
import Element from './Element';
import userEvent from '@testing-library/user-event';

test('click function is invoked one time', async () => {
    const clickFn = jest.fn();
    render(<Element content={'='} click={clickFn} />);
    // screen.debug();
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(clickFn).toBeCalledTimes(1);
})

test('button is displayed', () => {
    render(<Element content={'='} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
})

test('button has tooltip', () => {
    render(<Element content={'='} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title');
})