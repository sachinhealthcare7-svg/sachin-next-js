import "./treatment.css";
import Link from "next/link";

const treatments = [
  {
    id: 1,
    title: "Diabetes Management",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900",
    desc:
      "Diabetes is a long-term condition that affects how your body uses blood sugar. At SK Healthcare, we provide complete diabetes care including diagnosis, blood sugar monitoring, medication, diet planning, exercise guidance, and regular follow-ups to keep your diabetes under control.",
  },
  {
    id: 2,
    title: "Hypertension (High Blood Pressure)",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=900",
    desc:
      "High blood pressure increases the risk of heart attack and stroke. Our specialists offer advanced diagnosis, blood pressure monitoring, medication management, nutrition counseling, and lifestyle modifications for long-term heart health.",
  },
  {
    id: 3,
    title: "Thyroid Disorders",
    image:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?w=900",
    desc:
      "We diagnose and treat hypothyroidism, hyperthyroidism, thyroid nodules, and other hormonal disorders with advanced laboratory testing, medication, and continuous monitoring for better health.",
  },
  {
    id: 4,
    title: "Heart Disease",
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900",
    desc:
      "Our cardiology services include ECG, cholesterol management, preventive heart care, cardiac consultation, and treatment plans to reduce cardiovascular risks and improve heart function.",
  },
  {
    id: 5,
    title: "Asthma & Respiratory Care",
    image:
      "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=900",
    desc:
      "We provide complete treatment for asthma, allergies, chronic cough, breathing disorders, and respiratory infections using evidence-based medical practices and advanced care.",
  },
  {
    id: 6,
    title: "Joint Pain & Arthritis",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=900",
    desc:
      "Our orthopedic experts help patients suffering from arthritis, knee pain, back pain, frozen shoulder, and joint stiffness through medications, rehabilitation, and physiotherapy guidance.",
  },
  {
    id: 7,
    title: "Digestive Disorders",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900",
    desc:
      "Treatment for acidity, constipation, gastric ulcers, IBS, liver disorders, and digestive health problems with personalized care, dietary advice, and modern diagnostic techniques.",
  },
];

export default function TreatmentPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="treatmentHero">
        <div className="container">
          <h4>SK Healthcare</h4>
          <h1>Our Medical Treatments</h1>
          <p>
            We provide comprehensive healthcare services with experienced
            doctors, modern medical technology, and personalized treatment
            plans for every patient.
          </p>
        </div>
      </section>

      {/* Treatment List */}
      <section className="treatmentSection">
        <div className="container">

          {treatments.map((item, index) => (
            <div
              key={item.id}
              className={`treatmentCard ${
                index % 2 !== 0 ? "reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="treatmentImage">
                <img src={item.image} alt={item.title} />
              </div>

              {/* Content */}
              <div className="treatmentContent">
                <span className="count">
                  {String(item.id).padStart(2, "0")}
                </span>

                <h2>{item.title}</h2>

                <p>{item.desc}</p>

                <div className="btnGroup">
                  <Link href="/appointment" className="bookBtn">
                    Book Appointment
                  </Link>

                  <Link href="/contact" className="contactBtn">
                    Contact Doctor
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="ctaSection">
        <div className="container">
          <h2>Your Health Deserves the Best Care</h2>

          <p>
            Schedule your consultation with our experienced healthcare experts
            and receive personalized treatment today.
          </p>

          <Link href="/appointment" className="ctaBtn">
            Book Appointment Now
          </Link>
        </div>
      </section>
    </>
  );
}