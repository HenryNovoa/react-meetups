import { NavLink } from 'react-router-dom';
import { useFavoriteMeetups } from '../../util-hooks/useMeetupData';
import useScrollDirection from "../../util-hooks/useScrollDirection";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  const scrollDirection = useScrollDirection()


  const { data: favoriteMeetups } = useFavoriteMeetups();

  const favoriteCount = favoriteMeetups ? favoriteMeetups.length : 0;
  return (
    <header className={`${classes.header} ${scrollDirection === 'down' ? classes.hide : ''}`} data-test="navigation-header">
      <div className={classes.logo}>
        React Meetups
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to='/'
            >
              All Meetups
            </NavLink>
          </li>

          <li>
            <NavLink
              to="new-meetup">
              Add New Meetup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
            > My Favorites
              <span className={classes.badge}>{favoriteCount}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
