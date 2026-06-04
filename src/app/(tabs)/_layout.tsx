import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

import AppBackground from '@/components/app-background';
import TabBar from '@/components/tab-bar';
import { useTheme } from '@/lib/theme-context';

export default function TabsLayout() {
  const { width, height } = useWindowDimensions();
  const { resolved } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={resolved === 'dark' ? 'light' : 'dark'} />
      <AppBackground width={width} height={height} />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          // let the background show through instead of a flat white page
          sceneStyle: { backgroundColor: 'transparent' },
        }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="listings" />
        <Tabs.Screen name="feed" />
        <Tabs.Screen name="settings" />
        {/* sits inside the home tab, the dock skips it */}
        <Tabs.Screen name="inventory" />
      </Tabs>
    </View>
  );
}
