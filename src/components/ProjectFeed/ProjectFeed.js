import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/projects";
import supabase from "../../client.js";
import { filterProjects } from "../../util";
import "./ProjectFeed.css";
import { Link } from "react-router-dom";

const ProjectFeed = () => {
  const [filters, setFilters] = useState({
    beginnerFriendly: false,
    category: "all",
    languages: [],
  });

  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  const projects = useSelector((state) =>
    filterProjects(state.projects, filters)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      setCategories(data);
    };
    const fetchLanguages = async () => {
      const { data, error } = await supabase.from("languages").select("*");
      setLanguages(data);
    };
    fetchCategories();
    fetchLanguages();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    } else if (e.target.name === "language") {
      if (e.target.checked) {
        setFilters({
          ...filters,
          languages: [...filters.languages, e.target.value],
        });
      } else {
        let newFilters = filters.languages.filter(
          (languageId) => languageId !== e.target.value
        );
        setFilters({ ...filters, languages: newFilters });
      }
    } else {
      setFilters({ ...filters, [e.target.name]: e.target.checked });
    }
  };

  return (
    <div className="project-feed">
      <div className="project-filters">
        <h1>Filters</h1>
        <h2>Beginner Friendly</h2>
        <div className="input-element">
          <input
            name="beginnerFriendly"
            type="checkbox"
            onChange={handleChange}
          />
          <label htmlFor="beginnerFriendly">Beginner Friendly</label>
        </div>
        <h2>Categories</h2>
        <div className="input-element">
          <input
            name="category"
            type="radio"
            onChange={handleChange}
            value="all"
            checked={filters.category === "all"}
          />
          <label htmlFor="category">All</label>
        </div>
        {categories
          ? categories.map((category) => {
              return (
                <div className="input-element" key={category.id}>
                  <input
                    name="category"
                    type="radio"
                    onChange={handleChange}
                    value={category.id}
                    checked={filters.category == category.id}
                  />
                  <label htmlFor="category">{category.name}</label>
                </div>
              );
            })
          : ""}
        <h2>Languages</h2>
        {languages.length
          ? languages.map((language) => {
              return (
                <div className="input-element" key={language.id}>
                  <input
                    name="language"
                    type="checkbox"
                    onChange={handleChange}
                    value={language.id}
                  />
                  <label htmlFor="language">{language.name}</label>
                </div>
              );
            })
          : ""}
      </div>
      <div className="project-list">
        {projects.length ? (
          projects.map((project) => {
            return (
              <div key={project.id} className="project-tile">
                <div className="project-owner">
                  <img src={project.user.imageUrl} />
                  <Link>
                    <strong>@{project.user.username}</strong>
                  </Link>
                </div>
                <Link to={`/projects/${project.id}`}>
                  <p>
                    <strong>{project.name}</strong>
                  </p>
                  <p>{project.description}</p>
                </Link>
                <div className="project-details">
                  <p>
                    <strong>Languages: </strong>
                    {project.languages.length
                      ? project.languages.map((language) => {
                          return <span key={language.id}>{language.name}</span>;
                        })
                      : ""}
                  </p>
                  <p>
                    <strong>Category: </strong>
                    <span>{project.categories.name}</span>
                  </p>
                  <p>
                    <strong>Beginner Friendly: </strong>
                    <span>{project.beginnerFriendly ? "Yes" : "No"}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};

export default ProjectFeed;
