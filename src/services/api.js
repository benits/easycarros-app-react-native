import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'apisauce';

const api = create({
    baseURL: 'http://192.168.15.4:8181',
});

api.addAsyncRequestTransform(request => async () => {
    const token = await AsyncStorage.getItem('@easycarros:token');


    if (token)
        request.headers['Authorization'] = `Bearer ${token}`;
})

api.addResponseTransform( response => {
    if (!response.ok) throw response;
});

export default api; 