//check if current user has the language required for the project

export const compareLanguages = (user, project) => {
  if (user.length) {
    const userLanguages = user[0].languages.map((language) => language.id);
    return !userLanguages.includes(project.languages.id);
  }
  return false;
};
