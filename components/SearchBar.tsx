// SearchBar.tsx
import React from "react";
import { TextInput, StyleSheet } from "react-native";

// Define the type for the props of the SearchBar component
interface SearchBarProps {
  query: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onSearch }) => {
  return (
    <TextInput
      style={styles.searchBar}
      value={query}
      onChangeText={onSearch}
      placeholder="Search here..."
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 16,
  },
});

export default SearchBar;
