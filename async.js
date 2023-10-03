console.log('Before');
getUser(1, (user) => {
    console.log('User', user);
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a db....  ')
        callback({ id: id, gutHubUserName: 'kencal20' });
    }, 2000);

}

