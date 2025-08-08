import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationsSlice';

function baseUrl() {
  if (Platform.OS === 'android') return 'http://10.0.2.2:4000';
  return 'http://localhost:4000';
}

export function useSocket(userId: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    const s = io(baseUrl(), { query: { userId } });
    s.on('notification', (n) => dispatch(addNotification(n)));
    return () => { s.disconnect(); };
  }, [userId, dispatch]);
}