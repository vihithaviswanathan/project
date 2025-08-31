import { Tabs } from 'expo-router';
import { Chrome as Home, Plus, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-expense"
        options={{
          title: 'Add Expense',
          tabBarIcon: ({ size, color }) => (
            <Plus size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}