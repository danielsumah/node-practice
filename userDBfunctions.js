const {readFile, writeFile, read} = require("fs")

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
                    if (users[index].username == username && users[index].password == password) {
                        // send true if user exists
                        reject("User with this username and password exists");

                        return; 
                        //the purpose of the return above
                        //  is to meke sure that the code does not pass 
                        //this line after reject
                    }
                }
                
                //resolve false if the user does not exist
                resolve(false)
            })
    })

}

// function to add somebody to the data base
function writeUserDB(username,password){
    // first check if the user exist
    checkIfUserExist(username,password)
        .then(res => {
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


