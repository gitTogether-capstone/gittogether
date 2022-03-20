import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProjectThunk } from "../../store/project";

const AddProject = () => {
  const dispatch = useDispatch();
  //const newProject = useSelector((state) => state.newProject);
  const [submitted, setSubmitted] = useState(false);

  // const dispatch = useDispatch()
  // let history = useHistory()
  // const [product, setProduct] = useState({})
  // const { error } = useSelector(state => state.singleProduct)

  // const handleChange = (event) => {
  //     let value = {}
  //     value = { [event.target.name]: event.target.value }
  //     setProduct(product => ({
  //         ...product,
  //         ...value
  //     }))
  // }

  // const handleSubmit = (event) => {
  //     event.preventDefault()
  //     dispatch(makeProduct(product))
  //     if (product.name !== undefined && product.pennies !== undefined) {
  //         history.push('/')
  //     }
  // }

  const [newProject, setNewProject] = useState({});

  const handleChange = (e) => {
    let value = {};
    value = {
      [e.target.name]: e.target.value,
    };
    setNewProject((newProject) => ({
      ...newProject,
      ...value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("newProject", newProject);
    dispatch(addProjectThunk(newProject));
    //history.push('/projects')'
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
          // value={newProject.name}
          className="form-field"
          name="name"
        />
        <br />
        <input
          placeholder="Project description"
          onChange={handleChange}
          // value={newProject.description}
          className="form-field"
          name="description"
        />
        <br />
        <input
          placeholder="Beginner Friendly?"
          onChange={handleChange}
          // value={newProject.beginnerFriendly}
          className="form-field"
          name="beginnerFriendly"
        />
        <br />
        <input
          placeholder="Repository Link"
          onChange={handleChange}
          // value={newProject.repoLink}
          className="form-field"
          name="repoLink"
        />
        <br />
        <input
          placeholder="Owner"
          onChange={handleChange}
          // value={newProject.owner}
          className="form-field"
          name="owner"
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

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { addProjectThunk } from "../../store/project";

// class AddProject extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       description: "",
//       beginnerFriendly: "",
//       owner: "",
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.addProject({ ...this.state });
//     this.props.history.push("/projects");
//   };
//   render() {
//     console.log("this.state", this.state);
//     return (
//       <div className="form-container">
//         <form className="new-project-form">
//           <input
//             type="text"
//             placeholder="Project name"
//             onChange={this.handleChange}
//             value={this.name}
//             className="form-field"
//             name="name"
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Project description"
//             onChange={this.handleChange}
//             value={this.state.description}
//             className="form-field"
//             name="description"
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Beginner Friendly?"
//             onChange={this.handleChange}
//             value={this.state.beginnerFriendly}
//             className="form-field"
//             name="beginnerFriendly"
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Repository Link"
//             onChange={this.handleChange}
//             value={this.state.repoLink}
//             className="form-field"
//             name="repoLink"
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Owner"
//             onChange={this.handleChange}
//             value={this.state.owner}
//             className="form-field"
//             name="owner"
//           />
//           <br />
//           <button type="submit" onSubmit={this.handleSubmit}>
//             Post Project
//           </button>
//         </form>
//       </div>
//     );
//   }
// }
// const mapDispatch = (dispatch) => ({
//   addProject: (newProject) => dispatch(addProjectThunk(newProject)),
// });

// export default connect(null, mapDispatch)(AddProject);
