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
      project.languages.forEach((language) => {
        if (filters.languages.includes(`${language.id}`)) {
          includesLanguage = true;
        }
      });
      return includesLanguage;
    });
  }
};

//check if current user has the language required for the project

export const compareLanguages = (user, project) => {
  if (!user.length) {
    return false;
  } else {
    let isEligible = false;
    const userLanguages = user[0].languages.map((language) => language.id);
    const projectLanguages = project.languages.map((language) => language.id);
    projectLanguages.forEach((languageId) => {
      if (!userLanguages.includes(languageId)) {
        isEligible = true;
      }
    });
    return isEligible;
  }
};
