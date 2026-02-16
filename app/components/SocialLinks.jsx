"use client";

import styles from "./SocialLinks.module.css";
import { Instagram, Youtube, Linkedin, Facebook } from "lucide-react";

export default function SocialLinks() {
  const links = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/mkrealestate-ae/",
      Icon: Linkedin,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mohamadkodmane/",
      Icon: Instagram,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/mo.kodmane",
      Icon: Facebook,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@Mohamad.Kodmane",
      Icon: Youtube,
    },
  ];

  return (
    <div className={styles.socialRow}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          className={styles.socialBtn}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
