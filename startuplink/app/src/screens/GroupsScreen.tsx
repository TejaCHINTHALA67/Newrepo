import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchGroups } from '../store/groupsSlice';
import { Card, Text, Button } from 'react-native-paper';

export default function GroupsScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((s: RootState) => s.groups);

  useEffect(() => { dispatch(fetchGroups()); }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14', padding: 12 }}>
      <FlatList
        data={items}
        keyExtractor={(g) => g.id}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 8 }}>
            <Card.Title title={item.name} subtitle={`${item.followers} followers`} />
            <Card.Content>
              <Text style={{ marginBottom: 8 }}>{item.description}</Text>
              {item.threads.slice(0, 2).map(t => (
                <View key={t.id} style={{ marginBottom: 6 }}>
                  <Text variant="titleSmall">{t.title}</Text>
                  <Text style={{ color: '#9aa4b2' }} numberOfLines={2}>{t.body}</Text>
                </View>
              ))}
              <Button mode="text">Follow</Button>
            </Card.Content>
          </Card>
        )}
        refreshing={loading}
        onRefresh={() => dispatch(fetchGroups())}
      />
    </View>
  );
}