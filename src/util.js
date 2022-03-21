//filter functions for projectFeed

export const filterProjects = (array, filters) => {
  array = filterBeginnerFriendly(array, filters);
  array = filterCategory(array, filters);
  array = filterLanguages(array, filters);
  return array;
};

const filterBeginnerFriendly = (array, filters) => {
  if (filters.beginnerFriendly) {
    return array.filter((project) => project.beginnerFriendly);
  } else {
    return array;
  }
};

const filterCategory = (array, filters) => {
  if (filters.category === "all") {
    return array;
  } else {
    return array.filter((project) => project.categoryId == filters.category);
  }
};

const filterLanguages = (array, filters) => {
  if (filters.languages.length === 0) {
    return array;
  } else {
    return array.filter((project) => {
      let includesLanguage = false;
      console.log(filters.languages);
      project.languages.forEach((language) => {
        if (filters.languages.includes(`${language.id}`)) {
          includesLanguage = true;
        }
      });
      return includesLanguage;
    });
  }
};
