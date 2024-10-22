"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Cart } from "@/components/shared/cart";
import { Header } from "@/components/shared/header";
import { Input, Button } from "@/components/UI";
import { fetchCartData, useAppDispatch, useAppSelector } from "@/store";
import { filterItems, toggleSelectItem, debounce } from "@/utils";
import styles from "./list.module.scss";

export const List = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearchQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const isLoading = useAppSelector((state) => state.cart.loading);
  const error = useAppSelector((state) => state.cart.error);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCartData());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setSearchQuery(currentQuery);
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debounceUpdateQuery(value);
  };

  const debounceUpdateQuery = useCallback(
    debounce((value: string) => {
      const newParams = new URLSearchParams();
      if (value) {
        newParams.set("query", value);
      } else {
        newParams.delete("query");
      }

      router.push(`/search?${newParams.toString()}`);
    }, 1000),
    [router]
  );

  const filteredItems = filterItems(cartItems, searchQuery);
  const displayedItems = showSelectedOnly
    ? filteredItems.filter((item) => selectedItems.includes(item.id))
    : filteredItems;

  const handleToggleSelectItem = (id: string) => {
    setSelectedItems((prev) => toggleSelectItem(id, prev));
  };

  const renderCartItems = () => {
    if (displayedItems.length === 0) {
      return <div className="text-white">No items found</div>;
    }

    return displayedItems.map((item) => (
      <Cart
        key={item.id}
        {...item}
        isSelected={selectedItems.includes(item.id)}
        onSelect={() => handleToggleSelectItem(item.id)}
      />
    ));
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.search}>
        <Input
          placeholder="Search by operation or DeFi company name"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <div className={styles.searchParam}>
          <Button onClick={() => setShowSelectedOnly(false)}>All</Button>
          <Button onClick={() => setShowSelectedOnly(true)}>Selected</Button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        renderCartItems()
      )}
    </div>
  );
};
