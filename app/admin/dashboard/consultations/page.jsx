import connectDB from "@/lib/mongodb";
import Consultation from "@/models/Consultation";
import styles from "../dashboard.module.css";

async function getConsultations() {
  await connectDB();
  const consultations = await Consultation.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(consultations));
}

export default async function ConsultationsPage() {
  const consultations = await getConsultations();

  return (
    <div>
      <h1>Consultation Requests ({consultations.length})</h1>

      {consultations.length === 0 ? (
        <div className={styles.empty}>No consultation requests yet.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Contact</th>
              <th>Doctor Requested</th>
              <th>Concern</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {consultations.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  {c.email}
                  <br />
                  {c.phone}
                </td>
                <td>{c.doctor}</td>
                <td>{c.disease || "—"}</td>
                <td>{c.message || "—"}</td>
                <td>
                  <span className={styles.badge}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}