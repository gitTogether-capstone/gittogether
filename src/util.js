import supabase from './client';

//check if current user has the language required for the project

export const compareLanguages = (user, project) => {
  if (user.length) {
    const userLanguages = user[0].languages.map((language) => language.id);
    return !userLanguages.includes(project.languages.id);
  }
  return false;
};

//fetch all projects belonging to a user
//returns an array of preoject IDs where the owner is the userId passed in
const fetchMyProjects = async (userId) => {
  const { data, error } = await supabase
    .from('projectUser')
    .select(
      `
  *
  `
    )
    .eq('userId', userId)
    .eq('isOwner', true);

  return data.map((item) => item.projectId);
};

export const fetchProjectRequests = async (userId) => {
  const projectIds = await fetchMyProjects(userId);
  const { data, error } = await supabase
    .from('projectUser')
    .select(
      `
  *,
  user(id, username, imageUrl),
  projects(id, name)
  `
    )
    .in('projectId', projectIds)
    .eq('isAccepted', false);
  return data;
};
