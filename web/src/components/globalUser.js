//This is just an ugly way to store the active User - not really a component
let activeUser = '';

 export function changeUser(name) {
    activeUser=name;
}

export function getUser(){
     return activeUser;
 }
