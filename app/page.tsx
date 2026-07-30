import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Best Piles Doctor & Ayurvedic Sexologist in Dharuhera | SK Healthcare",
  description:
    "SK Healthcare (Dr. S.K. Sachin, BAMS) offers confidential Ayurvedic treatment for piles, sexual health concerns, skin disorders and gupt rog in Dharuhera, Rewari. 15+ years experience. Book a private consultation today.",
  keywords: [
    "best piles doctor in Dharuhera",
    "ayurvedic sexologist Dharuhera",
    "skin specialist Dharuhera Rewari",
    "gupt rog clinic Dharuhera",
    "piles treatment without surgery Haryana",
    "confidential sexologist near me",
    "SK Healthcare Dharuhera",
  ],
  alternates: {
    canonical: "https://skhealthcare.org/",
  },
  openGraph: {
    title: "Best Piles Doctor & Ayurvedic Sexologist in Dharuhera | SK Healthcare",
    description:
      "Confidential Ayurvedic care for piles, sexual health, skin disorders and gupt rog in Dharuhera, Haryana. 15+ years of trusted, non-surgical treatment.",
    url: "https://skhealthcare.org/",
    siteName: "SK Healthcare",
    locale: "en_IN",
    type: "website",
  },
};

const faqs = [
  {
    q: "Is piles (bawasir) treatment possible without surgery?",
    a: "Yes. Early and moderate-stage piles often respond well to Ayurvedic medicines, dietary changes and lifestyle correction. Surgery is generally considered only for advanced cases that don't improve with conservative care — your doctor will advise what's appropriate after an examination.",
  },
  {
    q: "Are sexual health consultations kept confidential?",
    a: "Yes. Consultations for sexual health and gupt rog concerns are conducted privately, one-on-one, with no judgement. Your history and records are treated as strictly confidential.",
  },
  {
    q: "How long does Ayurvedic treatment usually take to show results?",
    a: "This varies by condition, its stage, and how consistently a patient follows the prescribed routine. Some patients notice relief within a few weeks, while chronic conditions may need a longer, structured course. Individual results vary.",
  },
  {
    q: "Do I need to visit in person, or is online consultation available?",
    a: "Both options are available. Many patients prefer an in-person visit for a physical examination, but follow-up consultations can often be handled online or over the phone for convenience.",
  },
  {
    q: "Which areas does SK Healthcare serve?",
    a: "The clinic is based in Dharuhera and regularly sees patients from Rewari, Bawal, Bhiwadi, Kasola, and other nearby parts of Haryana and the NCR belt.",
  },
  {
    q: "What should I expect at my first visit?",
    a: "The first consultation typically involves a detailed discussion of your symptoms, medical history, diet and lifestyle, followed by a physical examination where relevant. Based on this, Dr. Sachin will explain the likely cause and recommend a course of treatment, including any follow-up visits needed.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      name: "SK Healthcare - Dr. S.K. Sachin Health Care",
      image: "https://skhealthcare.org/og-image.jpg",
      url: "https://skhealthcare.org/",
      telephone: "+91-7500009985",
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dharuhera",
        addressRegion: "Haryana",
        postalCode: "123106",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.2054,
        longitude: 76.7979,
      },
      medicalSpecialty: ["Ayurvedic Medicine", "Proctology", "Dermatology", "Sexology"],
      areaServed: ["Dharuhera", "Rewari", "Bawal", "Bhiwadi"],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ],
};

