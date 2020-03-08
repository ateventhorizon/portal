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

