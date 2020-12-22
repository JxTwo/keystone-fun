function graphql(query, variables = {}) {
    return fetch('/admin/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variables,
        query,
      }),
    }).then(function(result) {
      return result.json();
    });
  }

const url_string = window.location.href;
const url = new URL(url_string);
const pid = url.searchParams.get("id");
console.log(pid);
console.log(typeof(pid))

const GET_ITEM = `
query ($pid: ID!) {
  Item (where: {id: $pid} ) {
    id
    name
    description
    file {filename}
  }
}
`;

const ADD_ITEM = `
mutation AddItem($name: String!) {
    createItem(data: { name: $name }) {
    name
    description
    }
}
`;

function createItem(result) {
  console.log(result)
    item = result.data.Item;
    console.log(item)
    const mainItem = document.createElement('div');
    mainItem.classList.add('mainItem');
    const itemFile = document.createElement('img');
    itemFile.setAttribute('src', '/public/files/' + item.file.filename)
    const itemTitle = document.createElement('h1');
    itemTitle.innerHTML = item.name;
    const itemDesc = document.createElement('p');
    itemDesc.innerHTML = item.description; 

    mainItem.appendChild(itemFile);
    mainItem.appendChild(itemTitle);
    mainItem.appendChild(itemDesc); 
    return mainItem;
}

function fetchData() {
    graphql(GET_ITEM, variables = {pid})
    .then(function(result) {
    document.querySelector('.object').innerHTML = '';
    console.log(result);
    const item = createItem(result);
    document.querySelector('.object').appendChild(item);
    })
    .catch(function(error) {
    console.log(error);
    document.querySelector('.object').innerHTML = '<p>Error</p>';
    });
}


document.getElementById('test-app').parentNode.innerHTML = `
<div class="object">
<p>Loading...</p>
</div>
`
fetchData()