/* eslint-disable no-nested-ternary */
// == IMPORT PACKAGES
import React from 'react';
import PropTypes, { shape } from 'prop-types';
import DOMPurify from 'dompurify';

// == IMPORTS COMPONENTS
import {
  Grid,
  Header,
  Segment,
  Image,
  Label,
  Icon,
  Divider,
  Progress,
  Button,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

// == IMPORT STYLES
import './projectCard.scss';

// ==  SUB COMPONENT FAVORITES
const HeaderStar = ({
  project,
  size,
  logged,
  addToFavorite,
  removeFromFavorite,
}) => (
  <>
    <Header as="h3" size={`${size}`}>
      <Header.Content>
        <Link
          className="project-card--title"
          to={`/projet/${project.id}`}
        >{`${project.title} `}
        </Link>
      </Header.Content>
    </Header>
    {!project.isAuthor
      && logged
      && (project.isFavorite ? (
        <Button
          icon={{
            name: 'star',
            color: 'yellow',
          }}
          size="mini"
          onClick={() => {
            removeFromFavorite(project.id);
          }}
          title="Retirer des favoris"
          content="Retirer des favoris"
          labelPosition="left"
          basic
          compact
        />
      ) : (
        <Button
          icon={{
            name: 'star outline',
            color: 'yellow',
          }}
          size="mini"
          onClick={() => {
            addToFavorite(project.id);
          }}
          title="Ajouer aux favoris"
          content="Ajouter aux favoris"
          labelPosition="left"
          basic
          compact
        />
      ))}
  </>
);
HeaderStar.propTypes = {
  project: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};

// == CARD COMPONENT
const ProjectCard = ({
  logged,
  project,
  addToFavorite,
  removeFromFavorite,
}) => {
  const checkArr = project.needs.map((need) => (need.completed ? 1 : 0));
  const checkCount = checkArr.reduce((a, b) => a + b, 0);
  return (
    <Segment className="project-card--fullwidth" compact>
      {project.isArchived && (
        <Label
          color="grey"
          corner="right"
          icon="archive"
          title="Projet archivé"
          size="big"
        />
      )}
      <Grid divided stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column computer={4} only="computer" textAlign="center">
            <Link to={`/projet/${project.id}`}>
              <Image
                className="project-card--picture"
                src={`${DOMPurify.sanitize(project.image)}`}
                centered
                spaced
                rounded
              />
            </Link>
          </Grid.Column>
          <Grid.Column computer={12} mobile={16}>
            <Grid centered>
              <Grid.Row>
                <Grid.Column
                  className="project-card--padding-mobile"
                  only="mobile"
                  width={4}
                  textAlign="center"
                >
                  <Link to={`/projet/${project.id}`}>
                    <Image
                      src={`${DOMPurify.sanitize(project.image)}`}
                      centered
                      spaced
                      rounded
                      className="project-card--picture"
                    />
                  </Link>
                </Grid.Column>
                <Grid.Column
                  className="project-card--padding-mobile"
                  only="mobile"
                  width={12}
                >
                  <HeaderStar
                    project={project}
                    size="small"
                    logged={logged}
                    addToFavorite={addToFavorite}
                    removeFromFavorite={removeFromFavorite}
                  />
                </Grid.Column>
                <Grid.Column only="computer" width={16}>
                  <HeaderStar
                    project={project}
                    size="small"
                    logged={logged}
                    addToFavorite={addToFavorite}
                    removeFromFavorite={removeFromFavorite}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <p className="project-card--marged-top">
              <Image
                avatar
                spaced="right"
                src={`${DOMPurify.sanitize(project.author.avatar)}`}
              />
              {`${project.author.name}`}
            </p>
            <Segment basic compact>{`${project.description}`}</Segment>
            <p>
              <Icon name="target" />
              {`${project.location}`}
            </p>
            <Divider />
            <Label.Group>
              <Label
                basic
                title="Nombre de followers"
                icon="star"
                content={`${project.followers.length}`}
              />
              <Label
                basic
                title="Date de création du projet"
                content="Créé le"
                detail={`${project.creation_date}`}
              />
              <Label
                basic
                title="Date d'expiration du projet"
                content="Expire le"
                detail={`${project.expiration_date}`}
              />
              <Label
                as="a"
                basic
                href={`mailto:${project.author.email}`}
                content={`${project.author.email}`}
                icon="mail"
              />
            </Label.Group>
            <Progress
              value={checkCount}
              total={project.needs.length}
              progress="ratio"
              size="small"
              indicating
              content="Couverture des besoins"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

// == PROP TYPES
ProjectCard.propTypes = {
  logged: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    isAuthor: PropTypes.bool.isRequired,
    followers: PropTypes.arrayOf(
      shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    needs: PropTypes.arrayOf(
      shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    expiration_date: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};
// == Export
export default ProjectCard;
