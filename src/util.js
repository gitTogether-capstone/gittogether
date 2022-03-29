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
export const fetchMyProjects = async (userId) => {
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

export const fetchUserDMs = async (currentUserId) => {
  const { data } = await supabase
    .from('directMessages')
    .select(
      `
  sender:user!directMessages_sender_Id_fkey(id, username, imageUrl),
  receiver: user!directMessages_receiver_Id_fkey(id, username, imageUrl)
  `
    )
    .or(`receiver_Id.eq.${currentUserId}, sender_Id.eq.${currentUserId}`);

  let seen = {};
  let users = [];

  for (const element of data) {
    if (element.receiver.id !== currentUserId && !seen[element.receiver.id]) {
      users.push(element.receiver);
      seen[element.receiver.id] = true;
    }
    if (element.sender.id !== currentUserId && !seen[element.sender.id]) {
      users.push(element.sender);
      seen[element.sender.id] = true;
    }
  }
  return users;
};
