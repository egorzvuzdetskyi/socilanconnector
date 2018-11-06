export const isTokenExpired = (decodedToken) => {
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime
}