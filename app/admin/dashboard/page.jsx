import connectDB from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import styles from "./dashboard.module.css";

// Server Component: fetch directly from the DB, no API round-trip needed
async function getAppointments() {
  await connectDB();
  const appointments = await Appointment.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(appointments)); // strip Mongo-specific objects for client rendering
}

export default async function AppointmentsPage() {
  const appointments = await getAppointments();

  return (
    <div>
      <h1>Appointments ({appointments.length})</h1>

      {appointments.length === 0 ? (
        <div className={styles.empty}>No appointments booked yet.</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Contact</th>
              <th>Date &amp; Time</th>
              <th>Location</th>
              <th>Concern</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.name}</td>
                <td>
                  {a.email}
                  <br />
                  {a.phone}
                </td>
                <td>
                  {a.date}
                  <br />
                  {a.time}
                </td>
                <td>
                  {a.city}, {a.state}
                </td>
                <td>{a.disease}</td>
                <td>
                  <span className={styles.badge}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}