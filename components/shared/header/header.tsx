import { Input } from "@/components/UI";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Input placeholder="PASTE YOUR FULLNAME" />
    </div>
  );
};
