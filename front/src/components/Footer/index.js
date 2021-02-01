// == IMPORT NPM
import React from 'react';

// == IMPORT COMPOSANTS
import {
  Icon, Segment, Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// == IMPORT STYLES
import './footer.scss';

const Footer = () => (
  <Segment className="footer" attached="bottom" compact inverted textAlign="center">
    <Grid centered className="footer--icon">
      <Grid.Row only="computer"><Link to="/equipe" title="L'équipe Local-Hub"><Icon name="code" size="large" inverted /></Link></Grid.Row>
      <Grid.Row only="mobile"><Link to="/equipe" title="L'équipe Local-Hub"><Icon name="code" size="small" inverted /></Link></Grid.Row>
    </Grid>
  </Segment>
);

export default Footer;