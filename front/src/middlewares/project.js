/* eslint-disable camelcase */
// == IMPORT NPM
import axios from 'axios';
import { goBack, push } from 'connected-react-router';

// graphql queries
import configGraphQl, {
  queryByProjectsByAuthor,
  queryByProjectsByFavorites,
  queryCreateProject,
  queryEditProject,
  queryProjectById,
  queryDeleteProject,
  queryGetProjectsByGeo,
  queryArchivedProject,
} from 'src/apiConfig/';

import connector from 'src/apiConfig/queryWithToken';

// actions from store
import {
  GET_PROJECTS_BY_AUTHOR,
  GET_PROJECTS_BY_FAVORITES,
  PROJECT_CREATE,
  PROJECT_EDIT,
  PROJECT_DELETE_CURRENT,
  PROJECT_ARCHIVED_CURRENT,
  GET_PROJECT_BY_ID,
  GET_PROJECT_BY_GEO,
  updateProjectStore,
  cleanProject,
} from 'src/store/actions/project';

import {
  appLoadingOn,
  appLoadingOff,
  appMsgUpdate,
  appErrorUpdate,
  appMsgClean,
  appErrorClean,
} from 'src/store/actions/app';

// == PARSE DATE UTIL FUNCTION :
const parseDate = (dateApiString) => (
  new Date(dateApiString).toLocaleDateString('fr-FR')
);

// mw
const projectMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_PROJECT_BY_GEO: {
      const data = JSON.stringify({
        ...queryGetProjectsByGeo,
        variables: action.payload,
      });
      const config = {
        ...configGraphQl,
        data,
      };
      axios(config)
        .then((response) => {
          const projects = response.data.data.projectsByGeo.map((project) => ({
            id: project.id,
            isFavorite: project.isFollowed,
            isArchived: project.archived,
            isAuthor: project.userIsAuthor,
            title: project.title,
            followers: project.followers.sort((follower1, follower2) => (
              parseInt(follower1.id, 10) > parseInt(follower2.id, 10) ? 1 : -1
            )),
            location: project.location,
            description: project.description.length > 75 ? `"${project.description.substr(0, 75)}..."` : `"${project.description}"`,
            expiration_date: parseDate(project.expiration_date),
            creation_date: parseDate(project.created_at),
            image: project.image === null ? 'https://react.semantic-ui.com/images/wireframe/image.png' : project.image,
            author: {
              id: project.author.id,
              name: project.author.name,
              email: project.author.email,
              avatar: project.author.avatar === null ? 'https://react.semantic-ui.com/images/avatar/large/matt.jpg' : project.author.avatar,
            },
            needs: project.needs.sort((need1, need2) => (
              parseInt(need1.id, 10) > parseInt(need2.id, 10) ? 1 : -1
            )),
          }));
          store.dispatch(updateProjectStore({ projects }));
          store.dispatch(push('/projets'));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case GET_PROJECT_BY_ID: {
      const data = JSON.stringify({
        ...queryProjectById,
        variables: { ...action.payload },
      });
      const config = {
        ...configGraphQl,
        data,
      };
      axios(config)
        .then((response) => {
          const apiData = response.data.data.project;
          const project = {
            id: apiData.id,
            isFavorite: apiData.isFollowed,
            isArchived: apiData.archived,
            isAuthor: apiData.userIsAuthor,
            title: apiData.title,
            followers: apiData.followers.sort((follower1, follower2) => (
              parseInt(follower1.id, 10) > parseInt(follower2.id, 10) ? 1 : -1
            )),
            description: apiData.description,
            location: apiData.location,
            expiration_date: parseDate(apiData.expiration_date),
            creation_date: parseDate(apiData.created_at),
            image: apiData.image === null ? 'https://react.semantic-ui.com/images/wireframe/image.png' : apiData.image,
            author: {
              id: apiData.author.id,
              name: apiData.author.name,
              email: apiData.author.email,
              avatar: apiData.author.avatar === null ? 'https://react.semantic-ui.com/images/avatar/large/matt.jpg' : apiData.author.avatar,
            },
            needs: apiData.needs.sort((need1, need2) => (
              parseInt(need1.id, 10) > parseInt(need2.id, 10) ? 1 : -1
            )),
          };
          store.dispatch(updateProjectStore({ project }));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(cleanProject());
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case PROJECT_CREATE: {
      const data = JSON.stringify({
        ...queryCreateProject,
        variables: {
          ...action.payload,
        },
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'insertProject', store.dispatch)
        .then((response) => {
          const { data: { data: { insertProject: { id } } } } = response;
          store.dispatch(push(`/projet/${id}`));
          store.dispatch(appMsgUpdate('Vous avez créé une nouvelle fiche projet.'));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case PROJECT_EDIT: {
      const data = JSON.stringify({
        ...queryEditProject,
        variables: {
          ...action.payload,
        },
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'editProject', store.dispatch)
        .then(() => {
          store.dispatch(appMsgUpdate('Votre projet à été modifié.'));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case PROJECT_DELETE_CURRENT: {
      const { project: { project: { id } } } = store.getState();
      const data = JSON.stringify({
        ...queryDeleteProject,
        variables: { id },
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'deleteProject', store.dispatch)
        .then(() => {
          store.dispatch(goBack());
          store.dispatch(cleanProject());
          store.dispatch(appMsgUpdate('Votre projet à été supprimmé définitivement.'));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case PROJECT_ARCHIVED_CURRENT: {
      const { project: { project: { id } } } = store.getState();
      const data = JSON.stringify({
        ...queryArchivedProject,
        variables: { id },
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'archiveProject', store.dispatch)
        .then(() => {
          store.dispatch(goBack());
          store.dispatch(cleanProject());
          store.dispatch(appMsgUpdate('Votre projet à été archivé.'));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appLoadingOn());
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case GET_PROJECTS_BY_AUTHOR: {
      // requête à l'API
      const data = JSON.stringify({
        ...queryByProjectsByAuthor,
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'myInfos', store.dispatch)
        .then((response) => {
          store.dispatch(appLoadingOn());
          store.dispatch(updateProjectStore(response.data.data.myInfos.projectsCreated));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    case GET_PROJECTS_BY_FAVORITES: {
      const data = JSON.stringify({
        ...queryByProjectsByFavorites,
      });
      const config = {
        ...configGraphQl,
        data,
      };
      connector(config, 'myInfos', store.dispatch)
        .then((response) => {
          store.dispatch(appLoadingOn());
          store.dispatch(updateProjectStore(response.data.data.myInfos.projectsFollowed));
        })
        .catch((error) => {
          store.dispatch(appErrorUpdate(error.message));
        })
        .finally(() => {
          store.dispatch(appLoadingOff());
        });
      store.dispatch(appMsgClean());
      store.dispatch(appErrorClean());
      return;
    }
    default:
      next(action);
      break;
  }
};

export default projectMiddleware;
