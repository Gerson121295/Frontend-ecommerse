
// components/SearchBar.jsx
export const SearchBar = ({ searchText, setSearchText, onSubmit, onFocus }) => (
  <input
    className="form-control contorno-campo-morado"
    placeholder="Buscar productos..."
    value={searchText}
    onFocus={onFocus}
    onChange={(e) => setSearchText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
  />
);

