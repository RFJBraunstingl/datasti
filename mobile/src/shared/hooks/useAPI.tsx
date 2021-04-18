import {useContext} from 'react';
import API from '../contexts/api-context';

const useAPI = () => useContext(API);

export default useAPI;
