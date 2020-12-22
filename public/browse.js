const url_string = window.location.href;
const url = new URL(url_string);

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

document.getElementById('test-app').parentNode.innerHTML = `
<div class="object">
<p>Loading...</p>
</div>
`

const GET_ITEM = `
query GetItems{
        allItems {
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

function createItem(item) {
  console.log(item)
    console.log(item)
    const mainItem = document.createElement('div');
    mainItem.classList.add('mainItem');
    const imageWrapper = document.createElement('div');

    const link = document.createElement('a');
    link.setAttribute('href', './index.html?id=' + item.id)
    const itemTitle = document.createElement('h1');
    itemTitle.innerHTML = item.name;
    const itemDesc = document.createElement('p');
    itemDesc.innerHTML = item.description;

    if(item.file != null && item.file.filename != null)
    {
        const itemFile = document.createElement('img');
        itemFile.setAttribute('src', '/public/files/' + item.file.filename);
        imageWrapper.appendChild(itemFile);
    }

    mainItem.appendChild(imageWrapper);
    link.appendChild(itemTitle);
    mainItem.appendChild(link);
    mainItem.appendChild(itemDesc);
    return mainItem;
}

function fetchData() {
    graphql(GET_ITEM)
    .then(function(vals) {
        console.log(vals);
        const results = document.createElement('div');
        results.classList.add('results');
        var noResults = true;
        vals.data.allItems.forEach(function(item) {
            var itm = createItem(item);
            results.appendChild(createItem(item));
            noResults = false;
        });
        if (noResults == true)
        {
            document.querySelector('.object').innerHTML = 'No results found.';
        }
        else
        {
            document.querySelector('.object').innerHTML = '<h1>Browse all Items</h1>';
            document.querySelector('.object').appendChild(results);
        }
    })
    .catch(function(error) {
    console.log(error);
    document.querySelector('.object').innerHTML = '<p>Error in browse.js/p>';
    });
}

fetchData();
