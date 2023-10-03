console.log('Before');
// getUser(1, (user) => {
//     getRepository(user.gutHubUserName, (repos) => {
//         getCommits(repos, (commits) => {

//         })
//     })
// });

getUser(1)
    .then(user => getRepository(user.gutHubUserName))
    .then(repo => getCommits(repo[0]))
    .then(commits => console.log('Commits', commits))


console.log('After');


function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a db....  ')
            resolve({ id: id, gutHubUserName: 'kencal20' });
        }, 2000);
    })


}

function getRepository(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Displaying your repos ');
            resolve({ repo: ['repo1', 'repo2', 'repo3'] })
        }, 2000);
    })

}

function getCommits(repo) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('calling github api....')
            resolve("commit")
        })
    })
}
