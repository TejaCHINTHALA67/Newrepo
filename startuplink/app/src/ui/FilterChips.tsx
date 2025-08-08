import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip } from 'react-native-paper';

export default function FilterChips({ categories, selected, onSelect }: { categories: string[]; selected: string; onSelect: (c: string) => void }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
        {categories.map(c => (
          <Chip key={c} selected={selected === c} onPress={() => onSelect(c)} style={{ marginRight: 8 }}>{c}</Chip>
        ))}
      </ScrollView>
    </View>
  );
}