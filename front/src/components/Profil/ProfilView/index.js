// == IMPORT PACKAGES
import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

// == IMPORTS COMPONENTS
import {
  Button,
  Item,
  Segment,
} from 'semantic-ui-react';

import ModalConfirm from 'src/components/ModalConfirm';

// == IMPORT STYLES
import './profilView.scss';

// == PRIMARY COMPONENT
const ProfilView = ({
  name,
  email,
  avatar,
  confirm,
  isError,
  error,
  isMessage,
  message,
  setConfirmation,
  deleteProfil,
  switchToEditProFile,
  redirectToPasswordEdit,
  redirectToMyProjects,
  redirectToMyFavorites,
}) => (
  <Segment className="profil-view--container" textAlign="left">
    <Item.Group relaxed>
      <Item className="profil-view--no-margin-top">

        {/* USER AVATAR */}
        <Item.Image size="small" src={`${DOMPurify.sanitize(avatar)}`} />
        <Item.Content>

          {/* USER NAME */}
          <Item.Header as="h2">{`${name}`}</Item.Header>
          <Item.Meta>

            {/* LINK TO USER EMAIL */}
            <a href={`mailto:${email}`}>{`${email}`}</a>
          </Item.Meta>

          <Item.Description>
            <div className="profil-view--centered-content">
              <Button.Group>

                {/* BUTTON - MY PROJECTS */}
                <Button
                  basic
                  color="green"
                  onClick={redirectToMyProjects}
                >Mes projets
                </Button>

                {/* BUTTON - MY FAVORITES */}
                <Button
                  basic
                  color="green"
                  onClick={redirectToMyFavorites}
                >Mes favoris
                </Button>
              </Button.Group>
            </div>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>

    <div className="profil-view--centered-content">
      <Button.Group vertical>

        {/* BUTTON - ACCOUNT EDIT */}
        <Button
          basic
          color="blue"
          onClick={() => {
            switchToEditProFile();
          }}
        >Modifier mes informations personnelles
        </Button>

        {/* BUTTON - PASSWORD EDIT */}
        <Button
          className="profil-view--marged"
          basic
          color="orange"
          onClick={redirectToPasswordEdit}
        >Modification du mot de passe
        </Button>

        {/* BUTTON - MODAL - DELETE ACCOUNT */}
        <ModalConfirm
          title="Confirmer la suppression définitive de votre compte utilisateur"
          content="Attention, la suppression de votre compte entrainera la suppression de toutes les fiches projets (en cours, archivées) dont vous êtes l'auteur."
          trigger={<Button className="profil-view--marged" negative>Supprimer votre compte</Button>}
          confirm={confirm}
          setConfirmation={setConfirmation}
          handleAction={deleteProfil}
          isError={isError}
          error={error}
          isMessage={isMessage}
          message={message}
        />
      </Button.Group>
    </div>
  </Segment>
);

ProfilView.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isMessage: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setConfirmation: PropTypes.func.isRequired,
  deleteProfil: PropTypes.func.isRequired,
  switchToEditProFile: PropTypes.func.isRequired,
  redirectToPasswordEdit: PropTypes.func.isRequired,
  redirectToMyProjects: PropTypes.func.isRequired,
  redirectToMyFavorites: PropTypes.func.isRequired,
};

// == Export
export default ProfilView;
