var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// Filter event
filter.addEventListener('keyup', filterItems);

// Using axios to post data
function postData(newItem, newItemValue) {
  const obj = {
    newItem,
    newItemValue
  }
  const axiosData = axios.post('https://crudcrud.com/api/25fde4fb59a7484797ac101977aa02cb/myData', obj);
  axiosData
    .then(res => {
      appendData(newItem, newItemValue, res.data._id);
    })
    .catch(err => console.log(err))
}

// Using axios to get data
function getData() {
  axios.get('https://crudcrud.com/api/25fde4fb59a7484797ac101977aa02cb/myData')
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        appendData(res.data[i].newItem, res.data[i].newItemValue)
      }
    })
    .catch(err => console.log(err))
}
getData();

// Using axios to delete data
function deleteData(itemId) {
  axios.delete(`https://crudcrud.com/api/25fde4fb59a7484797ac101977aa02cb/myData/${itemId}`)
    .then()
    .catch(err => console.log(err));
}

// Add item to the list
function addItem(e) {
  e.preventDefault();

  var newItem = document.getElementById('item').value;
  var newItemValue = document.getElementById('item-value').value;

  postData(newItem, newItemValue);
}

// function to append data in html
function appendData(newItem, newItemValue, newItemId) {
  var li = document.createElement('li');
  li.className = 'list-group-item';
  li.appendChild(document.createTextNode(newItem + ' - '));
  li.appendChild(document.createTextNode(newItemValue));
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  deleteBtn.id = newItemId;
  deleteBtn.appendChild(document.createTextNode('X'));
  li.appendChild(deleteBtn);
  var editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm float-right';
  editBtn.appendChild(document.createTextNode('EDIT'));
  li.appendChild(editBtn);
  itemList.appendChild(li);
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are You Sure?')) {
      var li = e.target.parentElement;
      var itemId = e.target.id;
      itemList.removeChild(li);
      deleteData(itemId);
    }
  }
}

// Filter Items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();
  // Get list
  var items = itemList.getElementsByTagName('li');
  // Convert to an array
  Array.from(items).forEach(function (item) {
    var itemName = item.firstChild.textContent;
    var itemValue = item.firstChild.nextSibling.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    }
    else if (itemValue.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    }
    else {
      item.style.display = 'none';
    }
  });
}