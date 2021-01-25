import { connect } from 'react-redux';

import List from 'src/components/Projects/List';

const mapStateToProps = (state) => ({
  logged: state.user.logged,
  projects: state.projet.projects,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(List);