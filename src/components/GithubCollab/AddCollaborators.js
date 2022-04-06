import { Octokit } from '@octokit/core';
import supabase from '../../client';

export async function addCollaborator(user, project) {
  const userSession = supabase.auth.session();
  const currentUser = supabase.auth.user();
  const octokit = new Octokit({
    auth: userSession.provider_token,
  });
  if (project.repoLink) {
    let repourl = project.repoLink.split('/');
    let repo = repourl[repourl.length - 1];
    try {
      await octokit.request(
        `PUT /repos/{owner}/{repo}/collaborators/{username}`,
        {
          owner: currentUser.user_metadata.user_name,
          repo,
          username: user,
          permission: 'push',
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  }
}

export async function addAllCollaborators(projectdata, owner) {
  const userSession = supabase.auth.session();
  const octokit = new Octokit({
    auth: userSession.provider_token,
  });

  const project = projectdata.data ? projectdata.data[0] : projectdata;

  if (project.repoLink) {
    let repourl = project.repoLink.split('/');
    let repo = repourl[repourl.length - 1];

    for (let i = 0; i < project.user.length; i++) {
      try {
        if (project.user[i].username !== owner) {
          await octokit.request(
            `GET /repos/{owner}/{repo}/collaborators/{username}`,
            {
              owner,
              repo,
              username: project.user[i].username,
            }
          );
        }
      } catch (err) {
        if (err.message === 'Not Found') {
          await octokit.request(
            `PUT /repos/{owner}/{repo}/collaborators/{username}`,
            {
              owner,
              repo,
              username: project.user[i].username,
              permission: 'push',
            }
          );
        }
      }
    }
  }
}
