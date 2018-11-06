const localStorageName = {
    token: "jwtToken"
};

export const getLocalStorageName = key => {
    if(!key) return null

    return localStorageName[key]
}