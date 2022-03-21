import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectThunk } from "../../store/project";
import "./AddProject.css";

const AddProject = () => {
  const dispatch = useDispatch();
  const [newProject, setNewProject] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    let value = {};
    value = { [e.target.name]: e.target.value };
    setNewProject((newProject) => ({
      ...newProject,
      ...value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("This is new Project: ", newProject);
    dispatch(addProjectThunk(newProject));
    //history.push('/projects')'
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="new-project-form" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="success-message">Project Added</div>
        ) : null}
        <input
          placeholder="Project name"
          onChange={handleChange}
          className="form-field"
          name="name"
        />
        <br />
        <br />
        <br />
        <input
          placeholder="Project description"
          onChange={handleChange}
          className="form-field"
          name="description"
        />
        <br />
        <br />
        <br />
        <input
          placeholder="Beginner Friendly?"
          onChange={handleChange}
          className="form-field"
          name="beginnerFriendly"
        />
        <br />
        <br />
        <br />
        <input
          placeholder="Repository Link"
          onChange={handleChange}
          className="form-field"
          name="repoLink"
        />
        <br />
        <br />
        <br />
        <input
          placeholder="Owner"
          onChange={handleChange}
          className="form-field"
          name="ownerId"
        />
        <br />
        <br />
        <br />
        <button type="submit">Post Project</button>
      </form>
    </div>
  );
};

export default AddProject;