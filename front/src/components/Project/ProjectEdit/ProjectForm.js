// == IMPORT PACKAGES
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

// IMPORT DATE UTIL
import dateFormater from 'src/utils/dateHTMLFormater';

// == IMPORTS COMPONENTS
import {
  Button, Form, Image, Segment,
} from 'semantic-ui-react';

// == STYLES
import './projectForm.scss';

// == COMPONENT
const ProjectForm = ({
  title,
  // eslint-disable-next-line camelcase
  expiration_date,
  description,
  image,
  location,
  syncProjectFields,
  setProjectField,
  handleFileChange,
  handleSubmit,
}) => {
  const fileInputRef = React.createRef();
  useEffect(() => {
    syncProjectFields();
  }, []);
  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          label="Titre du projet"
          title="Titre du projet"
          placeholder="Un potager urbain - Place de la Duchesse Anne"
          required
          value={title}
          onChange={(event) => {
            setProjectField({ title: event.target.value });
          }}
        />
        <Form.Input
          type="text"
          label="Localité du projet (adresse, ville, code postale)"
          title="Localité du projet"
          placeholder="Place de la Duchesse Anne 44000 NANTES"
          required
          value={location}
          onChange={(event) => {
            setProjectField({ location: event.target.value });
          }}
        />
        <Form.TextArea
          label="Description du projet"
          title="Description du projet"
          placeholder="Les potagers urbains se définissent simplement comme la culture de légumes ..."
          maxLength={700}
          spellCheck
          cols={100}
          wrap="soft"
          value={description}
          onChange={(event) => {
            setProjectField({ description: event.target.value });
          }}
        />
        <Form.Input
          type="date"
          label="Date d'échéance"
          title="Date d'échéance"
          placeholder={dateFormater(
            new Date().getTime() + (60 * 60 * 24 * 1000 * 30),
          )}
          min={dateFormater(new Date())}
          max={dateFormater(new Date().getTime() + 60 * 60 * 24 * 1000 * 900)}
          required
          value={dateFormater(expiration_date)}
          onChange={(event) => {
            setProjectField({ expiration_date: event.target.value });
          }}
        />
        <Form.Field>
          <Image
            src={`${DOMPurify.sanitize(image)}`}
            spaced="right"
            size="small"
            title="Illustration projet"
          />
          <Button
            className="project-form--button-color"
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
        <Segment
          className="project-form--align-right"
          basic
          compact
          textAlign="right"
        >
          <Button
            className="project-form--modify-color"
            type="submit"
            title="Modifier votre projet"
            content="Modifier"
            onClick={handleSubmit}
          />
        </Segment>
      </Form>
    </Segment>
  );
};
// == PROP TYPES
ProjectForm.propTypes = {
  title: PropTypes.string.isRequired,
  expiration_date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  syncProjectFields: PropTypes.func.isRequired,
  setProjectField: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// == Export
export default ProjectForm;
