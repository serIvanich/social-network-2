import React from 'react';
import {render, screen} from '@testing-library/react';
import SamuraiJsApp from './App';

test('renders learn react link', () => {
    render(<SamuraiJsApp/>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

