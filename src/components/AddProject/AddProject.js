import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import project, { addProjectThunk } from "../../store/project";
import { compareLanguages } from "../../util";
import "./AddProject.css";
import supabase from "../../client";

const AddProject = () => {
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    beginnerFriendly: false,
    repoLink: "",
    languageId: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    const languages = await supabase.from("languages").select("*");
    console.log("languages", languages);
    setLanguages(languages.data);
  };

  const handleChange = (e) => {
    console.log("e", e.target.value);
    if (e.target.name === "beginnerFriendly") {
      setNewProject((newProject) => ({
        ...newProject,
        [e.target.name]: e.target.checked,
      }));
    } else {
      if (e.target.name === "languageId") {
        setNewProject((newProject) => ({
          ...newProject,
          [e.target.name]: Number(e.target.value),
        }));
      }
      setNewProject((newProject) => ({
        ...newProject,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is new Project: ", newProject);
    dispatch(addProjectThunk({ ...newProject }, user.id));
    //history.push('/projects')'
    setSubmitted(true);
  };

  return (
    <div className='form-container'>
      <form className='new-project-form' onSubmit={handleSubmit}>
        {submitted ? (
          <div className='success-message'>Project Added</div>
        ) : null}
        <input
          placeholder='Project name'
          onChange={handleChange}
          className='form-field'
          name='name'
        />
        <br />
        <br />
        <br />
        <input
          placeholder='Project description'
          onChange={handleChange}
          className='form-field'
          name='description'
        />
        <br />
        <br />
        <br />
        <label>Beginner Friendly</label>
        <input
          type='checkbox'
          checked={newProject.beginnerFriendly}
          placeholder='Beginner Friendly?'
          onChange={handleChange}
          className='form-field'
          name='beginnerFriendly'
        />
        <br />
        <br />
        <br />
        <input
          placeholder='Repository Link'
          onChange={handleChange}
          className='form-field'
          name='repoLink'
        />
        <br />
        <br />
        <br />
        <select name='languageId' onChange={handleChange}>
          <option value={0}>Choose Language</option>
          {languages.map((language) => {
            return <option value={language.id}>{language.name}</option>;
          })}
        </select>

        {/* // <select name='language' id='language-select' onChange={handleChange}>
        //   <option value='javascript'>JavaScript</option>
        //   <option value='html'>HTML</option>
        //   <option value='CSS'>CSS</option>
        //   <option value='pyton'>Python</option>
        //   <option value='clojure'>Clojure</option>
        //   type='drop-down' placeholder='Language' className='form-field'
        //   name='language'
        // </select> */}
        <br />
        <br />
        <br />
        <button type='submit'>Post Project</button>
      </form>
    </div>
  );
};

export default AddProject;
