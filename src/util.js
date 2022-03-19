//filter functions for projectFeed

export const filterProjects = (array, filters) => {
  if (filters.beginnerFriendly) {
    return array.filter((project) => project.beginnerFriendly);
  } else {
    return array;
  }
};
