var count = 0;

var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Update event
itemList.addEventListener('click', upadteItem);

// Using axios to post data
function postData(newItem, newItemDesc, newItemPrice, newItemQnty) {
  const obj = {
    newItem,
    newItemDesc,
    newItemPrice,
    newItemQnty
  }
  const axiosData = axios.post('https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD', obj);
  axiosData
    .then(res => {
      appendData(newItem, newItemDesc, newItemPrice, newItemQnty, res.data.id);
    })
    .catch(err => console.log(err))
}

// Using axios to get data
function getData(itemId = '') {
  var data = axios.get(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`);
  data
    .then(res => {
      itemList.innerHTML = ''; // clears list before getting items from server
      for (let i = 0; i < res.data.length; i++) {
        appendData(res.data[i].newItem, res.data[i].newItemDesc, res.data[i].newItemPrice, res.data[i].newItemQnty, res.data[i].id)
      }
    })
    .catch(err => console.log(err))

  return data;
}
getData();

// Using axios to delete data
function updateData(itemId, num) {
  var itemData = getData(itemId);
  itemData
    .then(res => {
      let newItemQnty = parseInt(res.data.newItemQnty - num).toString();
      let newItem = res.data.newItem;
      let newItemDesc = res.data.newItemDesc;
      let newItemPrice = res.data.newItemPrice;

      var obj = {
        newItem,
        newItemDesc,
        newItemPrice,
        newItemQnty
      }

      axios.put(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`, obj)
        .then(() => {
          getData();
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
}

// Using axios to delete data
function deleteData(itemId) {
  axios.delete(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`)
    .then()
    .catch(err => console.log(err));
}

// function to append data from post in html
function appendData(newItem, newItemDesc, newItemPrice, newItemQnty, newItemId) {
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem + ' - '));
  li.appendChild(document.createTextNode(newItemDesc + ' - '));
  li.appendChild(document.createTextNode(newItemPrice + ' - '));
  li.appendChild(document.createTextNode(newItemQnty));

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.id = newItemId;
  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn);

  var buy3 = document.createElement('button');
  buy3.className = 'btn btn-sm float-right buy-items';
  buy3.id = 'three';
  buy3.setAttribute('editId', newItemId);
  buy3.appendChild(document.createTextNode('Buy 3'));
  li.appendChild(buy3);
  var buy2 = document.createElement('button');
  buy2.className = 'btn btn-sm float-right buy-items';
  buy2.id = 'two';
  buy2.setAttribute('editId', newItemId);
  buy2.appendChild(document.createTextNode('Buy 2'));
  li.appendChild(buy2);
  var buy1 = document.createElement('button');
  buy1.className = 'btn btn-sm float-right buy-items';
  buy1.id = 'one';
  buy1.setAttribute('editId', newItemId);
  buy1.appendChild(document.createTextNode('Buy 1'));
  li.appendChild(buy1);

  itemList.appendChild(li);
}

// Add item to the list
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItemDesc = document.getElementById('description').value;
  var newItemPrice = document.getElementById('price').value;
  var newItemQnty = document.getElementById('quantity').value;

  postData(newItem, newItemDesc, newItemPrice, newItemQnty);

  form.reset();
}

// Update item
function upadteItem(e) {
  if (e.target.classList.contains('buy-items')) {
    let x = 0;
    if (e.target.id === 'one') {
      x = 1;
    } else if (e.target.id === 'two') {
      x = 2;
    } else {
      x = 3;
    }

    const itemId = e.target.getAttribute('editId');

    updateData(itemId, x);
  }
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    var li = e.target.parentElement;
    var itemId = e.target.id;
    itemList.removeChild(li);
    deleteData(itemId);
  }
}