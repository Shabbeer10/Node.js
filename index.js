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