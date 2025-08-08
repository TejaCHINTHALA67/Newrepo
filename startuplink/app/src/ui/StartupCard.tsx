import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { likeStartup, bookmarkStartup, Startup } from '../store/startupsSlice';
import { toggleBookmark } from '../store/bookmarksSlice';
import { useNavigation } from '@react-navigation/native';

export default function StartupCard({ startup }: { startup: Startup }) {
  const dispatch = useDispatch<any>();
  const nav = useNavigation<any>();

  return (
    <Card style={{ margin: 12 }}>
      <TouchableOpacity onPress={() => nav.navigate('StartupProfile', { id: startup.id })}>
        <Image source={{ uri: startup.banner }} style={{ width: '100%', height: 220 }} />
      </TouchableOpacity>
      <Card.Title title={startup.title} subtitle={`${startup.category} • ${startup.stats.views} views`} />
      <Card.Content>
        <Text numberOfLines={2} style={{ color: '#9aa4b2' }}>{startup.description}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="heart" onPress={() => dispatch(likeStartup({ startupId: startup.id, userId: 'me' }))} />
        <Text>{startup.stats.likes}</Text>
        <IconButton icon="bookmark" onPress={() => { dispatch(bookmarkStartup({ startupId: startup.id, userId: 'me' })); dispatch(toggleBookmark({ startupId: startup.id })); }} />
        <Text>{startup.stats.bookmarks}</Text>
        <IconButton icon="share-variant" onPress={() => {}} />
      </Card.Actions>
    </Card>
  );
}