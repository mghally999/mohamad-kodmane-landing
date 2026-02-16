"use client";

import styles from "./page.module.css";
import SocialLinks from "@/app/components/SocialLinks";
import ConsultationForm from "@/app/components/ConsultationForm";
import YouTubeInsights from "@/app/components/YouTubeInsights";

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.banner} />

        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing}>
            <img
              src="/mr-mohamad-avatar.jpeg"
              alt="Mohamad Kodmani"
              className={styles.avatar}
            />
          </div>
        </div>
      </section>

      <section className={styles.profileSection}>
        <h1 className={styles.name}>
          Mohamad Kodmani <span className={styles.badge}>✓</span>
        </h1>

        <div className={styles.title}>
          CEO & Founder •{" "}
          <strong>Mohamad Kodmani Real Estate Brokers LLC</strong>
        </div>

        <SocialLinks />

        <div className={styles.metaRow}>
          <span>★ 11,353+ Followers</span>
          <span className={styles.dot} />
          <span>Dubai, United Arab Emirates</span>
        </div>

        {/* WEBSITE BANNER - NEW */}
        <div className={styles.websiteCard}>
          <div className={styles.cardGlow} />
          <div className={styles.cardContent}>
            <div className={styles.cardLeft}>
              <span className={styles.cardLabel}>Visit our website</span>
              <span className={styles.cardDomain}>mohamadkodmani.ae</span>
            </div>
            <a
              href="https://mohamadkodmani.ae"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              <span>Explore</span>
              <span className={styles.cardArrow}>→</span>
            </a>
          </div>
        </div>

        <div className={styles.card}>
          <ConsultationForm />
        </div>
      </section>

      <YouTubeInsights />
    </main>
  );
}
