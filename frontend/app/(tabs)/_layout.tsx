import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
            tabBarActiveTintColor : Colors[colorScheme ?? 'light'].tint,
            headerShown : false,
            tabBarStyle: {
                backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
                borderTopColor: colorScheme === 'dark' ? '#333333' : '#e0e0e0',
                borderTopWidth: 1,
                elevation: 8,
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: -2 },
                shadowRadius: 8,
            },
        }}>
            <Tabs.Screen
                name = "index"
                options = {{
                    title: "Medicine",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="medical-services" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name = "settings"
                options = {{
                    title: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}