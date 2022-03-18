const {readFile, writeFile} = require("fs")

const readUserDB = () => {
    return new Promise((resolve, reject)=>{
        readFile("userDB.txt", (err, data)=>{
            const a = JSON.parse(data)
            resolve(a)
        })
    })
}

function checkIfUserExist(username, password){
    return new Promise((resolve, reject)=>{
        const existingUserDB = readUserDB();
        existingUserDB
            .then(users=>{
                for (let index = 0; index < users.length; index++) {
                    console.log("********")
                    console.log("checking=>",users[index].username,users[index].password)
                    console.log(username, password)

                    if (users[index].username == username && users[index].password == password) {

                        // send true if user exists
                        resolve("both match");
                        break;
                        // return; 
                    }
                    else if (users[index].username == username) {
                        // send true if user exists
                        resolve("username matches");

                        return; 
                    }
                    else if (users[index].username == username) {
                        // send true if user exists
                        resolve("password matches");

                        return; 
                    }
                    
                }
                
                //resolve false if the user does not exist
                resolve(true)
            })
    })

}

// function to add somebody to the data base
function writeUserDB(username,password){
    // first check if the user exist
    checkIfUserExist(username,password)
        .then((res) => {
            console.log(res)
            if (res === false){
                //since user does not exist,
                // get all users from the data base
                readUserDB()
                    .then(allUser =>{
                        allUser.push({username,password})
                        const newDBcontent = JSON.stringify(allUser)
                        writeFile("userDB.txt", newDBcontent, ()=>{
                            console.log("A new user has been added to the DB")
                        })
                    })
            }

        }) //gets the ressolve i.e false (since user does not exist)

        .catch(err => console.log(err)) // gets the err i.e true


}

// testing function

writeUserDB("timpel","sumah")


