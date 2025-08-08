import React from 'react';
import { View, Image } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F14', padding: 16 }}>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=3' }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text variant="titleLarge" style={{ marginTop: 12 }}>Your Name</Text>
        <Text style={{ color: '#9aa4b2' }}>@you</Text>
      </View>
      <Card style={{ marginTop: 24 }}>
        <Card.Content>
          <Button mode="contained" onPress={() => nav.navigate('Analytics')}>Open Analytics</Button>
          <Button style={{ marginTop: 8 }} mode="outlined" onPress={() => nav.navigate('Updates')}>Manage Updates</Button>
        </Card.Content>
      </Card>
    </View>
  );
}