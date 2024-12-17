/* eslint-disable testing-library/no-debugging-utils */
import { shallow } from "enzyme";
import MeetupItem from "./MeetupItem";


jest.mock("../../util-hooks/useMeetupData", () => ({
  useToggleFavorite: () => ({
    mutate: jest.fn()
  })
}))

test("<MeetupItem/> renders without crashing", () => {
  const mockMeetup = {
    id: '1',
    image: 'https://test-url-image.com',
    title: 'test title',
    address: 'test address',
    description: 'test description',
    favorite: false,
  };

  const wrapper = shallow(<MeetupItem meetup={mockMeetup} />);
  expect(wrapper.exists()).toBe(true);
});
