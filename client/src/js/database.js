import { openDB } from 'idb'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade (db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists')
        return
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true })
      console.log('jate database created')
    }
  })

export const getDb = async () => {
  console.log('Grabbing from DB')
  const jateDb = await openDB('jate', 1)
  const tx = jateDb.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')
  const request = store.get(1)
  const result = await request
  result
    ? console.log('Retrieved Data', result.value)
    : console.log('Data is not found')
  return result?.value
}

export const putDb = async (content) => {
  console.log('Into Data Base')
  const jateDb = await openDB('jate', 1)
  const tx = jateDb.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate')
  const request = store.put({ id: 1, value: content })
  const result = await request
  console.log('Your data has been saved to DB', result.value)
}

initdb()
