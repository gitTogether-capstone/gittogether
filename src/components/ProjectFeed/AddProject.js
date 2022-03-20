import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectThunk } from "../../store/project";

const AddProject = () => {
  const dispatch = useDispatch();
  //const newProject = useSelector((state) => state.newProject);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(addProjectThunk(newProject));
    console.log("newProject", newProject);
  }, []);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    beginnerFriendly: "",
    repoLink: "",
    owner: "",
  });

  const handleChange = (e) => {
    setNewProject({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProjectThunk(newProject));
    setSubmitted(true);
  };
  return (
    <div className="form-container">
      <form className="new-project-form">
        {submitted ? (
          <div className="success-message">Project Added</div>
        ) : null}
        <input
          placeholder="Project name"
          onChange={handleChange}
          value={newProject.name}
          className="form-field"
          name="name"
        />
        <br />
        <input
          placeholder="Project description"
          onChange={handleChange}
          value={newProject.description}
          className="form-field"
          name="description"
        />
        <br />
        <input
          placeholder="Beginner Friendly?"
          onChange={handleChange}
          value={newProject.beginnerFriendly}
          className="form-field"
          name="Beginner Friendly?"
        />
        <br />
        <input
          placeholder="Repository Link"
          onChange={handleChange}
          value={newProject.repoLink}
          className="form-field"
          name="Repository Link"
        />
        <br />
        <input
          placeholder="Owner"
          onChange={handleChange}
          value={newProject.owner}
          className="form-field"
          name="Owner"
        />
        <br />
        <button type="submit" onSubmit={handleSubmit}>
          Post Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
