import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, setProjects } from '../../store/projects';
import supabase from '../../client.js';
import './ProjectFeed.css';
import ProjectTile from './ProjectTile';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [page, setPage] = useState(0);
  const hasMore = useSelector((state) => state.hasMore);

  const projects = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const grabMoreProjects = async () => {
    setIsLoading(true);
    dispatch(fetchProjects(filters, categories, languages, page, 'more'));
    setPage(page + 1);
    setIsLoading(false);
  };
  const fetchAll = async () => {
    setIsLoading(true);
    const currentUser = await supabase
      .from('user')
      .select(
        `
      *,
      languages (id, name)
      `
      )
      .eq('id', userId);
    const categories = await supabase.from('categories').select('*');
    const languages = await supabase.from('languages').select('*');
    setLanguages(languages.data);
    setCategories(categories.data);
    setCurrentUser(currentUser.data);
    dispatch(
      fetchProjects(filters, categories.data, languages.data, page, 'initial')
    );

    setPage(page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, [filters]);

  const showToastNotification = (message) => {
    toast(message);
  };

  const handleChange = (e) => {
    setPage(0);
    dispatch(setProjects([]));
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
          <label className="container">
            <input
              name="beginnerFriendly"
              type="checkbox"
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            Beginner Friendly
          </label>
        </div>
        <h2>Categories</h2>
        <div className="input-element">
          <label className="container">
            <input
              name="category"
              type="radio"
              onChange={handleChange}
              value="all"
              checked={filters.category === 'all'}
            />
            <span className="radio-fill"></span>
            All
          </label>
        </div>
        {categories
          ? categories.map((category) => {
              return (
                <div className="input-element" key={category.id}>
                  <label className="container">
                    <input
                      className="radio-button"
                      name="category"
                      type="radio"
                      onChange={handleChange}
                      value={category.id}
                      checked={filters.category == category.id}
                    />
                    <span className="radio-fill"></span>
                    {category.name}
                  </label>
                </div>
              );
            })
          : ''}
        <h2>Languages</h2>
        {languages.length ? (
          languages.map((language) => {
            return (
              <div className="input-element" key={language.id}>
                <label className="container">
                  <input
                    name="language"
                    type="checkbox"
                    onChange={handleChange}
                    value={language.id}
                  />
                  <span className="checkmark"></span>
                  {language.name}
                </label>
              </div>
            );
          })
        ) : (
          <h1>{isLoading ? '' : "Sorry, we couldn't find any projects"}</h1>
        )}
      </div>

      <div className="project-list">
        <InfiniteScroll
          dataLength={projects.length}
          next={grabMoreProjects}
          hasMore={hasMore}
          loader={<h2>Loading feed...</h2>}
          endMessage={<h2>No more projects</h2>}
        >
          {(!!projects || projects.length) && !isLoading ? (
            projects.map((project) => (
              <ProjectTile
                project={project}
                currentUser={currentUser}
                key={project.id}
                allProjects={projects}
                sendNotification={showToastNotification}
              />
            ))
          ) : isLoading ? (
            <></>
          ) : (
            <h1>We couldn't find any projects ¯\_(ツ)_/¯</h1>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProjectFeed;
