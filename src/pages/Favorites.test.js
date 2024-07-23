import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useFavoriteMeetups } from '../util-hooks/useMeetupData';
import Favorites from './Favorites';

jest.mock('../util-hooks/useMeetupData', () => ({
    useFavoriteMeetups: jest.fn(),
}));

jest.mock('../components/meetups/MeetupItem', () => {
    return function MockMeetupItem({ meetup }) {
        return <li data-testid="meet-up-item">{meetup.title}</li>;
    };
});

describe('Favorites', () => {
    test('renders loading state', () => {
        useFavoriteMeetups.mockReturnValue({ isLoading: true });
        render(<Favorites />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        useFavoriteMeetups.mockReturnValue({ error: new Error('Test error'), isLoading: false });
        render(<Favorites />);
        expect(screen.getByText('Error: Test error')).toBeInTheDocument();
    });

    test('renders favorite meetups list', () => {
        const mockFavoriteMeetups = [
            { id: '1', title: 'Favorite Meetup 1' },
            { id: '2', title: 'Favorite Meetup 2' },
        ];
        useFavoriteMeetups.mockReturnValue({ data: mockFavoriteMeetups, isLoading: false, error: null });

        render(<Favorites />);

        expect(screen.getByText('Favorites Page')).toBeInTheDocument();
        expect(screen.getAllByTestId('meet-up-item')).toHaveLength(2);
        expect(screen.getByText('Favorite Meetup 1')).toBeInTheDocument();
        expect(screen.getByText('Favorite Meetup 2')).toBeInTheDocument();
    });

    test('renders empty favorites list', () => {
        useFavoriteMeetups.mockReturnValue({ data: [], isLoading: false, error: null });

        render(<Favorites />);

        expect(screen.getByText('Favorites Page')).toBeInTheDocument();
        expect(screen.queryAllByTestId('meet-up-item')).toHaveLength(0);
    });
});