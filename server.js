/* Promise -------------------------------------------------------------
function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = "Data fetched from server";
            resolve(data); // Simulates successful data fetching
        },2000);
    });
}

fetchData()
    .then((data) => {
        console.log(data); // Handles the resolved promise
    })
    .catch((error) =>{
        console.error("there was an error"); // handles any errors that occur
    });
*/

/* Async -------------------------------------------------------------
async function fetchData(){
    try {
        const data = await new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve("Data fetched from server");
            }, 2000);
        });
        console.log(data); // This will run after the promise is resolved
    }
    catch (error) {
        console.error("unable to fetch data"); // handles any errors that occur
    }
}

fetchData();
*/
/*
function divideNumbers(a,b){
    try {
        if (b === 0 || a === 0){
            throw new Error("Division by zero is not allowed.");
        }
        let result = a / b;
        console.log(`Result: ${result}`)
    }
    catch (error) {
        console.error(`Error Message: ${error.message}`);
    }
    finally {
        console.log("Division operation attempted.");
    }
}

divideNumbers(10,2); // outputs try and finally functions
divideNumbers(10,0); // Outputs the catch and finally functions
*/
/*
async function fetchData() {
    try {
        let response = await fetch("https://api.example.com/data");
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data, check connectivity:", error);
    }
}

fetchData()
*/
/* create a server --------------------------------------------------*/
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello, Shabbeer! server is running\n");
});

server.listen(port, hostname, () =>{
    console.log(`server running at http://${hostname}:${port}/`)
});
