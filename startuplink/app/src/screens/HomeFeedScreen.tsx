import React, { useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Text } from 'react-native-paper';
import { RootState, AppDispatch } from '../store';
import { fetchStartups, setCategory } from '../store/startupsSlice';
import StartupCard from '../ui/StartupCard';
import FilterChips from '../ui/FilterChips';
import NotificationsBanner from './NotificationsBanner';

const categories = ['All', 'Tech', 'Health', 'Education', 'Finance', 'Climate', 'AI', 'SaaS', 'Consumer'];

export default function HomeFeedScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, selectedCategory } = useSelector((s: RootState) => s.startups);

  useEffect(() => {
    dispatch(fetchStartups(selectedCategory && selectedCategory !== 'All' ? { category: selectedCategory } : undefined));
  }, [dispatch, selectedCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14' }}>
      <NotificationsBanner />
      <FilterChips categories={categories} selected={selectedCategory || 'All'} onSelect={(c) => dispatch(setCategory(c === 'All' ? undefined : c))} />
      {loading && items.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 8 }}>Loading feed…</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <StartupCard startup={item} />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => dispatch(fetchStartups(undefined))} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}