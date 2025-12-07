"use client";

import { FormEvent } from "react";

export default function DemoSearch() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const q = (formData.get("q") as string)?.trim() || "";
    const zip = (formData.get("zip") as string)?.trim() || "";
    const city = (formData.get("city") as string)?.trim() || "";
    const type = (formData.get("type") as string) || "";

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (zip) params.set("zip", zip);
    if (city) params.set("city", city);
    if (type) params.set("type", type);

    window.location.href =
      params.toString()
        ? `/lawyers?${params.toString()}`
        : "/lawyers";
  };

  return (
    <section className="lawyer-search-simple">
      <div className="lawyer-search-simple__inner">
        <h2 className="lawyer-search-simple__title">
          Find a legal specialist
        </h2>
        <p className="lawyer-search-simple__subtitle">
          Search by name or keyword, ZIP code, city and type of lawyer.
        </p>

        <form id="lawyer-search-form" className="lawyer-search-simple__form" onSubmit={handleSubmit}>
          <div className="lawyer-search-simple__field">
            <label htmlFor="searchQuery">Search</label>
            <input type="text" id="searchQuery" name="q" placeholder="Name, keyword, or practice area" />
          </div>

          <div className="lawyer-search-simple__field">
            <label htmlFor="zipCode">ZIP code</label>
            <input type="text" id="zipCode" name="zip" placeholder="e.g. 10115" />
          </div>

          <div className="lawyer-search-simple__field">
            <label htmlFor="cityName">City</label>
            <input type="text" id="cityName" name="city" placeholder="e.g. Berlin" />
          </div>

          <div className="lawyer-search-simple__field">
            <label htmlFor="lawyerType">Type of lawyer</label>
            <select id="lawyerType" name="type">
              <option value="">All</option>
              <option value="corporate">Corporate</option>
              <option value="family">Family</option>
              <option value="immigration">Immigration</option>
              <option value="financial">Financial</option>
              <option value="criminal">Criminal</option>
            </select>
          </div>
        </form>
        <button type="submit" form="lawyer-search-form" className="lawyer-search-simple__submit">Search</button>
      </div>
    </section>
  );
}
