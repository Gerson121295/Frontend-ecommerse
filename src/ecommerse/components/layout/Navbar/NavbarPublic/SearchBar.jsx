

export const SearchBar = ({
  searchText,
  setSearchText,
  onSubmit,
  onFocus,
  className = "",
}) => {
  return (
    <input
      className={`form-control contorno-campo-morado ${className}`}
      placeholder="Buscar productos..."
      value={searchText}
      onFocus={onFocus}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSubmit()}
     
    />
  );
};
