import Link from "next/link";
import styles from "./about.module.css";

export const metadata = {
  title: "About SK Healthcare | Dr. S.K. Sachin, BAMS - Dharuhera, Haryana",
  description:
    "Learn about Dr. S.K. Sachin (BAMS), the doctor behind SK Healthcare in Dharuhera. 15+ years of confidential, non-surgical Ayurvedic care for piles, sexual health and skin conditions.",
  keywords: [
    "about SK Healthcare Dharuhera",
    "Dr S.K. Sachin BAMS",
    "ayurvedic doctor Dharuhera Rewari",
    "trusted ayurvedic clinic Haryana",
    "piles sexologist skin specialist Dharuhera",
  ],
  alternates: {
    canonical: "https://skhealthcare.org/about",
  },
  openGraph: {
    title: "About SK Healthcare | Dr. S.K. Sachin, BAMS",
    description:
      "The story, credentials and approach behind SK Healthcare's confidential Ayurvedic practice in Dharuhera, Haryana.",
    url: "https://skhealthcare.org/about",
    siteName: "SK Healthcare",
    locale: "en_IN",
    type: "profile",
  },
};

const faqs = [
  {
    q: "Is Dr. S.K. Sachin a registered Ayurvedic doctor?",
    a: "Yes. Dr. Sachin holds a BAMS degree and is registered to practice Ayurvedic medicine in India, allowing him to legally diagnose and treat patients using classical Ayurvedic methods.",
  },
  {
    q: "How long has SK Healthcare been operating in Dharuhera?",
    a: "The practice has been running in Dharuhera for more than 15 years, building its reputation largely through word of mouth among local families.",
  },
  {
    q: "Does the clinic only treat one type of condition?",
    a: "No. While piles and confidential sexual health concerns are among the most common reasons patients visit, the clinic also handles skin conditions and general Ayurvedic consultations.",
  },
  {
    q: "Can I speak to the doctor directly before booking?",
    a: "Most first-time queries are addressed during the consultation itself, where you can discuss your concern directly and openly with Dr. Sachin before agreeing on any treatment plan.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      url: "https://skhealthcare.org/about",
      name: "About SK Healthcare",
    },
    {
      "@type": "Physician",
      name: "Dr. S.K. Sachin",
      medicalSpecialty: ["Ayurveda", "Proctology", "Dermatology", "Sexology"],
      worksFor: {
        "@type": "MedicalClinic",
        name: "SK Healthcare",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dharuhera",
          addressRegion: "Haryana",
          postalCode: "123106",
          addressCountry: "IN",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container + " " + styles.heroGrid}>
          <div className={styles.heroContent}>
            <span className={styles.tag}>About Us</span>
            <h1>
              The Practice Behind
              <span> SK Healthcare</span>
            </h1>
            <p>
              For more than fifteen years, families across Dharuhera and the surrounding
              Rewari belt have turned to Dr. S.K. Sachin for private, straightforward care —
              long before "SK Healthcare" became a name people searched for online.
            </p>
          </div>
          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=700&q=80"
              alt="Dr. S.K. Sachin at SK Healthcare clinic in Dharuhera"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true">
        <svg viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 12 C 40 2, 60 22, 100 12 S 160 2, 200 12 S 260 22, 300 12 S 360 2, 400 12"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Our Story */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid}>
          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>Our Story</span>
            <h2>How It Started</h2>
            <p>
              Dharuhera in the early 2010s was still a small industrial town along the
              Delhi-Jaipur stretch, with most residents travelling to Rewari or Gurugram for
              anything beyond routine care. Dr. Sachin began seeing patients locally at a time
              when there were few options nearby for conditions people were reluctant to discuss
              openly — piles, skin complaints, and sexual health concerns among them.
            </p>
            <p>
              What began as a small, single-room practice grew mostly through referrals — one
              patient telling a neighbour, a factory worker mentioning it to a colleague. That
              slow, trust-based growth is still how most new patients find their way to the
              clinic today, even with a website now in place.
            </p>
            <p>
              Over the years, the clinic has expanded its focus beyond piles alone to cover skin
              conditions and confidential sexual health concerns, largely because patients kept
              asking whether the same doctor could help with those issues too. Rather than
              turning people away, Dr. Sachin took the time to build genuine expertise in these
              additional areas, which is why the practice today handles a broader range of
              concerns than when it first opened.
            </p>
          </div>
          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1550831107-1553da8c8464?w=650&q=80"
              alt="SK Healthcare clinic reception in Dharuhera"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid + " " + styles.infoGridReverse}>
          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>Training &amp; Credentials</span>
            <h2>What Being a BAMS Doctor Actually Means</h2>
            <p>
              Dr. Sachin's degree took five and a half years to complete, combining classroom
              study of classical texts with clinical training and a full year of hospital
              internship — a path that anyone curious about the qualification can read about in
              more depth on the page covering the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ayurveda"
                target="_blank"
                rel="noopener noreferrer"
              >
                history and principles behind this branch of Indian medicine
              </a>
              . It's a full professional degree recognised by India's regulatory bodies, not a
              short-course certification.
            </p>
            <p>
              Beyond the degree itself, ongoing practice matters just as much. Fifteen years of
              seeing patients week after week — adjusting an approach when something isn't
              working, learning which lifestyle habits actually stick for factory workers versus
              farmers versus office staff — is not something a certificate alone can teach. It's
              this accumulated, local experience that shapes how consultations are run at{" "}
              <Link href="/">SK Healthcare</Link> today.
            </p>
          </div>
          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=650&q=80"
              alt="Ayurvedic doctor reviewing patient notes"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true">
        <svg viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 12 C 40 22, 60 2, 100 12 S 160 22, 200 12 S 260 2, 300 12 S 360 22, 400 12"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Philosophy */}
      <section className={styles.why}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Our Approach</span>
          <h2>Treating the Cause, Not Just the Symptom</h2>
          <p className={styles.whyIntro}>
            A patient rarely walks in with just one problem — poor sleep, stress, an irregular
            diet and a physical complaint tend to arrive together. Rather than prescribing
            something quick and sending a patient home, the first goal of any visit is
            understanding what's actually driving the condition.
          </p>

          <div className={styles.whyGrid}>
            <div>
              <h3>Listen First</h3>
              <p>Every visit starts with an unhurried conversation, not a rushed diagnosis.</p>
            </div>
            <div>
              <h3>Explain Clearly</h3>
              <p>Patients are told what's happening in plain terms, not left guessing.</p>
            </div>
            <div>
              <h3>Treat the Root</h3>
              <p>Diet and lifestyle changes are part of the plan, not an afterthought.</p>
            </div>
            <div>
              <h3>Respect Privacy</h3>
              <p>Sensitive concerns are handled with the same discretion every single time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What we treat recap */}
      <section className={styles.services}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>In Practice</span>
          <h2>Where This Approach Applies</h2>
          <p className={styles.sectionIntro}>
            This philosophy carries through every condition seen at the clinic — whether it's a
            first-time piles consultation, an ongoing skin issue, or a sensitive concern that a
            patient has been putting off discussing for years. A closer look at each of these is
            covered on the{" "}
            <Link href="/treatment">page describing individual treatments</Link>, and appointments
            can be arranged through the <Link href="/consultation">booking page</Link>.
          </p>
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true">
        <svg viewBox="0 0 400 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 12 C 40 2, 60 22, 100 12 S 160 2, 200 12 S 260 22, 300 12 S 360 2, 400 12"
            fill="none"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* First visit */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid}>
          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>Before You Arrive</span>
            <h2>What a First Visit Usually Looks Like</h2>
            <p>
              Most people aren't sure what to expect walking in for the first time, especially
              for a concern they've never discussed with a doctor before. Typically, the visit
              starts with a conversation — symptoms, how long they've been going on, daily
              routine, diet, and anything that seems to make things better or worse. Only after
              that does a physical examination happen, and only where it's actually relevant to
              the concern raised.
            </p>
            <p>
              By the end of the session, most patients leave with a clear explanation of what's
              likely going on, a written or verbal plan for treatment, and a rough sense of when
              to expect improvement or a follow-up visit. There's rarely a need to decide
              anything on the spot — questions are welcomed throughout, and a second visit is
              always an option if something isn't clear.
            </p>
          </div>
          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=650&q=80"
              alt="Doctor explaining a treatment plan to a patient"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Community */}
      <section className={styles.local}>
        <div className={styles.container}>
          <h2>Part of the Dharuhera Community</h2>
          <p>
            Being based in a smaller town rather than a big city has shaped how the practice
            runs — patients are often known by name, follow-up visits are informal, and word
            travels fast when something works, or when it doesn't. That kind of accountability
            is hard to replicate in a large city hospital, and it's part of why so many patients
            from Rewari, Bawal, and Bhiwadi choose to make the trip to Dharuhera instead of
            seeking care closer to home.
          </p>
          <p>
            For patients wanting a broader sense of common concerns and questions before their
            first visit, the clinic's <Link href="/blogs">write-ups on everyday health topics</Link> are
            a reasonable starting point, and general wellness products are available through the{" "}
            <Link href="/store">clinic's own catalogue</Link>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Common Questions</span>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqs.map((item, i) => (
              <details className={styles.faqItem} key={i}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Have a Concern You've Been Putting Off?</h2>
          <p>Talk to Dr. Sachin directly, in confidence, at a time that works for you.</p>
          <Link href="/Consultation" className={styles.btnPrimary}>
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}