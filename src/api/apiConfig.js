const apiConfig = {
    baseUrl: 'https://msmovies-backend-production.up.railway.app',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}


export default apiConfig;