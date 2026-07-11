import Style from "./spinner.module.css";
export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className={Style.loader} />
    </div>
  );
}
