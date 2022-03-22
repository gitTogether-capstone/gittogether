import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, setProjects } from "../../store/projects";
import supabase from "../../client.js";
import "./ProjectFeed.css";
import ProjectTile from "./ProjectTile";
import InfiniteScroll from "react-infinite-scroll-component";

const ProjectFeed = () => {
  const [filters, setFilters] = useState({
    beginnerFriendly: false,
    category: "all",
    languages: [],
  });

  const userId = useSelector((state) => state.user.id);
  const [currentUser, setCurrentUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const grabMoreProjects = async () => {
    // console.log("length before", prevLength);
    dispatch(fetchProjects(filters, categories, languages, page));
    setPage(page + 1);
    // prevLength = projects.length;
    // console.log("length after", projects.length);
  };
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

    dispatch(fetchProjects(filters, categories.data, languages.data, page));
    setPage(page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [filters]);

  const handleChange = (e) => {
    setPage(0);
    dispatch(setProjects([]));
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
              </div>
            );
          })
        ) : (
          <h1>{isLoading ? "" : "Sorry, we couldn't find any projects"}</h1>
        )}
      </div>
      <div className="project-list">
        <InfiniteScroll
          dataLength={projects.length}
          next={grabMoreProjects}
          hasMore={true}
          loader={<h2>Loading...</h2>}
        >
          {(!!projects || projects.length) && !isLoading ? (
            projects.map((project) => (
              <ProjectTile project={project} currentUser={currentUser} />
            ))
          ) : isLoading ? (
            <h1>Loading feed...</h1>
          ) : (
            <h1>We couldn't find any projects ¯\_(ツ)_/¯</h1>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProjectFeed;
