import PayTaxDropdown from '../PayTaxDropdown/PayTaxDropdown';
import styles from './HeroSection.module.css';

export interface HeroSectionProps {
  onNavigate?: (path: string) => void;
}
export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className={styles.hero} aria-label="Main Banner">
      <div className={styles.heroOverlay}>
        <div className={styles.cardContainer}>
          <h1 className={styles.heading}>
            Enugu State Central <br /> Management System
          </h1>
          <p className={styles.subheading}>#TOMORROW IS HERE</p>

          <div className={styles.actionGrid}>
            <PayTaxDropdown onSelectOption={onNavigate} customClass={styles.heroDropdown} />

            <button type="button" className={styles.esbnBtn} aria-label="ESBN Options">
              ESBN ▾
            </button>

            <button type="button" className={styles.tinBtn} aria-label="Get TIN Options">
              Get TIN ▾
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}