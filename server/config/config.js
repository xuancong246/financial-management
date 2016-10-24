var rootPath = __dirname + '/../..';

module.exports = {
    db: 'mongodb://localhost/cpsolutions',
    port: 3000,
    viewsPath: rootPath + '/server/views',
    staticPath: rootPath + '/public',
    stylusSrcPath: rootPath + '/public',
    partialsPath: rootPath + '/public/app'
};
