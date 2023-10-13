let jsonFileURL = "test.json";

let movieData;
let nod;

function fetchData(){
    fetch(jsonFileURL)
  .then((response) => {
    if (!response.ok) throw new Error("Some error");
    return response.json();
  })
  .then((data) => {
    console.log(JSON.stringify(data));
    nod = data.movies.length;
    movieData = data.movies;
    if (nod > 0) {
      // Pagination
      let nop = parseInt(nod / 10) + (nod % 10 > 0 ? 1 : 0);
      createPagination(nop);

      // table
      !document.getElementById("data-table") && createTable(data.movies[0]);
      fillTableFromData(data.movies, 1);
    }
  })
  .catch((error) => {
    console.error(error);
  });
}


const createTable = (dataObject) => {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let headerRow = document.createElement("tr");
  table.id = "data-table";
  tbody.id = "table-body";
  thead.id = "table-head";
  for (let field in dataObject) {
    let th = document.createElement("th");
    th.textContent = field.charAt(0).toUpperCase() + field.slice(1);
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById("table-container").appendChild(table);
};
const fillTableFromData = (movies, page) => {
  let tbody = document.getElementById("table-body");
  tbody.innerHTML = "";
  for (let i = page * 10 - 10; i < page * 10 && i < nod; i++) {
    let dataRow = document.createElement("tr");
    for (let mi in movies[i]) {
      let td = document.createElement("td");
      td.innerHTML = movies[i][mi];
      dataRow.appendChild(td);
    }
    tbody.appendChild(dataRow);
  }
};

const createPagination = (nop) => {
  i = 1;
  while (i <= nop) {
    let button = document.createElement("button");
    button.value = i;
    button.innerText = i;
    button.className = "page-button";
    button.onclick = (event) => {
      console.log(event.target.value);
      fillTableFromData(movieData, parseInt(event.target.value));
    };
    document.querySelector("#pagination-container").appendChild(button);
    i++;
  }
};
fetchData()
