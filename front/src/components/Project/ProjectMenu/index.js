// == Import npm
import React from 'react';
import PropTypes from 'prop-types';

// == IMPORTS CONTAINERS

// == IMPORTS COMPOSANTS
import {
  Button,
  Menu,
} from 'semantic-ui-react';
import ModalConfirm from 'src/components/ModalConfirm';

// == STYLES
import './projectMenu.scss';

// == Composant
const ProjectMenu = ({
  confirm,
  isEditMode,
  setEditModeOn,
  setConfirmation,
  handleArchiveProject,
  handleDeleteProject,
  handleBackToView,
}) => (
  <Menu compact icon secondary attached="bottom" borderless size="mini">
    {isEditMode
      ? (
        <Menu.Item
          name="backView"
          fitted="horizontally"
        >
          <Button
            type="button"
            icon="arrow alternate circle left"
            color="blue"
            title="Revenir à la consultation"
            content="Retour"
            labelPosition="left"
            compact
            onClick={handleBackToView}
          />
        </Menu.Item>
      )
      : (
        <>
          <Menu.Item
            name="Editer"
            fitted="horizontally"
          >
            <Button
              type="button"
              icon="edit"
              color="blue"
              title="Editer"
              compact
              onClick={(event) => {
                event.preventDefault();
                setEditModeOn();
              }}
            />
          </Menu.Item>
          <Menu.Item
            name="Archiver"
            fitted="horizontally"
          >
            <ModalConfirm
              title="Confirmer l'archivage de votre projet"
              trigger={(
                <Button
                  icon="archive"
                  color="brown"
                  title="Archiver"
                  compact
                />
              )}
              confirm={confirm}
              setConfirmation={setConfirmation}
              handleAction={handleArchiveProject}
            />
          </Menu.Item>
          <Menu.Item
            name="Supprimer"
            fitted="horizontally"
          >
            <ModalConfirm
              title="Confirmer la suppression de votre projet"
              trigger={(
                <Button
                  icon="trash"
                  color="red"
                  title="Supprimer"
                  compact
                />
              )}
              confirm={confirm}
              setConfirmation={setConfirmation}
              handleAction={handleDeleteProject}
            />
          </Menu.Item>
        </>
      )}
  </Menu>
);
ProjectMenu.propTypes = {
  confirm: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  setConfirmation: PropTypes.func.isRequired,
  handleArchiveProject: PropTypes.func.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
  handleBackToView: PropTypes.func.isRequired,
};

// == Export
export default ProjectMenu;
