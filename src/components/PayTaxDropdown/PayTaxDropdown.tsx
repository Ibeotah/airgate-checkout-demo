import { useState, useRef, useEffect } from 'react';
import styles from './PayTaxDropdown.module.css';
import airgateLogo from '../../assets/airgateLogo.svg'
export interface PayTaxDropdownProps {
  onSelectOption?: (path: string) => void;
  customClass?: string;
}

export default function PayTaxDropdown({
  onSelectOption,
  customClass,
}: PayTaxDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (path: string) => {
    setIsOpen(false);
    onSelectOption?.(path);
  };

  return (
    <div
      className={`${styles.dropdownContainer} ${customClass || ''}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={styles.dropdownTrigger}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Pay Tax options menu"
      >
        <span>Pay Tax with</span>
        <span className={styles.arrow} aria-hidden="true">
          {isOpen ? '▴' : '▾'}
        </span>
      </button>

      {isOpen && (
        <ul
          className={styles.dropdownMenu}
          role="menu"
          aria-label="Tax Payment Providers"
        >
          {/* Active Airgate Provider Option */}
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={styles.dropdownItem}
              onClick={() => handleOptionClick('/pay/airgate')}
              aria-label="Pay tax with Airgate"
            >
              <img src={airgateLogo} alt='Airgate' height={24}/>
              
              
            </button>
          </li>

          {/* Commented out other providers as requested */}
          {/*
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={styles.dropdownItem}
              onClick={() => handleOptionClick('/pay/flutterwave')}
            >
              <span className={styles.providerIcon}>🦋</span>
              <span>Flutterwave</span>
            </button>
          </li>
          */}
        </ul>
      )}
    </div>
  );
}