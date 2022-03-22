<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/projects';
import supabase from '../../client.js';
import { filterProjects, compareLanguages } from '../../util';
import './ProjectFeed.css';
import { Link } from 'react-router-dom';
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/projects";
import supabase from "../../client.js";
import { filterProjects } from "../../util";
import "./ProjectFeed.css";
import ProjectTile from "./ProjectTile";
>>>>>>> main

const ProjectFeed = () => {
  const [filters, setFilters] = useState({
    beginnerFriendly: false,
    category: 'all',
    languages: [],
  });

  const userId = useSelector((state) => state.user.id);
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const projects = useSelector((state) =>
    filterProjects(state.projects, filters)
  );
  const dispatch = useDispatch();

  const fetchAll = async () => {
    setIsLoading(true);
    const currentUser = await supabase
      .from("user")
      .select(
        `
      *,
      languages (id, name)
      `
      )
      .eq("id", userId);
    const categories = await supabase.from("categories").select("*");
    const languages = await supabase.from("languages").select("*");
    setLanguages(languages.data);
    setCategories(categories.data);
    setCurrentUser(currentUser.data);

    dispatch(fetchProjects());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'category') {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    } else if (e.target.name === 'language') {
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
            checked={filters.category === 'all'}
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
          : ''}
        <h2>Languages</h2>
<<<<<<< HEAD
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
          : ''}
      </div>
      <div className="project-list">
        {projects.length ? (
          projects.map((project) => {
            return (
              <div key={project.id} className="project-tile">
                <div className="project-owner">
                  <img src={project.user.imageUrl} />
                  <Link to={`/user/${project.user.username}`}>
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
                      : ''}
                  </p>
                  <p>
                    <strong>Category: </strong>
                    <span>{project.categories.name}</span>
                  </p>
                  <p>
                    <strong>Beginner Friendly: </strong>
                    <span>{project.beginnerFriendly ? 'Yes' : 'No'}</span>
                  </p>
                </div>
                <button
                  className="request-to-collab"
                  disabled={
                    compareLanguages(currentUser, project) &&
                    !project.beginnerFriendly
                  }
                >
                  <strong>Request to Collab</strong>
                </button>
                <span
                  hidden={
                    !(
                      compareLanguages(currentUser, project) &&
                      !project.beginnerFriendly
                    )
                  }
                >
                  <em>
                    You don't have the required languages on your profile. Spend
                    some time learning them first, or look for a beginner
                    friendly project.
                  </em>
                </span>
=======
        {languages.length ? (
          languages.map((language) => {
            return (
              <div className="input-element" key={language.id}>
                <input
                  name="language"
                  type="checkbox"
                  onChange={handleChange}
                  value={language.id}
                />
                <label htmlFor="language">{language.name}</label>
>>>>>>> main
              </div>
            );
          })
        ) : (
          <h1>{isLoading ? "" : "Sorry, we couldn't find any projects"}</h1>
        )}
      </div>
      <div className="project-list">
        {(!!projects || projects.length) && !isLoading ? (
          projects.map((project) => (
            <ProjectTile project={project} currentUser={currentUser} />
          ))
        ) : isLoading ? (
          <h1>Loading feed...</h1>
        ) : (
          <h1>We couldn't find any projects ¯\_(ツ)_/¯</h1>
        )}
      </div>
    </div>
  );
};

export default ProjectFeed;
