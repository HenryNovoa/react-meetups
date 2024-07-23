## Demo

You can go to https://feature-test-requirements-react-meetup.surge.sh/ for a quick demo of the app,
it is currently deploying the branch feature/test-requirements.

Note: It is very possible that at first render the app might be slow to update as the database might be "sleeping."

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You need a supabase url and anon key to be able to run this project with one single table that have these columns:
- id (int8)
- created_at (timestamptz)
- title (varchar)
- image (varchar)
- address (varchar)
- description (varchar)
- favorite (bool)

And add it to a .env file as:
```
REACT_APP_SUPABASE_URL= my_url
REACT_APP_SUPABASE_ANON_KEY= my_anon_key
```

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Quality of life improvements
- Updated to react 18
- Use of lazy loading for routes (react 18 neccesary to use the Suspense component)
- Use of react Query as a server state management library


## Requirements
1. Header, an animation was required where if we scrolled down, the header must dissapear and when we scrolled up it has to return.
    - This was done by:
    Using an observer pattern to subscribe the setScrollDirection function to whether it is scrolling up or down.
    - In src/components/layout/MainNavigation it is checked whether there is a scroll up or down and the appropriate css properties are applied for the animation.
Relevant files:
 - src/utils/ScrollObserver.js
 - src/util-hooks/useScrollDirection.js   
 - src/components/layout/MainNavigation.js
 - src/components/layout/MainNavigation.module.css

 2. Navigation with the header using the url for changes. (f.e favorites page is /favorites)
 This was done:
 - In App.js using the react-router-dom library we added the corresponding routes using lazy loading and the Suspense component.
 - We added the corresponding link routes to the MainNavigation.js file
Relevant files:
- src/components/layout/MainNavigation.js
- src/lazyLoad/pages.js
- src/lazyLoad/routes.js
- src/App.js

3. Add the logic to implement add and remove favorites

This was the longest of the features and was done by:
- Installing and implementing react query as a server state management library
- Integrating supabase as a way to persist data
- The arquitecture for persistent the data as an example is:
    - User clicks to add a favorite
    - useToggleFavorite hook is called
    - useToogleFavorite calls upon the meetup repository where the dataAccessLayer updates the database
    - React Query is in charge of handling these mutations and updates the MainNavigation.js component on click.
Relevant files: 
- src/dataAccess/DataAccess.js
- src/dataAccess/SupabaseDataAccess.js
- src/components/layout/MainNavigation.js
- src/components/meetups/MeetupItem.js
- src/pages/AllMeetupsPage.js
- src/pages/Favorites.js
- src/respositories/meetupRepository.js
- src/util-hooks/useMeetupData.js

4. Add some unit and e2e tests:

In particular, src/setupTests.js had to be updated to use another wrapper to be able to work with react 18.
- The data-test html tag have been updated to data-testid, this was decided to conveniently be able to use with react testing library function ```queryAllByTestId```
- The tests already implemented have been updated to pass(in our case only src/components/meetups/MeetupItem.test.js)
- The rest of the tests are done using react testing library.
- An e2e test has also been implemented where we test the use case of adding and removing a favorite meetup.

Relevant files:
- cypress/e2e/favoriteMeetup.cy.js
- src/App.test.js
- src/components/meetups/MeetupItem.test.js
- src/pages/AllMeetups.test.js
- src/pages/Favorites.test.js

