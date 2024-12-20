interface SearchItemProps {
    id: number;
    name: string; // Use lowercase "string" instead of "String"
  }
  
  export const SearchLogic = (arr: SearchItemProps[], search: string) => {
    const filteredResults = arr.filter((item) => item.name.includes(search));
    return filteredResults
  };
  