import { useState } from 'react';
import styles from './TopAnnouncementBar.module.css';

export default function TopAnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside className={styles.banner} aria-label="Important Announcement">
      <div className={styles.content}>
        <span>Tax Identification Number (TIN) is compulsory for ESBN registration. Obtain below.</span>
      </div>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => setVisible(false)}
        aria-label="Close Announcement"
      >
        ✕
      </button>
    </aside>
  );
}