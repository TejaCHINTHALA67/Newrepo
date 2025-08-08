import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Button, Chip, Divider, Text } from 'react-native-paper';
import { api } from '../services/api';

export default function StartupProfileScreen() {
  const route = useRoute<RouteProp<Record<string, any>, string>>();
  const { id } = (route.params || {}) as { id: string };
  const [startup, setStartup] = useState<any>(null);
  const [tab, setTab] = useState<'Overview' | 'Updates' | 'Team' | 'Comments'>('Overview');

  useEffect(() => {
    (async () => {
      const res = await api.get(`/startups/${id}`);
      setStartup(res.data);
    })();
  }, [id]);

  if (!startup) return <View style={{ flex: 1, backgroundColor: '#0B0F14' }} />

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#0B0F14' }}
      ListHeaderComponent={(
        <View>
          <Image source={{ uri: startup.banner }} style={{ width: '100%', height: 200 }} />
          <View style={{ padding: 16 }}>
            <Text variant="titleLarge">{startup.title}</Text>
            <Text style={{ color: '#9aa4b2' }}>{startup.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 12, gap: 8 }}>
              {(['Overview','Updates','Team','Comments'] as const).map(t => (
                <Chip key={t} selected={tab === t} onPress={() => setTab(t)}>{t}</Chip>
              ))}
            </View>
          </View>
          <Divider />
        </View>
      )}
      data={tab === 'Overview' ? startup.media : tab === 'Team' ? startup.team : []}
      keyExtractor={(item, idx) => String(item.id || item || idx)}
      renderItem={({ item }) => (
        tab === 'Overview' ? (
          <Image source={{ uri: item }} style={{ width: '100%', height: 200 }} />
        ) : tab === 'Team' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
            <Image source={{ uri: (item as any).photo }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
            <View>
              <Text>{(item as any).name}</Text>
              <Text style={{ color: '#9aa4b2' }}>{(item as any).role}</Text>
            </View>
          </View>
        ) : <View />
      )}
      ListFooterComponent={(
        <View style={{ padding: 16 }}>
          {tab === 'Updates' && (
            <Button mode="contained" onPress={() => {}}>Post Update (mock)</Button>
          )}
          {tab === 'Comments' && (
            <Button mode="outlined" onPress={() => {}}>Add Comment (mock)</Button>
          )}
        </View>
      )}
    />
  );
}