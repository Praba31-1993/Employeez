export const SearchLogic = (arr: any[], search: string) => {
  const filteredRows = arr.filter((row: any) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
  return filteredRows;
};
