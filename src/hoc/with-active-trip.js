import * as React from 'react';
// import { FavouriteOfferType } from '../../types';

const withActiveTrip = (WrappedComponent) => {
  class WithActiveTrip extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        active: false,
        current: undefined,
      };

      this._onSetActiveItem = this._onSetActiveItem.bind(this);
      this._onSetUnActiveItem = this._onSetUnActiveItem.bind(this);
    }

    _onSetActiveItem(trip) {
      this.setState({
        active: true,
        current: trip,
      });
    }

    _onSetUnActiveItem() {
      this.setState({
        active: false,
        current: null,
      });
    }

    render() {

      return (
        <WrappedComponent
          {...this.props}
          onTripClick={this._onSetActiveItem}
          onTripMouseOut={this._onSetUnActiveItem}
          current = {this.state.current}
        />
      );
    }

  }

  return WithActiveTrip;
};

export default withActiveTrip;
