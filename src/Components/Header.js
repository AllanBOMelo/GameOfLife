import styles from './Header.module.css';

function Header () {
    return (
        <div className={styles.headerContainer}>
            <h2>Game of Life</h2>
        </div>
    );
};

export default Header;