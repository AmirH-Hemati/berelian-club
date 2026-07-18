import Styles from "./Dashboard.module.css";
import shadow from "@/../public/shadow.svg";
import dashboardPage from "@/../public/dashboard.png";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div className={Styles.container}>
      <Image src={shadow} className={Styles.shadow} alt="shadow" />
      <Image src={shadow} className={Styles.shadow} alt="shadow" />
      <Image
        src={dashboardPage}
        className={Styles.image}
        alt="dashboard page"
      />
    </div>
  );
}
