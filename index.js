/* callback --------------------------------------------------------------------

// synchronous function
function fetchData (callback){
    setTimeout(()=>{
        const data = "Sample data";
        callback(data);
    }, 1000);
}

fetchData(data => {
    console.log(data); // Outputs: Sample Data after 1 second
});
*/

/*
// Promise -------------------------------------------------------------------

function fetchData() {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const data = "This is sample data";
            resolve(data);
            // Or reject("Error message") in case of an error
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log(data); // Outputs: Sample Data after 1 second
    })
    .catch(error=>{
        console.error(error);
    });
*/

/*
// Async/Await ------------------------------------------------------

async function fetchData() {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            const data = "this is sample data";
            resolve(data);
        }, 500);
    });
}

async function displayData() {
    try{
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

displayData();
*/

/*
// Fetching Data from an API ---------------------------------------------

async function getUserData(userId){
    try{
        const response = await fetch(`https://127.0.0.1:3000/items/id=4`);
        if (!response.ok) throw new Error("Network response was not okay");
        const user = await response.json();
        console.log(user);
    } catch (error){
        console.error("Fetching user data has failed:", error);
    }
}

getUserData(1);
*/

let p = new Promise((resolve,reject) => {
    let a = 1+1
    if (a == 2) {
        resolve("Success")
    }
    else {
        reject("failed")
    }
})

p.then((message)=>{
    console.log("this is in the then " + message)
})
.catch((message)=> {
    console.log("this is in the catch"+ message)
})