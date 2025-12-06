

import { SearchBar } from "./SearchBar";
import { SearchSuggestions } from "./SearchSuggestions";
import { CategoryMenu } from "./CategoryMenu";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import './NavbarApp.css'

export const MobileNavbar = ({
  categories,
  search,
  userData,
}) => {
  return (
    <div className="d-lg-none">

      {/* Categorías + Buscador */}
      <div className="navbar-mobile-row-1 d-flex flex-column gap-3 mt-3">

        {/* Categorías */}
        <div className="nav-item dropdown w-100">
          <span className="nav-link fw-semibold dropdown-toggle custom-dropdown-toggle w-100">
            Categorías
          </span>
          <CategoryMenu categories={categories} mobile />
        </div>

        {/* Buscador */}
        <div className="position-relative w-100">
          <SearchBar
            searchText={search.searchText}
            setSearchText={search.setSearchText}
            onSubmit={search.handleSubmitSearch}
            onFocus={() => search.setIsFocused(true)}
          />

          <SearchSuggestions
            isFocused={search.isFocused}
            results={search.results}
            clearSearch={() => {
              search.setSearchText("");
              search.setResults?.([]);
              search.setIsFocused(false);
            }}
          />
        </div>
      </div>

      {/* Idioma / Cuenta / Carrito */}
      <div className="navbar-mobile-row-2 d-flex justify-content-between mt-4 px-1">

        <div className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle fw-semibold"
            data-bs-toggle="dropdown"
            role="button"
          >
            Idioma
          </span>
        <ul className="dropdown-menu custom-dropdown shadow">
          <li className="dropdown-item">ES</li>
          <li className="dropdown-item">EN</li>
        </ul>
        </div>

        <div className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle fw-semibold"
            data-bs-toggle="dropdown"
            role="button"
          >
            {userData.isAuthenticated ? userData.displayName : "Mi Cuenta"}
          </span>
          <AccountMenu {...userData} />
        </div>

        <CartButton />
      </div>
    </div>
  );
};


