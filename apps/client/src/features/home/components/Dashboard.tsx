import Styles from "./Dashboard.module.css";
export default function Dashboard() {
  return (
    <div className={Styles.container}>
      <img src="/shadow.svg" className={Styles.shadow} />
      <img src="/shadow.svg" className={Styles.shadow} />
      <img src="/dashboardPage.png" className={Styles.image} />
    </div>
  );
}
