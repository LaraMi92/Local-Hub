// == IMPORT PACKAGES
import React, { useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import DOMPurify from 'dompurify';

// == IMPORTS COMPONENTS
import {
  Accordion,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Progress,
  Segment,
} from 'semantic-ui-react';

import ProjectMap from '../../ProjectMap';

// == STYLES
import './description.scss';

// SUB COMPONENT - FAVORITES
const HeaderStar = ({
  project,
  size,
  logged,
  addToFavorite,
  removeFromFavorite,
}) => (
  <>
    <Header as="h3" size={`${size}`}>
      <Header.Content className="header--title">{`${project.title} `}</Header.Content>
    </Header>
    <Segment compact basic className="description--marged-none">
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
            content="Ajouter aux favoris"
            labelPosition="left"
            basic
            compact
          />
        ))}
    </Segment>
  </>
);
HeaderStar.propTypes = {
  project: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  logged: PropTypes.bool.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};

// == COMPONENT
const Description = ({
  logged,
  project,
  needs,
  addToFavorite,
  removeFromFavorite,
}) => {
  const checkArr = needs.map((need) => (need.completed ? 1 : 0));
  const checkCount = checkArr.reduce((a, b) => a + b, 0);

  const [state, setState] = useState({ activeIndex: 0 });

  const handleClick = (e, itemProps) => {
    const { index } = itemProps;
    const newIndex = state.activeIndex === index ? -1 : index;
    setState({ activeIndex: newIndex });
  };

  return (
    <>
      <Segment className="project-description" basic>
        {project.isArchived && (
          <Label
            color="grey"
            title="Projet archivé"
            corner="right"
            icon="archive"
            size="big"
          />
        )}
        <Grid divided="vertically">
          <Grid.Row only="computer">
            <Segment className="project-description--segment-image" basic>
              <Image
                className="project-description--image"
                src={`${DOMPurify.sanitize(project.image)}`}
                centered
                spaced
                rounded
              />
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column only="computer" computer={7}>
              <Segment
                className="project-description--segment-map"
                basic
                textAlign="center"
              >
                {project.lat !== 0 && <ProjectMap project={project} />}
              </Segment>
            </Grid.Column>
            <Grid.Column computer={9} mobile={16}>
              <Grid verticalAlign="middle">
                <Grid.Row only="mobile">
                  <Segment className="project-description--segment-image" basic>
                    <Image
                      className="project-description--image"
                      src={`${DOMPurify.sanitize(project.image)}`}
                      centered
                      spaced
                      rounded
                    />
                  </Segment>
                </Grid.Row>
                <Grid.Row className="project-description--row-padding-less">
                  <Segment
                    className="project-description--marged-no-vertically"
                    basic
                  >
                    <HeaderStar
                      project={project}
                      size="large"
                      logged={logged}
                      addToFavorite={addToFavorite}
                      removeFromFavorite={removeFromFavorite}
                    />
                    <p className="project-description--marged-top">
                      <Image
                        avatar
                        spaced="right"
                        src={`${DOMPurify.sanitize(project.author.avatar)}`}
                        size="mini"
                      />
                      {`${project.author.name}`}
                    </p>
                    <p className="project-description--marged-top">
                      <Icon name="target" />
                      {`${project.location}`}
                    </p>
                  </Segment>
                  <Segment
                    className="project-description--marged-no-vertically"
                    basic
                  >
                    <Divider horizontal>Description</Divider>
                    {`${project.description}`}
                    <Divider />
                  </Segment>
                  <Segment
                    className="project-description--marged-no-vertically"
                    basic
                  >
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
                  </Segment>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Progress
          value={checkCount}
          total={needs.length}
          progress="ratio"
          size="medium"
          indicating
        >
          Couverture des besoins
        </Progress>
      </Segment>
      <Grid className="project-description--map-grid" verticalAlign="middle">
        <Grid.Row only="mobile">
          <Accordion
            className="project-description"
            styled
            exclusive={false}
            fluid
          >
            <Accordion.Title
              active={state.activeIndex === 0}
              index={0}
              onClick={handleClick}
              as="h2"
            >
              <Icon name="dropdown" />
              Carte
            </Accordion.Title>
            <Accordion.Content
              className="project-description--dropdown-map"
              active={state.activeIndex === 0}
            >
              {project.lat !== 0 && <ProjectMap project={project} />}
            </Accordion.Content>
          </Accordion>
        </Grid.Row>
      </Grid>
    </>
  );
};
// == PROP TYPES
Description.propTypes = {
  logged: PropTypes.bool.isRequired,
  project: PropTypes.shape({
    isFavorite: PropTypes.bool.isRequired,
    isArchived: PropTypes.bool.isRequired,
    isAuthor: PropTypes.bool.isRequired,
    followers: PropTypes.arrayOf(
      shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
    expiration_date: PropTypes.string.isRequired,
    creation_date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  needs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  addToFavorite: PropTypes.func.isRequired,
  removeFromFavorite: PropTypes.func.isRequired,
};

// == Export
export default Description;
