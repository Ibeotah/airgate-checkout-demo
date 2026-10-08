import PayTaxDropdown from '../PayTaxDropdown/PayTaxDropdown';
import styles from './Navbar.module.css';

export interface NavbarProps {
  onNavigate?: (path: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.navContainer} aria-label="Main Navigation">
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className={styles.esirsBadge} aria-label="ESIRS Logo Placeholder">
            <span className={styles.badgeText}>eSIRS</span>
          </div>
        </div>

        {/* Links Navigation */}
        <ul className={styles.navLinks}>
          <li><a href="#home" className={styles.activeLink}>Home</a></li>
          <li><a href="#esbn">ESBN ▾</a></li>
          <li><a href="#pis">PIS</a></li>
          <li><a href="#filing">Individual Filing</a></li>
          <li><a href="#cms">Login to EnuguCMS</a></li>
          <li><a href="#calculator">Tax Calculator</a></li>
          <li><a href="#info">Tax Information ▾</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#news">News</a></li>
        </ul>

        {/* Dropdown in Nav Header */}
        <div className={styles.navRight}>
          <PayTaxDropdown onSelectOption={onNavigate} />
        </div>
      </nav>
    </header>
  );
}