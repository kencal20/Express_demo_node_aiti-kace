console.log('Before');
getUser(1, (user) => {
    console.log(user);

    getRepository(user.gutHubUserName, (repos) => {
        console.log(repos)
    })
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a db....  ')
        callback({ id: id, gutHubUserName: 'kencal20' });
    }, 2000);

}

function getRepository(username, callback) {
    setTimeout(() => {
        console.log('Displaying your repos ');
        callback({ repo: ['repo1', 'repo2', 'repo3'] })
    }, 2000);
}