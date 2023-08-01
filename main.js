var form = document.getElementById('addForm');
var tableItems = document.getElementById('table-body');
let table = document.getElementById('items');
let h5 = document.getElementById('no-stock');

form.addEventListener('submit', addItem);
tableItems.addEventListener('click', removeItem);
tableItems.addEventListener('click', updateItem);

// Using axios to post data
async function postData(newItem, newItemDesc, newItemPrice, newItemQnty) {
  const obj = {
    newItem,
    newItemDesc,
    newItemPrice,
    newItemQnty
  };
  try {
    const res = await axios.post('https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD', obj);
    h5.style.display = 'none';
    table.style.width = '100%';
    appendData(newItem, newItemDesc, newItemPrice, newItemQnty, res.data.id);
  } catch (err) {
    console.log(err);
  }
}

// Using axios to get data
async function getData(itemId = '') {
  try {
    const res = await axios.get(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`);
    tableItems.innerHTML = ''; // clears list before getting items from server
    len = res.data.length;
    if (len === 0) {
      h5.style.display = 'block';
      table.style.width = '59%';
    } else {
      h5.style.display = 'none';
      table.style.width = '100%';
      for (let i = 0; i < len; i++) {
        appendData(res.data[i].newItem, res.data[i].newItemDesc, res.data[i].newItemPrice, res.data[i].newItemQnty, res.data[i].id, len);
      }
    }
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
}
getData();

// Using axios to delete data
async function updateData(itemId, num) {
  try {
    const res = await getData(itemId);
    let newItemQnty = parseInt(res.data.newItemQnty - num).toString();
    let newItem = res.data.newItem;
    let newItemDesc = res.data.newItemDesc;
    let newItemPrice = res.data.newItemPrice;

    if (newItemQnty <= 0) { // for out of stock
      console.log('Out of stock!');
      // newItemQnty = 0;
      await deleteData(itemId);
    } else {
      var obj = {
        newItem,
        newItemDesc,
        newItemPrice,
        newItemQnty
      };
      await axios.put(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`, obj);
      await getData();
    }
  } catch (err) {
    console.log(err);
  }
}

// Using axios to delete data
async function deleteData(itemId) {
  try {
    await axios.delete(`https://64c4010f67cfdca3b6608d2e.mockapi.io/CRUD/${itemId}`);
    await getData();
  } catch (err) {
    console.log(err);
  }
}

// function to append data from post in html
function appendData(newItem, newItemDesc, newItemPrice, newItemQnty, newItemId) {
  var tr = document.createElement('tr');
  tr.className = 'items-row';

  var td1 = document.createElement('td');
  td1.appendChild(document.createTextNode(newItem));
  tr.appendChild(td1);
  var td2 = document.createElement('td');
  td2.appendChild(document.createTextNode(newItemDesc));
  tr.appendChild(td2);
  var td3 = document.createElement('td');
  td3.appendChild(document.createTextNode(newItemPrice));
  tr.appendChild(td3);
  var td4 = document.createElement('td');
  td4.appendChild(document.createTextNode(newItemQnty));
  tr.appendChild(td4);

  var buy1 = document.createElement('button');
  buy1.className = 'btn btn-sm ml-2 buy-items';
  buy1.id = 'one';
  buy1.setAttribute('editId', newItemId);
  buy1.appendChild(document.createTextNode('Buy 1'));
  tr.appendChild(buy1);
  var buy2 = document.createElement('button');
  buy2.className = 'btn btn-sm ml-1 buy-items';
  buy2.id = 'two';
  buy2.setAttribute('editId', newItemId);
  buy2.appendChild(document.createTextNode('Buy 2'));
  tr.appendChild(buy2);
  var buy3 = document.createElement('button');
  buy3.className = 'btn btn-sm ml-1 buy-items';
  buy3.id = 'three';
  buy3.setAttribute('editId', newItemId);
  buy3.appendChild(document.createTextNode('Buy 3'));
  tr.appendChild(buy3);

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm ml-1 delete';
  deleteBtn.id = newItemId;
  deleteBtn.appendChild(document.createTextNode('X'));
  tr.appendChild(deleteBtn);

  tableItems.appendChild(tr);
}

// Add item to the list
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItemDesc = document.getElementById('description').value;
  var newItemPrice = document.getElementById('price').value;
  var newItemQnty = document.getElementById('quantity').value;

  if (newItem !== '' && newItemDesc !== '' && newItemPrice !== '' && newItemQnty !== '') {
    postData(newItem, newItemDesc, newItemPrice, newItemQnty);
    form.reset();
  }
}

// Update item
function updateItem(e) {
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
    var td = e.target.parentElement;
    var itemId = e.target.id;
    tableItems.removeChild(td);
    deleteData(itemId);
  }
}