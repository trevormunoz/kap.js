import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ping } from '../actions/search';
import StatusNotification from '../components/StatusNotification';
import SearchFormContainer from '../containers/SearchFormContainer';
import ResultList from '../components/ResultList';
import Paginator from '../containers/Paginator';

class SearchApp extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(ping());
  }

  render() {
    const { endpointStatus, statusMessage, search } = this.props;
    return (
      <div className="search-container">
        {endpointStatus === 'error'
          ? <StatusNotification status={endpointStatus} message={statusMessage} />
          : <SearchFormContainer />
        }
        <ResultList {...search} />
        <Paginator />
      </div>
    );
  }
}

SearchApp.propTypes = {
  endpointStatus: PropTypes.string.isRequired,
  statusMessage: PropTypes.string,
  search: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    endpointStatus: state.endpoint.status,
    statusMessage: state.endpoint.message,
    search: state.query
  };
}


export default connect(mapStateToProps)(SearchApp)
