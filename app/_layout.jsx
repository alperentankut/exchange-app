import HomePage from "@/components/HomePage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function RootLayout() {

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  );
}

