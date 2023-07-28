var form = document.getElementById('addForm');
var itemList = document.getElementById('items');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Update event
itemList.addEventListener('click', updateItem);

// Using axios to post data
function postData(newItem, newItemDesc, newItemPrice, newItemQnty) {
  const obj = {
    newItem,
    newItemDesc,
    newItemPrice,
    newItemQnty
  }
  const axiosData = axios.post('https://crudcrud.com/api/b5cba1f1c0a64524855f07f19a9e62f6/appointmentData', obj);
  axiosData
    .then(res => {
      appendData(newItem, newItemDesc, newItemPrice, newItemQnty, res.data._id);
    })
    .catch(err => console.log(err))
}

// Using axios to get data
function getData() {
  axios.get('https://crudcrud.com/api/b5cba1f1c0a64524855f07f19a9e62f6/appointmentData')
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        appendData(res.data[i].newItem, res.data[i].newItemDesc, res.data[i].newItemPrice, res.data[i].newItemQnty)
      }
    })
    .catch(err => console.log(err))
}
getData();

// Using axios to update data
function updateData(itemId, updatedQnty) {
  const obj = {
    newItemQnty: updatedQnty
  };

  axios.put(`https://crudcrud.com/api/b5cba1f1c0a64524855f07f19a9e62f6/appointmentData/${itemId}`, obj)
    .then(res => {
      console.log('Data updated successfully:', res.data);
    })
    .catch(err => console.log('Error updating data:', err));
}

// Using axios to delete data
function deleteData(itemId) {
  axios.delete(`https://crudcrud.com/api/b5cba1f1c0a64524855f07f19a9e62f6/appointmentData/${itemId}`)
    .then()
    .catch(err => console.log(err));
}

// Add item to the list
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItemDesc = document.getElementById('description').value;
  var newItemPrice = document.getElementById('price').value;
  var newItemQnty = document.getElementById('quantity').value;

  postData(newItem, newItemDesc, newItemPrice, newItemQnty);
}

// function to append data in html
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

  var buy1 = document.createElement('button');
  buy1.className = 'btn btn-sm float-right buy-items';
  buy1.appendChild(document.createTextNode('Buy 3'));
  li.appendChild(buy1);
  var buy2 = document.createElement('button');
  buy2.className = 'btn btn-sm float-right buy-items';
  buy2.appendChild(document.createTextNode('Buy 2'));
  li.appendChild(buy2);
  var buy3 = document.createElement('button');
  buy3.className = 'btn btn-sm float-right buy-items';
  buy3.appendChild(document.createTextNode('Buy 1'));
  li.appendChild(buy3);
  itemList.appendChild(li);
}

function updateItem(e) {
  if (e.target.classList.contains('buy-items')) {
    const itemId = e.target.parentElement.id;
    const currentQnty = parseInt(e.target.parentElement.childNodes[3].textContent);
    const updatedQnty = currentQnty - 1;
    updateData(itemId, updatedQnty.toString());
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