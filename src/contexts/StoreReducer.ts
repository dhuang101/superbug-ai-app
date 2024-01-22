function StoreReducer(state, action) {
	switch (action.type) {
		case "UPDATE_API":
			return {
				apiUrl: action.payload,
			}
		case "TOGGLE_DARK":
			return {
				darkMode: !state.darkMode,
			}
		default:
			return state
	}
}

export default StoreReducer
