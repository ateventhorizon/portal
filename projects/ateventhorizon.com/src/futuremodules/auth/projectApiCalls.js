import axios from "axios";

// Create Project
export const createProject = async project => {
  return await axios.post("/api/user/createProject/", {project});
};

export const sendInvitationToProject = async (adminuser, project, persontoadd) => {
  return await axios.put("/api/user/invitetoproject", {adminuser, project, persontoadd});
};

export const acceptInvitationToJoinProject = async (project, email) => {
  return await axios.put("/api/user/acceptInvitation/", {email, project});
}

export const declineInvitationToJoinProject = async (project, persontoadd) => {
  return await axios.delete("api/user/invitetoproject/", {data: {project, persontoadd}});
}

export const loginIntoProject = async project => {
  return await axios.post(`/api/refreshtoken/${project}`);
};
