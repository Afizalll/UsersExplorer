import React from "react";

interface FiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  cityOptions: string[];
  companyOptions: string[];
  selectedCity: string;
  selectedCompany: string;
  onCityChange: (v: string) => void;
  onCompanyChange: (v: string) => void;
  onClear: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  search,
  onSearchChange,
  cityOptions,
  companyOptions,
  selectedCity,
  selectedCompany,
  onCityChange,
  onCompanyChange,
  onClear,
}) => {
  return (
    <section className="filters">
      <div className="filter-row">
        <input
          aria-label="Search by name"
          type="search"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-search"
        />

        <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)} aria-label="Filter by city">
          <option value="">All cities</option>
          {cityOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={selectedCompany} onChange={(e) => onCompanyChange(e.target.value)} aria-label="Filter by company">
          <option value="">All companies</option>
          {companyOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button className="btn-clear" onClick={onClear} aria-label="Clear filters">Clear all</button>
      </div>
    </section>
  );
};

export default Filters;
