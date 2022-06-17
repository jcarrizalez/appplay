import AsyncStorage from '@react-native-async-storage/async-storage';

const name = key => `@qubit_${key}`

async function push(key, value)
{
	if(typeof value === 'object' && value !== null){	

		value = JSON.stringify(value)
	}	

	try {
		await AsyncStorage.setItem(name(key), value)

	} catch (e) {
    console.warn('push->storage', name(key))
	}
}

async function get(key)
{
  try {

    var value = await AsyncStorage.getItem(name(key))

    if(typeof value === 'object' && value !== null){

  		value = JSON.parse(value)
  	}
    return value;

  } catch(e) {
  	console.warn('get->storage', name(key))
  }
}

async function remove(key)
{
  try {

    await AsyncStorage.removeItem(name(key))
    
  } catch(e) {
    console.warn('remove->storage', name(key))
  }
}

export default{get, push, remove}