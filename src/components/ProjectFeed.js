import React, { useEffect, useState } from "react";

const dummyData = [
  {
    id: 1,
    name: "Example project One",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    categoryId: 1,
    beginnerFriendly: true,
  },
  {
    id: 2,
    name: "Example project Two",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    categoryId: 1,
    beginnerFriendly: false,
  },
  {
    id: 3,
    name: "Example project Three",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    categoryId: 1,
    beginnerFriendly: true,
  },
  {
    id: 4,
    name: "Example project Four",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    categoryId: 1,
    beginnerFriendly: false,
  },
  {
    id: 5,
    name: "Example project Five",
    description: "this is the example description",
    repoLink: "https://github.com/gitTogether-capstone/gittogether",
    categoryId: 1,
    beginnerFriendly: true,
  },
];

const ProjectFeed = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(dummyData);
  }, []);

  return (
    <div>
      {projects.length ? (
        projects.map((project) => {
          return (
            <div>
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </div>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default ProjectFeed;
