import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { ChevronDown, DollarSign, Calendar, MessageSquare, Check } from 'lucide-react-native';
import { useExpenses } from '@/hooks/useExpenses';
import { formatDate } from '@/utils/dateUtils';

export default function AddExpenseScreen() {
  const { categories, addExpense } = useExpenses();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !selectedCategory) {
      Alert.alert('Error', 'Please fill in amount and category');
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      await addExpense({
        amount: numericAmount,
        category: selectedCategory,
        note: note.trim() || undefined,
        date: date.toISOString(),
      });

      // Reset form
      setAmount('');
      setSelectedCategory('');
      setNote('');
      setDate(new Date());
      
      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = categories.find(c => c.name === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Expense</Text>
          <Text style={styles.subtitle}>Record your spending</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <DollarSign size={20} color="#6B7280" strokeWidth={2} />
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.categoryPicker}
              onPress={() => setShowCategoryPicker(true)}
            >
              {selectedCategoryData ? (
                <View style={styles.selectedCategory}>
                  <Text style={styles.categoryIcon}>{selectedCategoryData.icon}</Text>
                  <Text style={styles.categoryText}>{selectedCategoryData.name}</Text>
                </View>
              ) : (
                <Text style={styles.placeholder}>Select category</Text>
              )}
              <ChevronDown size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.dateContainer}>
              <Calendar size={20} color="#6B7280" strokeWidth={2} />
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note (Optional)</Text>
            <View style={styles.noteContainer}>
              <MessageSquare size={20} color="#6B7280" strokeWidth={2} />
              <TextInput
                style={styles.noteInput}
                placeholder="Add a note..."
                value={note}
                onChangeText={setNote}
                multiline
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Adding...' : 'Add Expense'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showCategoryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <ScrollView style={styles.categoryList}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category.name && styles.categoryOptionSelected
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.name);
                    setShowCategoryPicker(false);
                  }}
                >
                  <View style={styles.categoryOptionContent}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={styles.categoryOptionText}>{category.name}</Text>
                  </View>
                  {selectedCategory === category.name && (
                    <Check size={20} color="#3B82F6" strokeWidth={2} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCategoryPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
  form: {
    padding: 20,
    paddingTop: 0,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  categoryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  placeholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
    minHeight: 40,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryList: {
    maxHeight: 300,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  categoryOptionSelected: {
    backgroundColor: '#EBF4FF',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  categoryOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  closeButton: {
    backgroundColor: '#6B7280',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});