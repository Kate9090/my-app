import NameSpace from "../name-spaces";

const NAME_SPACE = NameSpace.USER;

export const getActiveTrip = (state) => {
  return state[NAME_SPACE].activeTrip;
};

