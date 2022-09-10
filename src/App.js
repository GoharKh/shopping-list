import React, { useState} from 'react'
import List from './components/List'
import Alert from './components/Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({
    isShown: false,
    text: '',
    type: ''
  })

  const alertMessage = (isShown = false, text = '', type = '') => {
    setAlert({isShown, text, type})
  }
  const handleSubmit = e => {
    e.preventDefault()
    const newItem = {id: new Date().getTime().toString(), title: name}
    if(!name) {
      alertMessage(true, 'please enter value', 'danger')
    } else if(name && isEditing) {
      setList(list.map(item => {
        if(item.id === editId) {
          return {...item, title: name}
        }
        return item
      }));
      setName('');
      setEditId(null);
      setIsEditing(false);
      alertMessage(true, 'value changed', 'success')
    } else {
      alertMessage(true, 'item added to the list', 'success');
      setList([...list, newItem])
    }
    setName('')
    console.log(alert)
  }
  const editItem = id => {
   const editingItem = list.find(item => item.id === id )
   setName(editingItem.title)
   setIsEditing(true)
   setEditId(id)
  }
  const removeItem = id => {
    const newList = list.filter(item => item.id !== id)
    alertMessage(true, 'item removed', 'danger');
    setList(newList)
  }
  const clearList = () => {
    alertMessage(true, 'List is empty', 'danger')
    setList([])
  }
  return (
    <section className='section-center'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.isShown && <Alert {...alert} removeAlert={alertMessage} list={list}/>}
      <h3>Shopping List</h3>
      <div className='form-control'>
        <input
          type='text'
          className='grocery'
          placeholder='e.g. eggs'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit' className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className='grocery-container'>
        <List list={list} removeItem={removeItem} editItem={editItem} />
        <button className='clear-btn' onClick={clearList}>
          clear items
        </button>
      </div>
    )}
    </section>
  )
}

export default App