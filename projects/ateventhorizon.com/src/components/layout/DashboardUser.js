import React, {Fragment, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, Dropdown, FormControl, InputGroup, SplitButton} from "react-bootstrap";
import {acceptInvitation, declineInvitation} from "../../actions/auth";
import {wasmSetCanvasVisibility} from "react-wasm-canvas";
import {alertIfSuccessful, api, useApi} from "../../api/apiEntryPoint";
import {logoutUser} from "../../api/auth";
import {createProject, sendInvitationToProject} from "../../api/project";

const DashboardUser = () => {

  const dispatch = useDispatch();
  const authApi = useApi('auth');
  const [auth, authStore, , alertStore] = authApi;
  const projectApi = useApi('project');

  dispatch(wasmSetCanvasVisibility('hidden'));

  let inviteNameRef = React.useRef(null);

  const [newProjectformData, setNewProjectformData] = useState({
    projectNew: ""
  });

  const [currentManagedProject, setCurrentManagedProject] = useState(null);

  if (auth === null) {
    return (<Redirect to="/"/>)
  }
  if (auth.project !== "") {
    return (<Redirect to="/dashboardproject"/>)
  }

  const setProject = (project) => {
    authStore({
      ...auth,
      project: project
    });
  }

  const onChange = e => {
    setNewProjectformData({
      ...newProjectformData,
      [e.target.name]: e.target.value
    });
  };

  const onCreateProject = e => {
    e.preventDefault();
    api( authApi, createProject, newProjectformData.projectNew);
  };

  const onAcceptInvitation = project => {
    acceptInvitation(project, auth.user.email);
  };

  const onDeclineInvitation = project => {
    declineInvitation(project, auth.user.email);
  };

  const invite = async () => {
    const invited = inviteNameRef.current.value;
    const res = await api(projectApi, sendInvitationToProject, auth.user.name, currentManagedProject, invited);
    alertIfSuccessful(res, alertStore, "Great stuff!", invited + " has been invited, give them a shout!");
  }

  const closeProjectManagement = () => {
    setCurrentManagedProject(null);
  };

  const onManageProject = name => {
    setCurrentManagedProject(name);
  };

  const onLoginToProject = (e, name) => {
    e.preventDefault();
    setProject(name, auth, authStore);
  };

  let userProjects;
  if (auth.projects !== null) {
    userProjects = (
      <Fragment>
        <div className="yourproject">
          <i className="fas fa-rocket"/> Your Projects:
        </div>
        <div className="project-login">
          {auth.projects.map(projectObject => (
            <Fragment key={`fragment-${projectObject.project}`}>
              <SplitButton
                title={projectObject.project}
                variant="primary"
                id={`dropdown-split-variants-${projectObject.project}`}
                key={projectObject.project}
                onClick={e => onLoginToProject(e, projectObject.project)}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={e => onLoginToProject(e, projectObject.project)}
                >
                  Open
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={e => onManageProject(projectObject.project)}
                >
                  Invite People
                </Dropdown.Item>
              </SplitButton>
              <div
                key={`dropdown-split-spacer-${projectObject.project}`}
                className="inliner mx-1"
              />
            </Fragment>
          ))}
        </div>
      </Fragment>
    );
  } else {
    userProjects = (
      <Fragment>
        <div className="yourproject lead">
          <i className="fas fa-chess-queen"/> Your Projects
        </div>
        <span className="normal text-primary">
          You don't seem to have any project assigned yet.
        </span>
      </Fragment>
    );
  }

  const projectManagement = (
    <div className="projectManagementContainer">
      <div className="projectInvitationGrid">
        <div className="lead text-secondary-alt">{currentManagedProject}</div>
        <div className="closeButton-a">
          <Button
            variant="outline-dark"
            onClick={e => closeProjectManagement()}
          >
            <i className="fas fa-times-circle"/>
          </Button>
        </div>
      </div>
      <div className="width100">Send invitation to join:</div>
      <InputGroup className="mb-3" onKeyPress={(target) => {
        if (target.charCode === 13) {
          invite()
        }
      }}
      >
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Username or email address"
          aria-label="Username"
          aria-describedby="basic-addon1"
          ref={inviteNameRef}
        />
        <InputGroup.Append>
          <Button variant="info" onClick={() => invite()}>
            Invite
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );

  const createNewProject = (
    <Fragment>
      <div className="yourproject">
        <i className="fas fa-plus-circle"/> Create New Project
      </div>
      <form className="form" onSubmit={e => onCreateProject(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Project Name"
            name="projectNew"
            value={newProjectformData.project}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Create"/>
      </form>
    </Fragment>
  );

  const invitations = auth.invitations;

  const invitationsCode =
    invitations.length === 0 ? (
      <span className="normal text-secondary-alt">No invitations yet.</span>
    ) : (
      <div className="project-login">
        {invitations.map(projectObject => (
          <Fragment key={`fragment-${projectObject.project}`}>
            <SplitButton
              title={projectObject.project}
              variant="info"
              id={`dropdown-split-variants-${projectObject.project}`}
              key={projectObject.project}
            >
              <Dropdown.Item
                eventKey="1"
                onClick={e => onAcceptInvitation(projectObject.project)}
              >
                Accept
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={e => onDeclineInvitation(projectObject.project)}
              >
                Decline
              </Dropdown.Item>
            </SplitButton>
            <div
              key={`dropdown-split-spacer-${projectObject.project}`}
              className="inliner mx-1"
            />
          </Fragment>
        ))}
      </div>
    );

  const askToJoinExistingProject = (
    <div>
      <div className="yourproject">
        <i className="far fa-envelope-open"> </i> Pending Project invitations
      </div>
      {invitationsCode}
    </div>
  );

  const logoff = (
    <div>
      <div className="yourproject">
        <i className="fas fa-sign-out-alt"> </i> Great Scott, get me out of here
      </div>
      <input
        type="button"
        className="btn btn-danger"
        value="Logout"
        onClick={() => api(authApi, logoutUser)}
      />
    </div>
  );

  return (
    <Fragment>
      <div className="userWithNoProject">
        <div className="large">
          <span>Hello, </span>{" "}
          <span className="navdiv-projecttext">
            {auth.user.name}
          </span>
        </div>
        {userProjects}
        {currentManagedProject && projectManagement}
        {createNewProject}
        {askToJoinExistingProject}
        {logoff}
      </div>
    </Fragment>
  );
};


export default DashboardUser;
