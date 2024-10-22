export function toggleSelectItem(
    id: string,
    selectedItems: string[]
  ): string[] {
    return selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
  }
  