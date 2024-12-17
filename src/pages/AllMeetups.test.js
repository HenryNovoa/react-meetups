import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useMeetupData } from "../util-hooks/useMeetupData";
import AllMeetupsPage from './AllMeetupsPage';

jest.mock("../util-hooks/useMeetupData");
jest.mock("../components/meetups/MeetupItem", () => {
    return function MockMeetupItem({ meetup }) {
        return <li data-testid="meet-up-item">{meetup.title}</li>;
    };
});

describe('AllMeetupsPage', () => {
    test('renders loading state', () => {
        useMeetupData.mockReturnValue({ isLoading: true });
        render(<AllMeetupsPage />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state', () => {
        useMeetupData.mockReturnValue({ error: new Error('Test error'), isLoading: false });
        render(<AllMeetupsPage />);
        expect(screen.getByText('Error:Test error')).toBeInTheDocument();
    });

    test('renders meetup list', () => {
        const mockMeetups = [
            { id: '1', title: 'Meetup 1' },
            { id: '2', title: 'Meetup 2' },
        ];
        useMeetupData.mockReturnValue({ data: mockMeetups, isLoading: false, error: null });

        render(<AllMeetupsPage />);

        expect(screen.getByText('All Meetups')).toBeInTheDocument();
        expect(screen.getAllByTestId('meet-up-item')).toHaveLength(2);
        expect(screen.getByText('Meetup 1')).toBeInTheDocument();
        expect(screen.getByText('Meetup 2')).toBeInTheDocument();
    });
});