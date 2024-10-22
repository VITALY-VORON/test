'use client'

import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/UI";
import i1 from "./1.svg";
import i2 from "./2.svg";
import i3 from "./3.svg";
import i4 from "./4.svg";
import { type TCartItem } from "@/utils/cart.type";
import { useEffect, useState } from "react";
import styles from "./cart.module.scss";

const imageMap: { [key: number]: StaticImageData } = {
  1: i1,
  2: i2,
  3: i3,
  4: i4,
};

type CartProps = TCartItem & {
  isSelected: boolean;
  onSelect: () => void;
};

export const Cart: React.FC<CartProps> = ({ blocksCount, title, description, isSelected, onSelect }) => {
  const [image, setImage] = useState<StaticImageData>(i1);

  useEffect(() => {
    const newImage = blocksCount > 4 ? i4 : imageMap[blocksCount] || i1;
    if (newImage !== image) {
      setImage(newImage);
    }
  }, [blocksCount, image]);

  return (
    <div className={`${styles.wrapper} ${isSelected ? styles.selected : ""}`}>
      <div className={styles.leftContent}>
        <Image src={image} alt={`blocksCount: ${blocksCount}`} />
        <span>{blocksCount} block</span>
      </div>
      <div className={styles.mainContent}>
        <h2 className={styles.title}>{title}</h2>
        <h3 className={styles.description}>{description}</h3>
      </div>
      <CartActions isSelected={isSelected} onSelect={onSelect} />
    </div>
  );
};

type CartActionsProps = {
  isSelected: boolean;
  onSelect: () => void;
};

const CartActions: React.FC<CartActionsProps> = ({ isSelected, onSelect }) => (
  <div className={styles.rightContent}>
    <Button>Details</Button>
    <Button
      onClick={onSelect}
      className={isSelected ? "bg-[#6E42CA] text-white" : ""}
    >
      {isSelected ? "Skip Selection" : "Mark as Suitable"}
    </Button>
  </div>
);
