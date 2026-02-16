import styles from "./YoutubeInsights.module.css";

export default function YouTubeInsights() {
  const videos = [
    {
      id: "Uts6GI7ggA4",
      params: "si=45xjDNjqcZAzNFvr",
      title: "Dubai Insight Video 1",
    },
    {
      id: "sPbMhp1xFSc",
      params: "si=iGkeSNSOALsQ7Z5C",
      title: "Dubai Insight Video 2",
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Dubai Real Estate Insights: Should You Invest Now or Wait?
      </h2>

      <div className={styles.grid}>
        {videos.map((v) => (
          <div key={v.id} className={styles.card}>
            <div className={styles.frame}>
              <iframe
                className={styles.iframe}
                src={`https://www.youtube.com/embed/${v.id}?${v.params}`}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        © 2026 Mohamad Kodmani. All rights reserved.
      </div>
    </section>
  );
}
