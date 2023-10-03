console.log('Before');
getUser(1); 
console.log('After')
function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a db....  ')
        return{id:id,gutHubUserName:'kencal20'}
    }, 2000);
}