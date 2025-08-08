import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [tempUserName, setTempUserName] = useState('John Doe');

  const colors = {
    background: isDark ? '#121212' : '#ffffff',
    surface: isDark ? '#1e1e1e' : '#f5f5f5',
    card: isDark ? '#2d2d2d' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#b3b3b3' : '#666666',
    border: isDark ? '#333333' : '#e0e0e0',
    primary: '#6200ea',
    accent: '#03dac6',
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      paddingTop: Platform.OS === 'ios' ? 44 : 0,
      paddingBottom: 16,
      paddingHorizontal: 16,
      elevation: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#ffffff',
      marginTop: 16,
    },
    profileSection: {
      backgroundColor: colors.card,
      margin: 16,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      elevation: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    userName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    editButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 20,
    },
    editButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '500',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 8,
    },
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 12,
      elevation: 2,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastListItem: {
      borderBottomWidth: 0,
    },
    listItemContent: {
      flex: 1,
      marginLeft: 16,
    },
    listItemTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 2,
    },
    listItemDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    listItemRight: {
      marginLeft: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 24,
      margin: 20,
      minWidth: 300,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    textInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      marginHorizontal: 8,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: colors.border,
    },
    saveButton: {
      backgroundColor: colors.primary,
    },
    modalButtonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    cancelButtonText: {
      color: colors.text,
    },
    saveButtonText: {
      color: '#ffffff',
    },
  });

  const showProfileModal = () => {
    setTempUserName(userName);
    setProfileModalVisible(true);
  };

  const hideProfileModal = () => setProfileModalVisible(false);

  const saveProfile = () => {
    setUserName(tempUserName);
    hideProfileModal();
  };

  const showComingSoon = () => {
    Alert.alert("Coming Soon", "This feature will be available in a future update.");
  };

  const SettingsListItem = ({ 
    icon, 
    title, 
    description, 
    onPress, 
    rightComponent, 
    isLast = false 
  }: {
    icon: string;
    title: string;
    description: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    isLast?: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.listItem, isLast && styles.lastListItem]} 
      onPress={onPress}
      disabled={!onPress}
    >
      <MaterialIcons name={icon as any} size={24} color={colors.primary} />
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
        <Text style={styles.listItemDescription}>{description}</Text>
      </View>
      <View style={styles.listItemRight}>
        {rightComponent || <MaterialIcons name="chevron-right" size={20} color={colors.textSecondary} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={40} color="#ffffff" />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>user@example.com</Text>
          <TouchableOpacity style={styles.editButton} onPress={showProfileModal}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <SettingsListItem
            icon="notifications"
            title="Enable Notifications"
            description="Receive medication reminders"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
              />
            }
          />
          <SettingsListItem
            icon="volume-up"
            title="Sound"
            description="Play notification sounds"
            rightComponent={
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                disabled={!notificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
              />
            }
          />
          <SettingsListItem
            icon="vibration"
            title="Vibration"
            description="Vibrate for notifications"
            isLast={true}
            rightComponent={
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                disabled={!notificationsEnabled}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={vibrationEnabled ? '#ffffff' : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* App Settings Section */}
        <Text style={styles.sectionTitle}>App Settings</Text>
        <View style={styles.card}>
          <SettingsListItem
            icon="security"
            title="Data & Privacy"
            description="Manage your data and privacy settings"
            onPress={showComingSoon}
          />
          <SettingsListItem
            icon="cloud-upload"
            title="Backup & Sync"
            description="Backup your medication data"
            onPress={showComingSoon}
          />
          <SettingsListItem
            icon="download"
            title="Export Data"
            description="Export your medication history"
            onPress={showComingSoon}
            isLast={true}
          />
        </View>

        {/* About Section */}
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <SettingsListItem
            icon="help"
            title="Help & Support"
            description="Get help and contact support"
            onPress={showComingSoon}
          />
          <SettingsListItem
            icon="info"
            title="About Medula"
            description="Version 1.0.0"
            onPress={showComingSoon}
            isLast={true}
          />
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>

      {/* Profile Edit Modal */}
      <Modal
        visible={profileModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={hideProfileModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.textInput}
              value={tempUserName}
              onChangeText={setTempUserName}
              placeholder="Enter your name"
              placeholderTextColor={colors.textSecondary}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={hideProfileModal}
              >
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={saveProfile}
              >
                <Text style={[styles.modalButtonText, styles.saveButtonText]}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}