import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import supabase from '../../client.js';
import { filterProjects } from '../../util';
import './ProjectFeed.css';
import { Link } from 'react-router-dom';

const ProjectFeed = () => {
  const [filters, setFilters] = useState({
    beginnerFriendly: false,
    category: "all",
  });

  const [categories, setCategories] = useState([]);

  const projects = useSelector((state) =>
    filterProjects(state.projects, filters)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
    const fetchCategories = async () => {
      // o: error is not being used
      const { data, error } = await supabase.from("categories").select("*");
      setCategories(data);
    };
    fetchCategories();

    // o: apparently dispatch should be a dependancy
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "category") {
      setFilters({ ...filters, [e.target.name]: e.target.value });
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
        {/* o: any reason why you are using two styles of checking existance below? */}
        {categories
          ? categories.map((category) => {
              return (
                <div className="input-element">
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
      </div>
      <div className="project-list">
        {projects.length ? (
          projects.map((project) => {
            return (
              <div key={project.id}>
                <Link to={`${project.id}`}>
                  <h1>{project.name}</h1>
                  <p>{project.description}</p>
                </Link>
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
