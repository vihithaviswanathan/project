import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Plus, Trash2, TriangleAlert as AlertTriangle, Tags } from 'lucide-react-native';
import { useExpenses } from '@/hooks/useExpenses';
import { clearAllData } from '@/utils/storage';

export default function SettingsScreen() {
  const { categories, expenses, addCategory, deleteCategory, refreshData } = useExpenses();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    const icon = newCategoryIcon.trim() || '📝';
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#6B7280'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    try {
      await addCategory({
        name: newCategoryName.trim(),
        icon,
        color: randomColor,
      });

      setNewCategoryName('');
      setNewCategoryIcon('');
      setShowAddCategory(false);
      Alert.alert('Success', 'Category added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add category');
    }
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    const hasExpenses = expenses.some(expense => expense.category === categoryName);
    
    if (hasExpenses) {
      Alert.alert(
        'Cannot Delete',
        'This category has expenses associated with it. Please delete those expenses first.'
      );
      return;
    }

    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${categoryName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCategory(categoryId),
        },
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your expenses and custom categories. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearAllData();
              await refreshData();
              setShowClearConfirm(false);
              Alert.alert('Success', 'All data has been cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Manage your categories and data</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Tags size={20} color="#374151" strokeWidth={2} />
              <Text style={styles.sectionTitle}>Categories</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddCategory(true)}
            >
              <Plus size={16} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {categories.map(category => (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              
              {categories.length > 5 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteCategory(category.id, category.name)}
                >
                  <Trash2 size={16} color="#EF4444" strokeWidth={2} />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() => setShowClearConfirm(true)}
          >
            <AlertTriangle size={20} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Total Expenses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{categories.length}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Category Modal */}
      <Modal
        visible={showAddCategory}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddCategory(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Category</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Entertainment"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Icon (Emoji)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="🎬"
                value={newCategoryIcon}
                onChangeText={setNewCategoryIcon}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddCategory(false);
                  setNewCategoryName('');
                  setNewCategoryIcon('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleAddCategory}
              >
                <Text style={styles.confirmButtonText}>Add Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Clear Data Confirmation Modal */}
      <Modal
        visible={showClearConfirm}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowClearConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModalContent}>
            <AlertTriangle size={48} color="#EF4444" strokeWidth={2} />
            <Text style={styles.confirmTitle}>Clear All Data?</Text>
            <Text style={styles.confirmText}>
              This will permanently delete all your expenses and custom categories. This action cannot be undone.
            </Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowClearConfirm(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.dangerConfirmButton}
                onPress={handleClearAllData}
              >
                <Text style={styles.dangerConfirmButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  deleteButton: {
    padding: 8,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#6B7280',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  confirmText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  dangerConfirmButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerConfirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});