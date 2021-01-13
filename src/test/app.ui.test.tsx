import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../ui/app';

test('renders website title', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Photo Albums/i);
    expect(linkElement).toBeInTheDocument();
});
