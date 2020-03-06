import React, {Fragment, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Dropdown, FormControl, InputGroup, SplitButton} from "react-bootstrap";
import {
  acceptInvitation,
  createProject,
  declineInvitation, loadUser,
  logout,
  sendInvitationToProject,
  setCurrentProject
} from "../../actions/auth";
import {wasmSetCanvasVisibility} from "react-wasm-canvas";
import {useGlobal} from "reactn";

const DashboardUser = () => {

  const dispatch = useDispatch();
  const userstate = useSelector(state => state.auth);
  // eslint-disable-next-line
  const [notificationAlert, setNotificationAlert] = useGlobal('notificationAlert');

  dispatch(wasmSetCanvasVisibility('hidden'));

  let inviteNameRef = React.useRef(null);

  const [newProjectformData, setNewProjectformData] = useState({
    projectNew: ""
  });

  const [currentManagedProject, setCurrentManagedProject] = useState(null);

  if (
    userstate.isAuthenticated &&
    userstate.userdata &&
    userstate.userdata.project !== null &&
    userstate.userdata.project !== ""
  ) {
    return <Redirect to="/dashboardproject"/>;
  }

  const onChange = e => {
    setNewProjectformData({
      ...newProjectformData,
      [e.target.name]: e.target.value
    });
  };

  const onCreateProject = e => {
    e.preventDefault();
    createProject(newProjectformData.projectNew);
  };

  const onAcceptInvitation = project => {
    acceptInvitation(project, userstate.userdata.user.email);
  };

  const onDeclineInvitation = project => {
    declineInvitation(project, userstate.userdata.user.email);
  };

  const invite = () => {
    invitePerson(userstate.userdata.user.name, currentManagedProject, inviteNameRef.current.value);
  }

  const invitePerson = async (from, toProject, to) => {
    try {
      const res = await sendInvitationToProject(from, toProject, to);
      setNotificationAlert({
        show: true,
        title: res.data.code === 200 ? "Great stuff!" : "Not invited because...",
        text: res.data.msg,
        alertType: res.data.code === 200 ? "success" : "warning"
      });
    } catch (e) {
      setNotificationAlert({
        show: true,
        title: "Oh Oh",
        text: "This is SPARTAAAAA!!! (+100)",
        alertType: "danger"
      });
    }
  }

  const closeProjectManagement = () => {
    setCurrentManagedProject(null);
  };

  const onManageProject = name => {
    setCurrentManagedProject(name);
  };

  const onLoginToProject = async (e, name) => {
    e.preventDefault();
    try {
      setCurrentProject(name);
      dispatch(loadUser());
    } catch (e) {
      
    }
  };

  if (userstate.userdata === null) return <Fragment/>;

  let userProjects;
  if (userstate.userdata.projects !== null) {
    userProjects = (
      <Fragment>
        <div className="yourproject">
          <i className="fas fa-rocket"/> Your Projects:
        </div>
        <div className="project-login">
          {userstate.userdata.projects.map(projectObject => (
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

  const invitations = userstate.userdata.invitations;

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
        onClick={() => dispatch(logout())}
      />
    </div>
  );

  return (
    <Fragment>
      <div className="userWithNoProject">
        <div className="large">
          <span>Hello, </span>{" "}
          <span className="navdiv-projecttext">
            {userstate.userdata.user.name}
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
