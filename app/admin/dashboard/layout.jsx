import Link from "next/link";
import LogoutButton from "../../../component/admin/LogoutButton";
import styles from "./dashboard.module.css";

export const metadata = {
  title: "Admin Dashboard | SK Healthcare",
  robots: { index: false, follow: false }, // keep admin pages out of search results
};

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>SK Healthcare</div>
        <nav className={styles.nav}>
          <Link href="/admin/dashboard">Appointments</Link>
          <Link href="/admin/dashboard/consultations">Consultations</Link>
          <Link href="/admin/dashboard/orders">Orders</Link>
          <Link href="/admin/dashboard/blogs">Blogs</Link>
          <Link href="/admin/dashboard/products">Products</Link>
        </nav>
        <LogoutButton className={styles.logoutBtn} />
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}