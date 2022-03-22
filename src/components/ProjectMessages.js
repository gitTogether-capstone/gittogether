// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProject } from "../store/project";
// import { fetchComments } from "../store/comments";
// import supabase from "../client";

// const ProjectMessages = (props) => {
//   //const [comments, setComments] = useState([]);
//   const dispatch = useDispatch();
//   const comments = useSelector((state) => state.comments);
//   //   const project = useSelector((state) => state.project);
//   const [comment, setComment] = useState({ body: "" });
//   const { body } = comment;

//   useEffect(() => {
//     dispatch(fetchComments(comments));
//     console.log("comments", comments);
//   }, []);

//   //   async function fetchComments() {
//   //     const { data } = await supabase.from("comments").select();
//   //     setComments(data);
//   //     console.log("data", data);
//   //   }
//   async function createComment() {
//     await supabase.from("comments").insert([{ body }]).single();
//     setComment({ body: "" });
//     fetchComments();
//   }

//   return (
//     <div className="Project-messages">
//       <input
//         placeholder="body"
//         value={body}
//         onChange={(e) => setComment({ ...comment, body: e.target.value })}
//       />
//       <button onClick={createComment}>Post</button>
//       {comments.map((comment) => (
//         <div key={comment.id}>
//           <p>{comment.body}</p>
//         </div>
//       ))}
//       <div>Hi, I'm your project messages</div>;
//     </div>
//   );
// };

// export default ProjectMessages;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProject } from "../../store/project";
import supabase from "../client";

const ProjectMessages = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });
  const { body } = comment;

  async function fetchComments() {
    const { data } = await supabase.from("comments").select();
    setComments(data);
    console.log("data", data);
  }
  async function createComment() {
    await supabase.from("comments").insert([{ body }]).single();
    setComment({ body: "" });
    fetchComments();
  }

  return (
    <div className="Project-messages">
      <input
        placeholder="body"
        value={body}
        onChange={(e) => setComment({ ...comment, body: e.target.value })}
      />
      <button onClick={createComment}>Post</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
      <div>Hi, I'm your project messages</div>;
    </div>
  );
};

export default ProjectMessages;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { fetchProject } from "../../store/project";
// import supabase from "../client";

// const ProjectMessages = () => {
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState({ body: "" });
//   const { body } = comment;

//   async function fetchComments() {
//     const { data } = await supabase.from("comments").select();
//     setComments(data);
//     console.log("data", data);
//   }
//   async function createComment() {
//     await supabase.from("comments").insert([{ body }]).single();
//     setComment({ body: "" });
//     fetchComments();
//   }

//   return (
//     <div className="Project-messages">
//       <input
//         placeholder="body"
//         value={body}
//         onChange={(e) => setComment({ ...comment, body: e.target.value })}
//       />
//       <button onClick={createComment}>Post</button>
//       {comments.map((comment) => (
//         <div key={comment.id}>
//           <p>{comment.body}</p>
//         </div>
//       ))}
//       <div>Hi, I'm your project messages</div>;
//     </div>
//   );
// };

// export default ProjectMessages;
