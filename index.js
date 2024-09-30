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