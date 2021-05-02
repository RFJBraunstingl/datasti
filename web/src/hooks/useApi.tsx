import {useContext} from "react";
import apiContext from '../contexts/api-context'

const useApi = () => useContext(apiContext);

export default useApi;