export default function Home() {
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
            <span className={styles.tag}>Trusted Ayurvedic Care in Dharuhera Since 2011</span>

            <h1>
              Confidential, Non-Surgical Ayurvedic Care
              <span> for Piles, Skin &amp; Sexual Health</span>
            </h1>

            <p>
              SK Healthcare is led by Dr. S.K. Sachin (B.A.M.S), offering over 15 years of
              experience treating piles, skin disorders, and sensitive sexual health concerns
              for patients across Dharuhera, Rewari, and the wider Haryana NCR belt. Every
              consultation is private, judgement-free, and tailored to the individual.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/consultation" className={styles.btnPrimary}>
                Book a Private Consultation
              </Link>
              <Link href="/treatment" className={styles.btnSecondary}>
                Explore Treatments
              </Link>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80"
              alt="Ayurvedic doctor consulting a patient at SK Healthcare Dharuhera"
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

      {/* Services */}
      <section className={styles.services}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>What We Treat</span>
          <h2>Our Healthcare Services</h2>
          <p className={styles.sectionIntro}>
            Every treatment plan at SK Healthcare begins with a detailed, private consultation.
            We combine classical Ayurvedic principles with practical, modern patient care —
            explained more on our{" "}
            <Link href="/treatment">treatments page</Link>.
          </p>

          <div className={styles.serviceGrid}>
            <div className={styles.card}>
              <h3>Piles (Bawasir) Treatment</h3>
              <p>
                Non-surgical Ayurvedic management for bleeding and non-bleeding hemorrhoids,
                focused on reducing pain, swelling, and recurrence through medicine and diet.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Confidential Sexual Health Consultation</h3>
              <p>
                Private, respectful consultations for men and women dealing with sexual health
                concerns, conducted one-on-one with complete discretion.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Skin Care &amp; Dermatology</h3>
              <p>
                Ayurvedic assessment and treatment for chronic skin conditions, aiming at the
                underlying cause rather than symptoms alone.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Gupt Rog &amp; General Ayurvedic Care</h3>
              <p>
                Confidential consultation for gupt rog and other sensitive health concerns,
                alongside general Ayurvedic guidance for long-term wellness.
              </p>
            </div>
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

      {/* About the doctor */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid}>
          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=650&q=80"
              alt="Dr. S.K. Sachin consulting a patient at SK Healthcare clinic in Dharuhera"
              loading="lazy"
            />
          </div>

          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>About the Doctor</span>
            <h2>Meet Dr. S.K. Sachin (B.A.M.S)</h2>
            <p>
              Dr. S.K. Sachin has practiced Ayurvedic medicine in Dharuhera for more than 15
              years, building a reputation among local families for careful diagnosis and
              straightforward, non-surgical treatment. His approach draws on classical{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ayurveda"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
              >
                Ayurveda
              </a>{" "}
              texts, adapted to the everyday realities of patients working in factories,
              logistics, farming, and small businesses across the Rewari-Dharuhera belt.
            </p>
            <p>
              Rather than treating symptoms in isolation, consultations focus on identifying the
              underlying cause of a condition — whether that's diet, lifestyle, stress, or an
              untreated chronic issue — before recommending a course of action. Patients are
              also given clear, practical guidance on diet and daily habits that support
              recovery, since Ayurvedic treatment tends to work best alongside consistent
              lifestyle changes rather than medicine alone. Learn more about the clinic's
              background on the <Link href="/about">about page</Link>.
            </p>
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

      {/* Understanding Piles */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid}>
          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=650&q=80"
              alt="Ayurvedic herbs and natural ingredients used in piles treatment"
              loading="lazy"
            />
          </div>

          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>Understanding the Condition</span>
            <h2>What Causes Piles, and Why Early Care Matters</h2>
            <p>
              Piles, medically known as{" "}
              <a
                href="https://en.wikipedia.org/wiki/Hemorrhoid"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
              >
                hemorrhoids
              </a>
              , are swollen blood vessels around the anus and lower rectum. They're commonly
              linked to chronic constipation, prolonged sitting, low-fiber diets, pregnancy,
              and straining during bowel movements. Left unaddressed, mild piles can progress
              to more painful, bleeding stages that are harder to manage conservatively.
            </p>
            <p>
              At SK Healthcare, treatment begins with understanding the stage and root cause of
              the condition before recommending a course of Ayurvedic medicine, dietary
              correction, and simple lifestyle changes — with surgery considered only when
              conservative care isn't enough. Read more about our approach on the{" "}
              <Link href="/treatment">treatment page</Link>.
            </p>
            <p>
              Common early symptoms include mild bleeding during bowel movements, itching, and
              discomfort while sitting for long periods — all easy to overlook or dismiss until
              they worsen. Patients who work long shifts, drive for a living, or sit at a desk
              all day are especially prone to recurring flare-ups. Getting an evaluation as soon
              as symptoms appear, rather than waiting, generally makes non-surgical management
              far more effective.
            </p>
          </div>
        </div>
      </section>

      {/* Confidential care */}
      <section className={styles.info}>
        <div className={styles.container + " " + styles.infoGrid + " " + styles.infoGridReverse}>
          <div className={styles.infoContent}>
            <span className={styles.eyebrow}>Privacy First</span>
            <h2>Judgement-Free Care for Sensitive Health Concerns</h2>
            <p>
              Sexual health and gupt rog concerns are common, yet many patients hesitate to seek
              help due to social stigma. SK Healthcare's approach draws on traditional{" "}
              <a
                href="https://en.wikipedia.org/wiki/Ayurveda"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
              >
                Ayurveda
              </a>{" "}
              principles alongside straightforward counselling, so patients can discuss
              concerns like low libido, early discharge, or general sexual wellness openly and
              without embarrassment.
            </p>
            <p>
              Consultations are conducted privately, records are kept confidential, and
              treatment plans are personalised to the patient's history and lifestyle. Book a
              private session through our{" "}
              <Link href="/consultation">consultation page</Link>.
            </p>
            <p>
              Many patients delay seeking help for months or years, often due to
              misinformation found online or discomfort discussing the topic with a general
              physician. A dedicated, private setting — where questions can be asked plainly
              and without rush — tends to make a meaningful difference in how comfortable
              patients feel following through with treatment.
            </p>
          </div>

          <div className={styles.infoImage}>
            <img
              src="https://images.unsplash.com/photo-1550831107-1553da8c8464?w=650&q=80"
              alt="Private consultation room at an Ayurvedic clinic"
              loading="lazy"
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

      {/* Why Choose */}
      <section className={styles.why}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>Why Patients Choose Us</span>
          <h2>Why Choose SK Healthcare?</h2>
          <p className={styles.whyIntro}>
            Choosing a clinic for piles, skin, or sexual health concerns is a personal decision,
            often shaped as much by trust and comfort as by clinical expertise. Here's what
            patients consistently mention when asked why they continue to choose SK Healthcare
            over other options in the region.
          </p>

          <div className={styles.whyGrid}>
            <div>
              <h3>15+ Years of Experience</h3>
              <p>Dr. S.K. Sachin (B.A.M.S) has treated patients across Dharuhera and Rewari since 2011.</p>
            </div>

            <div>
              <h3>Complete Confidentiality</h3>
              <p>Private consultation rooms and strict discretion for sensitive health concerns.</p>
            </div>

            <div>
              <h3>Non-Surgical, Natural Approach</h3>
              <p>Ayurvedic medicine and lifestyle correction as the first line of treatment.</p>
            </div>

            <div>
              <h3>Accessible &amp; Local</h3>
              <p>Easy to reach from Dharuhera, Rewari, Bawal, Bhiwadi, and Model Town.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ - AEO/GEO friendly */}
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

      {/* Local area */}
      <section className={styles.local}>
        <div className={styles.container}>
          <h2>Serving Dharuhera &amp; Nearby Areas</h2>
          <p>
            SK Healthcare is based in Dharuhera, Haryana, and regularly sees patients travelling
            from Rewari, Bawal, Bhiwadi, Kasola, and Model Town for confidential piles, skin,
            and sexual health care. Being close to the Delhi-Jaipur highway, the clinic is
            easily reachable for patients commuting from nearby industrial areas and townships,
            many of whom prefer a local, familiar clinic over travelling into Delhi or Gurugram
            for the same concerns.
          </p>
          <p>
            If you're searching for a trusted local clinic for these concerns, our{" "}
            <Link href="/about">about page</Link> has more on Dr. Sachin's background and
            approach, our <Link href="/treatment">treatment page</Link> breaks down each
            condition we manage in detail, and our <Link href="/blogs">blog</Link> covers common
            patient questions in more depth. You can also browse ayurvedic products through our{" "}
            <Link href="/store">store</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Need Medical Assistance?</h2>
          <p>Book your appointment today and consult with our healthcare experts in complete confidence.</p>
          <Link href="/consultation" className={styles.btnPrimary}>
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}