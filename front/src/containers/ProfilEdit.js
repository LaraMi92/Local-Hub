import { connect } from 'react-redux';

import ProfilEdit from 'src/components/Profil/ProfilEdit';

import { appUpdateProfil, appRefreshProfil, appEditProfilOff } from 'src/store/actions/app';
import { editUser } from 'src/store/actions/user';

const mapStateToProps = (state) => ({
  name: state.app.profil.name,
  email: state.app.profil.email,
});

const mapDispatchToProps = (dispatch) => ({
  refreshAppProfil: () => {
    dispatch(appRefreshProfil());
  },
  setProfilValue: (payload) => {
    dispatch(appUpdateProfil(payload));
  },
  abortEditProfil: (event) => {
    event.preventDefault();
    dispatch(appEditProfilOff());
  },
  handleSubmit: (event) => {
    event.preventDefault();
    dispatch(editUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilEdit);