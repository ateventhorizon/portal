import axios from "axios";

// Create Project
export const createProject = async project => {
  return await axios.post("/api/user/createProject/", {project});
};

export const sendInvitationToProject = async (adminuser, project, personToAdd) => {
  const body = {
    adminuser: adminuser,
    project: project,
    persontoadd: personToAdd
  };

  return await axios.put("/api/user/invitetoproject", body);
};

export const acceptInvitationToJoinProject = async ( project, email ) => {
  return await axios.put("/api/user/acceptInvitation/", {email, project} );
}

export const declineInvitationToJoinProject = async ( project, email ) => {
  const body = {
    persontoadd: email,
    project: project
  };
  return await axios.delete("api/user/invitetoproject/", body );
}

export const loginIntoProject = async project => {
  return await axios.post(`/api/refreshtoken/${project}`);
};
