import { connect } from 'react-redux';
import { getStaticPage } from '../actions/staticPages.actions';
import Schedule from '../pages/public/schedule';


const mapStateToProps = (state) => {
  return {
    id: state.staticPage.id,
    title: state.staticPage.title,
    images: state.staticPage.images,
    texts: state.staticPage.texts,
    status: state.staticPage.status,
    error: state.staticPage.error,
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    getContent: (id) => {
      dispatch(getStaticPage(id));
    },
  };
}


const ScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Schedule);


export default ScheduleContainer;
