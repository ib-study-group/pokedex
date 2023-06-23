import { NavLink } from "react-router-dom";

import { TbPokeball } from "react-icons/tb";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import styles from "./Navigation.module.css";

type NavigationProps = {
  className?: string | undefined;
};

export const Navigation = ({ className }: NavigationProps) => {
  return (
    <nav className={`${className} ${styles.navbar}`}>
      {tabs.map((tab) => {
        return (
          <NavLink
            key={tab.text}
            to={tab.link}
            className={({ isActive, isPending }) =>
              isPending
                ? styles.navLinkPending
                : isActive
                ? styles.navLinkActive
                : styles.navLink
            }
          >
            {tab.icon}
            <span>{tab.text}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

const tabs = [
  {
    link: "/",
    text: "Pokedex",
    icon: <TbPokeball />,
  },
  {
    link: "/poke-reels",
    text: "PokeReels",
    icon: <MdOutlineSlowMotionVideo />,
  },
];
