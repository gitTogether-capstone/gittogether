import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { compareLanguages } from "../../util";
import './AddProject.css';
import supabase from '../../client';
import { addProjects } from '../../store/projects';
import { toast } from 'react-toastify';

const AddProject = (props) => {
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    beginnerFriendly: false,
    repoLink: '',
    languageId: 0,
    categoryId: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchLanguages();
    fetchCategories();
  }, []);

  const fetchLanguages = async () => {
    const languages = await supabase.from('languages').select('*');
    console.log('languages', languages);
    setLanguages(languages.data);
  };

  const fetchCategories = async () => {
    const categories = await supabase.from('categories').select('*');
    setCategories(categories.data);
  };

  const handleChange = (e) => {
    if (e.target.name === 'beginnerFriendly') {
      setNewProject((newProject) => ({
        ...newProject,
        [e.target.name]: e.target.checked,
      }));
    } else {
      if (e.target.name === 'languageId') {
        setNewProject((newProject) => ({
          ...newProject,
          [e.target.name]: Number(e.target.value),
        }));
      } else {
        setNewProject((newProject) => ({
          ...newProject,
          [e.target.name]: e.target.value,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('projects')
      .insert([newProject]);
    console.log(data);
    const projectUser = await supabase.from('projectUser').insert([
      {
        projectId: data[0].id,
        userId: user.id,
        isAccepted: true,
        isOwner: true,
      },
    ]);
    const addedProject = await supabase
      .from('projects')
      .select(
        `
    *, languages (id, name),
    categories (id, name),
    projectUser(*, user(id, username, imageUrl))
    `
      )
      .eq('id', data[0].id)
      .eq('projectUser.isOwner', true);
    dispatch(addProjects(addedProject.data));
    if (!error && !projectUser.error && !addedProject.error) {
      props.closePopup(false);
      toast('Your project was succesfully posted!');
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={() => props.closePopup(false)}>
        <strong>X</strong>
      </button>
      <h1>New Project</h1>

      <form
        autoComplete="off"
        className="new-project-form"
        onSubmit={handleSubmit}
      >
        {submitted ? (
          <div className="success-message">Project Added</div>
        ) : null}
        <div className="form-element">
          <label htomFor="name">Project Name*</label>
          <input
            placeholder="Project name"
            onChange={handleChange}
            className="form-field"
            name="name"
            type="text"
            required
          />
        </div>
        <div className="form-element">
          <label htmlFor="description">Description*</label>
          <textarea
            placeholder="Project description"
            onChange={handleChange}
            className="form-field"
            id="description"
            name="description"
            required
          />
        </div>

        <div className="form-element">
          <label className="container" id="form-checkbox">
            Beginner Friendly
            <input
              type="checkbox"
              checked={newProject.beginnerFriendly}
              placeholder="Beginner Friendly?"
              onChange={handleChange}
              name="beginnerFriendly"
            />
            <span className="checkmark" id="beginner-friendly"></span>
          </label>
        </div>
        <div className="form-element">
          <label htmlFor="repoLink">Repository Link</label>
          <input
            placeholder="Repository Link"
            onChange={handleChange}
            className="form-field"
            name="repoLink"
          />
        </div>
        <div className="form-element">
          <label htmlFor="languageId">Language</label>
          <select name="languageId" onChange={handleChange}>
            <option value={0}>Choose Language</option>
            {languages.map((language) => {
              return <option value={language.id}>{language.name}</option>;
            })}
          </select>
        </div>

        <div className="form-element">
          <label htmlFor="categoryId">Category</label>
          <select name="categoryId" onChange={handleChange}>
            <option value={0}>Choose Category</option>
            {categories.map((category) => {
              return <option value={category.id}>{category.name}</option>;
            })}
          </select>
        </div>

        <button
          type="submit"
          disabled={!newProject.languageId || !newProject.categoryId}
          id="submit-button"
        >
          <strong>Post Project</strong>
        </button>
      </form>
    </div>
  );
};

export default AddProject;
