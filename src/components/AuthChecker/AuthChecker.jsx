import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from 'store/sliceReducer/sliceUser';

export default function AuthChecker() {


    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        const userId = JSON.parse(localStorage.getItem('user'));
  
        if (userId === null) {
          dispatch(setUser({}));
          return;
        }
  
        if (Object.keys(userId).length > 0) {
          const url = `https://back.komirka.pp.ua/api/v1/public/users/${userId.userReference}`;
  
          try {
            const res = await axios.get(url);
            dispatch(setUser(res.data));
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
  
      fetchData();
    }, []);
    //проверка пользователя
}
