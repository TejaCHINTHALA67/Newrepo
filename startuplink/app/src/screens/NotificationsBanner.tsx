import React from 'react';
import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function NotificationsBanner() {
  const items = useSelector((s: RootState) => s.notifications.items);
  const [visible, setVisible] = React.useState(false);
  const latest = items[0];

  React.useEffect(() => { if (latest) setVisible(true); }, [latest?.id]);

  return (
    <Snackbar visible={!!latest && visible} onDismiss={() => setVisible(false)} duration={3000}>
      {latest ? `${latest.type.toUpperCase()} on startup ${latest.startupId}` : ''}
    </Snackbar>
  );
}