var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var editMode = false;

// Form submit event
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var newItem = document.getElementById('item').value;
  var newItemValue = document.getElementById('item-value').value;

  if (editMode) {
    // If in edit mode, call editData function with the item ID
    var itemId = document.getElementById('item-id').value;
    editData(itemId, newItem, newItemValue);
  } else {
    // If not in edit mode, add the item to the list
    postData(newItem, newItemValue);
  }

  // Clear the form
  form.reset();
});

// Delete event
itemList.addEventListener('click', removeItem);

// Edit event
itemList.addEventListener('click', function (e) {
  if (e.target.classList.contains('edit')) {
    var li = e.target.parentElement;
    var itemId = li.getAttribute('data-item-id');
    var itemName = li.firstChild.textContent.split(' - ')[0];
    var itemValue = li.firstChild.nextSibling.textContent;

    editItem(itemId, itemName, itemValue);
  }
});

// Filter event
filter.addEventListener('keyup', filterItems);

// Using axios to post data
function postData(newItem, newItemValue) {
  const obj = {
    newItem,
    newItemValue
  };
  const axiosData = axios.post('https://crudcrud.com/api/2c6f5e0c53a0455abb7cc31143296fe6/myData', obj);
  axiosData
    .then(res => {
      appendData(newItem, newItemValue, res.data._id);
    })
    .catch(err => console.log(err));
}

// Using axios to get data
function getData() {
  axios.get('https://crudcrud.com/api/2c6f5e0c53a0455abb7cc31143296fe6/myData')
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        appendData(res.data[i].newItem, res.data[i].newItemValue, res.data[i]._id);
      }
    })
    .catch(err => console.log(err));
}

getData();

// Using axios to delete data
function deleteData(itemId) {
  axios.delete(`https://crudcrud.com/api/2c6f5e0c53a0455abb7cc31143296fe6/myData/${itemId}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

// Using axios to edit data
function editData(itemId, newItem, newItemValue) {
  const obj = {
    newItem,
    newItemValue
  };
  axios.put(`https://crudcrud.com/api/2c6f5e0c53a0455abb7cc31143296fe6/myData/${itemId}`, obj)
    .then(res => {
      const editedItem = document.querySelector(`li[data-item-id="${itemId}"]`);
      editedItem.firstChild.textContent = newItem + ' - ';
      editedItem.firstChild.nextSibling.textContent = newItemValue;
      clearEditState();
    })
    .catch(err => console.log(err));
}

// Add item to the list
function appendData(newItem, newItemValue, newItemId) {
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.setAttribute('data-item-id', newItemId);
  li.appendChild(document.createTextNode(newItem + ' - '));
  li.appendChild(document.createTextNode(newItemValue));

  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn);

  var editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm float-right edit';
  editBtn.appendChild(document.createTextNode('EDIT'));
  li.appendChild(editBtn);

  itemList.appendChild(li);
}

// Edit item
function editItem(itemId, currentItem, currentValue) {
  // Populate the main registration form with existing values
  document.getElementById('item').value = currentItem;
  document.getElementById('item-value').value = currentValue;

  // Create or update the hidden input field to store the item id for editing
  var itemIdInput = document.getElementById('item-id');
  if (!itemIdInput) {
    itemIdInput = document.createElement('input');
    itemIdInput.type = 'hidden';
    itemIdInput.id = 'item-id';
    form.appendChild(itemIdInput);
  }
  itemIdInput.value = itemId;

  editMode = true; // Set the flag to indicate edit mode
}

// Function to clear edit state
function clearEditState() {
  document.getElementById('item').value = '';
  document.getElementById('item-value').value = '';
  var itemIdInput = document.getElementById('item-id');
  if (itemIdInput) {
    form.removeChild(itemIdInput);
  }
  editMode = false; // Reset the flag to indicate add mode
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      var itemId = li.getAttribute('data-item-id');
      itemList.removeChild(li);
      deleteData(itemId);
    }
  }
}

// Filter Items
function filterItems(e) {
  var text = e.target.value.toLowerCase();
  var items = itemList.getElementsByTagName('li');
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    var itemValue = item.firstChild.nextSibling.textContent;
    if (itemName.toLowerCase().indexOf(text) !== -1 || itemValue.toLowerCase().indexOf(text) !== -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}