import { cn } from "@repo/ui";
import Styles from "./detail.module.css";
import { DetailType } from "./data/details";

interface DetailProps {
  detail: DetailType;
  isActive: boolean;
  onClick?: () => void;
}

export default function Detail({ detail, isActive, onClick }: DetailProps) {
  return (
    <li
      className={cn(Styles.details, isActive && Styles.active)}
      onClick={onClick}
    >
      <div className={Styles.indicator} />

      <div className={Styles.content}>
        <h3 className={Styles.title}>{detail.title}</h3>
        <p className={Styles.description}>{detail.description}</p>

        {detail.tags && detail.tags.length > 0 && (
          <ul className={Styles.tags}>
            {detail.tags.map((tag) => (
              <li key={tag} className={Styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
