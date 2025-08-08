import React, { useEffect, useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { api } from '../services/api';

export default function UpdatesScreen() {
  const [startupId, setStartupId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    if (!startupId) return;
    const res = await api.get('/updates', { params: { startupId } });
    setItems(res.data);
  };

  const post = async () => {
    if (!startupId || !title) return;
    await api.post('/updates', { startupId, userId: 'me', title, body, media: [] });
    setTitle(''); setBody('');
    load();
  }

  useEffect(() => { if (startupId) load(); }, [startupId]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14', padding: 16 }}>
      <Text variant="titleLarge">Updates & Milestones</Text>
      <TextInput label="Your Startup ID" value={startupId} onChangeText={setStartupId} style={{ marginTop: 12 }} />
      <TextInput label="Title" value={title} onChangeText={setTitle} style={{ marginTop: 12 }} />
      <TextInput label="Description" value={body} onChangeText={setBody} multiline style={{ marginTop: 12 }} />
      <Button mode="contained" style={{ marginTop: 12 }} onPress={post}>Post Update</Button>

      <FlatList
        style={{ marginTop: 16 }}
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ padding: 12 }}>
            <Text variant="titleMedium">{item.title}</Text>
            <Text style={{ color: '#9aa4b2' }}>{item.body}</Text>
            {item.media?.map((m: string) => (
              <Image key={m} source={{ uri: m }} style={{ width: '100%', height: 180, borderRadius: 12, marginTop: 8 }} />
            ))}
          </View>
        )}
      />
    </View>
  );
}