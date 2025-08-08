import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryBar } from 'victory-native';

export default function AnalyticsScreen() {
  const views = useMemo(() => Array.from({ length: 7 }).map((_, i) => ({ x: i + 1, y: Math.floor(100 + Math.random() * 400) })), []);
  const engagement = useMemo(() => [
    { x: 'Likes', y: 120 }, { x: 'Comments', y: 45 }, { x: 'Bookmarks', y: 72 }
  ], []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0B0F14', padding: 16 }}>
      <Text variant="titleLarge">Analytics</Text>
      <View style={{ backgroundColor: '#121821', borderRadius: 12, padding: 12, marginTop: 12 }}>
        <Text>Profile Views (Last 7 days)</Text>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryAxis dependentAxis />
          <VictoryAxis tickFormat={(t) => `${t}`} />
          <VictoryLine data={views} style={{ data: { stroke: '#6C63FF' } }} />
        </VictoryChart>
      </View>
      <View style={{ backgroundColor: '#121821', borderRadius: 12, padding: 12, marginTop: 12 }}>
        <Text>Engagement Breakdown</Text>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis />
          <VictoryAxis dependentAxis />
          <VictoryBar data={engagement} style={{ data: { fill: '#00D4FF' } }} />
        </VictoryChart>
      </View>
    </ScrollView>
  );
}