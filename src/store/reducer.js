const defaultState = {data: "" };
export default ( state = defaultState , action ) => {
  if ( action.type === "GET_TABLE_DATA" ) {
    const newState = JSON.parse(JSON.stringify( state ));
    newState.data = action.data;
    return newState;
  }
  return state;
}