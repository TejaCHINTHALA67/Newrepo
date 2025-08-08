import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons, Card } from 'react-native-paper';
import { api } from '../services/api';

const categories = ['Tech','Health','Education','Finance','Climate','AI','SaaS','Consumer'];

export default function CreateStartupScreen() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Tech');
  const [media, setMedia] = useState<string>('https://images.unsplash.com/photo-1498050108023-c5249f4df085');

  const onSubmit = async () => {
    await api.post('/startups', { title, description, category, media: [media], team: [], links: {} });
    setStep(0); setTitle(''); setDescription('');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0B0F14' }} contentContainerStyle={{ padding: 16 }}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Create Startup Profile</Text>
      <SegmentedButtons value={String(step)} onValueChange={(v: any) => setStep(Number(v))} buttons={[
        { value: '0', label: 'Basics' }, { value: '1', label: 'Media' }, { value: '2', label: 'Preview' }
      ]} />

      {step === 0 && (
        <View style={{ marginTop: 16 }}>
          <TextInput label="Title" value={title} onChangeText={setTitle} style={{ marginBottom: 12 }} />
          <TextInput label="Description" value={description} onChangeText={setDescription} multiline numberOfLines={4} style={{ marginBottom: 12 }} />
          <SegmentedButtons value={category} onValueChange={setCategory as any} buttons={categories.map(c => ({ value: c, label: c }))} />
          <Button mode="contained" style={{ marginTop: 16 }} onPress={() => setStep(1)}>Next</Button>
        </View>
      )}

      {step === 1 && (
        <View style={{ marginTop: 16 }}>
          <TextInput label="Media URL" value={media} onChangeText={setMedia} style={{ marginBottom: 12 }} />
          <Image source={{ uri: media }} style={{ width: '100%', height: 200, borderRadius: 12 }} />
          <Button mode="contained" style={{ marginTop: 16 }} onPress={() => setStep(2)}>Preview</Button>
        </View>
      )}

      {step === 2 && (
        <View style={{ marginTop: 16 }}>
          <Card>
            <Card.Cover source={{ uri: media }} />
            <Card.Title title={title || 'Untitled'} subtitle={category} />
            <Card.Content><Text>{description || 'No description yet.'}</Text></Card.Content>
          </Card>
          <Button mode="contained" style={{ marginTop: 16 }} onPress={onSubmit}>Save</Button>
        </View>
      )}
    </ScrollView>
  );
}