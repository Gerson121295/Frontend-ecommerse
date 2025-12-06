

import { SearchBar } from "./SearchBar";
import { SearchSuggestions } from "./SearchSuggestions";
import { CategoryMenu } from "./CategoryMenu";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import './NavbarApp.css'

export const DesktopNavbar = ({
  categories,
  search,
  userData,
}) => {
  return (
    <div className="d-none d-lg-flex navbar-desktop w-100 align-items-center">

      {/* Categorías */}
      <div className="nav-item dropdown me-3 position-relative">
        <a className="nav-link fw-semibold dropdown-toggle custom-dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          >
          Categorías
        </a>
        <CategoryMenu categories={categories} />
      </div>

      {/* Buscador */}
      <div className="position-relative flex-grow-1 mx-4" style={{ maxWidth: "450px" }}>
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

      <div className="nav-item dropdown me-3 position-relative">
        <a 
          className="nav-link fw-semibold dropdown-toggle custom-dropdown-toggle"
          href="#"
        >
          Idioma
        </a>

        <ul className="dropdown-menu custom-dropdown shadow">
          <li className="dropdown-item">ES</li>
          <li className="dropdown-item">EN</li>
        </ul>
      </div>

      {/* Cuenta */}
      <div className="nav-item dropdown me-3 position-relative custom-dropdown-toggle">
        <a
          className="nav-link dropdown-toggle fw-semibold"
          href="#"
        >
          {userData.isAuthenticated ? userData.displayName : "Mi Cuenta"}
        </a>
        {/* <AccountMenu {...userData} /> */}
        <AccountMenu {...userData} />
      </div>

      {/* Carrito */}
      <CartButton />
    </div>
  );
};



