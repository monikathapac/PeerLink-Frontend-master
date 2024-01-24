import { AiOutlineCloseSquare } from "react-icons/ai";
import styles from "styles/Popup.module.css";

type Props = {
  children?: any;
  title: string;
  onClose: any;
  visibility: boolean;
};

export function PopUp({ children, title, onClose, visibility }: Props) {
  return (
    <div className={visibility ? styles.modal : styles.hidden}>
      <div className={styles.content}>
        <div className={styles.close} onClick={onClose}>
          <AiOutlineCloseSquare size={20} />
        </div>
        <div className={styles.header}>{title}</div>
        <div className={styles.items}>{children}</div>
      </div>
    </div>
  );
}

type bProps = {
  children?: any;
};

export function PopUpButtons({ children }: bProps) {
  return <div className={styles.footer}>{children}</div>;
}

type bbProps = {
  type: "Submit" | "Cancel";
  onClick: any;
  children: any;
};
export function Button({ children, type, onClick }: bbProps) {
  return (
    <div
      className={type == "Cancel" ? styles.cButton : styles.sButton}
      onClick={onClick}
    >
      <div style={{ display: "flex", flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}
