const initialState = {
  activeTrip: {},
};

const ActionCreator = ({

  'showActiveTrip': (trip) => ({
    type: `SHOW_ACTIVE_OFFER`,
    payload: trip,
  }),

});

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case `SHOW_ACTIVE_OFFER`:
      return Object.assign({}, state, {
        activeTrip: action.payload,
      });

  }

  return state;
};

export {reducer, ActionCreator};
