import { Navigation } from "../Navigation/Navigation";

import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
  className: string | undefined;
};

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <main className={`${styles.main} ${className}`}>{children}</main>
      <Navigation className={styles.navigation} />
    </div>
  );
};
