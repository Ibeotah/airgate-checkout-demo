import styles from './NewsTicker.module.css';

export default function NewsTicker() {
  return (
    <section className={styles.tickerContainer} aria-label="News Updates">
      <div className={styles.label}>NEWS</div>
      <div className={styles.marquee}>
        <span className={styles.tickerText}>
          PLEDGES STRONGER REPRODUCTIVE, MATERNAL, NEONATAL HEALTH SERVICES &nbsp;&nbsp;•&nbsp;&nbsp;
          FG PLANS 24-HOUR POWER ZONES IN LAGOS, ABUJA-KANO, ENUGU-PH
        </span>
      </div>
    </section>
  );
}