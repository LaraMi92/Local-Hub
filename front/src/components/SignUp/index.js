// == Import npm
import React from 'react';

// == IMPORTS COMPOSANTS
import { Form, Header, Input } from 'semantic-ui-react';

// == IMPORTS CONTAINERS

// == STYLES
import './SignUp.scss';

// == Composant
const SignUp = () => (
  <div className="sign-up">
    {/* titre */}
    <Header as="h1">Création du compte</Header>
    <Form>
      {/* pseudo */}
      <Form.Field>
        <Input type="text" placeholder="Nom d'utilisateur" />
      </Form.Field>
      {/* email */}
      <Form.Field>
        <Input type="email" placeholder="utilisateur@domain.xyz" />
      </Form.Field>
      {/* mot de passe */}
      <Form.Field>
        <Input type="password" placeholder="Mot de passe" />
      </Form.Field>
      {/* confirm de mot passe */}
      <Form.Field>
        <Input type="password" placeholder="Confirmer mot de passe" />
      </Form.Field>
    </Form>

    {/* bouton annuler */}
    {/* bouton valider */}
  </div>
);

// == Export
export default SignUp;