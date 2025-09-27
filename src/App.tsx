import React, { useEffect, useMemo, useState } from "react";
import { User } from "./types";
import UserCard from "./components/UserCard";
import Filters from "./components/Filters";

/**
 * Main App
 * - Fetch users from JSONPlaceholder
 * - Show loading / error states
 * - Provide real-time search, filter by city & company, clear filters
 */

const DATA_URL = "https://jsonplaceholder.typicode.com/users";

function useUsers() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(DATA_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((json: User[]) => {
        setData(json);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to fetch users");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { data, loading, error };
}

export default function App() {
  const { data: users, loading, error } = useUsers();

  
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  
  const cityOptions = useMemo(() => {
    if (!users) return [];
    const s = Array.from(new Set(users.map((u) => u.address.city))).sort();
    return s;
  }, [users]);

  const companyOptions = useMemo(() => {
    if (!users) return [];
    const s = Array.from(new Set(users.map((u) => u.company.name))).sort();
    return s;
  }, [users]);

  
  const filtered = useMemo(() => {
    if (!users) return [];
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      
      const matchesSearch = q === "" || u.name.toLowerCase().includes(q);

      
      const matchesCity = selectedCity === "" || u.address.city === selectedCity;

      
      const matchesCompany = selectedCompany === "" || u.company.name === selectedCompany;

      return matchesSearch && matchesCity && matchesCompany;
    });
  }, [users, search, selectedCity, selectedCompany]);

  const clearAll = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedCompany("");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Users Explorer</h1>
        <p className="subtitle">Search, filter by city & company, and view user details.</p>
      </header>

      <Filters
        search={search}
        onSearchChange={setSearch}
        cityOptions={cityOptions}
        companyOptions={companyOptions}
        selectedCity={selectedCity}
        selectedCompany={selectedCompany}
        onCityChange={setSelectedCity}
        onCompanyChange={setSelectedCompany}
        onClear={clearAll}
      />

      <main>
        {loading && (
          <div className="status">
            <div className="spinner" aria-hidden="true"></div>
            <div>Loading users...</div>
          </div>
        )}

        {error && (
          <div className="status status-error" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="meta">
              <div>Showing <strong>{filtered.length}</strong> of <strong>{users?.length ?? 0}</strong> users</div>
            </div>

            {filtered.length === 0 ? (
              <div className="status">No users match the filters.</div>
            ) : (
              <section className="grid">
                {filtered.map((u) => (
                  <UserCard key={u.id} user={u} />
                ))}
              </section>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        <small>Data from JSONPlaceholder</small>
      </footer>
    </div>
  );
}
