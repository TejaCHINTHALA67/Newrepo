import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import { RootState, AppDispatch } from '../store';
import { fetchStartups } from '../store/startupsSlice';

const span = 2;
const size = Dimensions.get('window').width / span - 16;

export default function BrowseScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((s: RootState) => s.startups);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => { dispatch(fetchStartups({ sort: 'trending' })); }, [dispatch]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14', padding: 8 }}>
      <SegmentedButtons
        value={view}
        onValueChange={(v: any) => setView(v)}
        buttons={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }]}
        style={{ margin: 8 }}
      />
      {view === 'grid' ? (
        <FlatList
          data={items}
          numColumns={span}
          key={'grid'}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ width: size, margin: 8 }}>
              <Image source={{ uri: item.banner }} style={{ width: '100%', height: size, borderRadius: 12 }} />
              <Text style={{ marginTop: 6 }} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={items}
          key={'list'}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 12 }}>
              <Text variant="titleMedium">{item.title}</Text>
              <Text style={{ color: '#9aa4b2' }}>{item.description}</Text>
            </View>
          )}
        />
      )}
      <Button mode="contained" onPress={() => dispatch(fetchStartups({ sort: 'trending' }))} style={{ margin: 12 }}>Refresh Trending</Button>
    </View>
  );
}