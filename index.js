let jsonFileURL = 'test.json'

fetch(jsonFileURL)
    .then(response=>{
        if(!response.ok)
            throw new Error('Some error')
        return response.json()
    })
    .then(data=> {
        console.log(JSON.stringify(data));
        if(data.movies.length>0){
            let tableContainer = document.querySelector("#table-container")
        }
        for(let data of data.movies){
            
        }
    })
    .catch(error=>{
        console.error(error)
    })