// == IMPORTS PACKAGES
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

// == IMPORTS COMPONENTS
import {
  Button, Form, Image, Segment,
} from 'semantic-ui-react';

// == IMPORT STYLES
import './profilEdit.scss';

// == PRIMARY COMPONENT
const ProfilEdit = ({
  name,
  email,
  avatar,
  refreshAppProfil,
  setProfilValue,
  cleanProfil,
  handleFileChange,
  handleCancel,
  handleSubmit,
}) => {
  const fileInputRef = React.createRef();
  useEffect(() => {
    refreshAppProfil();
    return () => {
      cleanProfil();
    };
  }, []);
  return (
    <Segment textAlign="left">
      <Form onSubmit={handleSubmit}>
        {/** USER NAME */}
        <Form.Input
          type="text"
          label="Nom d'utilisateur"
          title="Nom d'utilisateur"
          placeholder="Albert Dupont"
          required
          value={name}
          onChange={(event) => {
            setProfilValue({ name: event.target.value });
          }}
        />

        {/** USER EMAIL */}
        <Form.Input
          type="email"
          label="Email utilisateur"
          title="Email utilisateur"
          placeholder="albert.dupont@project-hub.fr"
          autoComplete="current-user"
          required
          value={email}
          onChange={(event) => {
            setProfilValue({ email: event.target.value });
          }}
        />

        <Form.Field>
          <Image
            src={`${DOMPurify.sanitize(avatar)}`}
            spaced="right"
            size="small"
            title="Avatar utilisateur"
          />
          <Button
            className="modify-button"
            type="button"
            icon="file"
            labelPosition="left"
            content="Choisir une illustration"
            title="Choisir une illustration"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Form.Field>

        <Segment basic textAlign="right">
          <Button.Group>
            <Button
              className="profile-edit--modify-button"
              positive
              type="submit"
              title="Modifier"
              content="Modifier"
            />
            <Button.Or text="ou" />

            <Button
              type="button"
              title="Retour"
              content="Retour"
              onClick={handleCancel}
            />
          </Button.Group>
        </Segment>
      </Form>
    </Segment>
  );
};

ProfilEdit.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  refreshAppProfil: PropTypes.func.isRequired,
  setProfilValue: PropTypes.func.isRequired,
  cleanProfil: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// == Export
export default ProfilEdit;
