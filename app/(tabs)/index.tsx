import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Search, Filter, Import as SortAsc, Dessert as SortDesc, Calendar } from 'lucide-react-native';
import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseFilters } from '@/types/expense';
import { formatDate, isToday, isThisWeek, isThisMonth, groupExpensesByDate } from '@/utils/dateUtils';
import ExpenseCard from '@/components/ExpenseCard';
import SummaryCard from '@/components/SummaryCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';

export default function HomeScreen() {
  const { expenses, categories, loading, deleteExpense } = useExpenses();
  const [filters, setFilters] = useState<ExpenseFilters>({
    sortBy: 'date',
    sortOrder: 'desc',
    searchQuery: '',
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filteredExpenses = expenses
    .filter(expense => {
      if (filters.category && expense.category !== filters.category) {
        return false;
      }
      if (filters.searchQuery && !expense.note?.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      if (filters.sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      } else {
        aValue = a.amount;
        bValue = b.amount;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

  const groupedExpenses = groupExpensesByDate(filteredExpenses);

  const todayTotal = expenses
    .filter(expense => isToday(new Date(expense.date)))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const weekTotal = expenses
    .filter(expense => isThisWeek(new Date(expense.date)))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthTotal = expenses
    .filter(expense => isThisMonth(new Date(expense.date)))
    .reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading expenses...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Finance Tracker</Text>
          <Text style={styles.subtitle}>Track your expenses effortlessly</Text>
        </View>

        <View style={styles.summarySection}>
          <SummaryCard title="Today" amount={todayTotal} icon="📅" color="#3B82F6" />
          <SummaryCard title="This Week" amount={weekTotal} icon="📊" color="#10B981" />
          <SummaryCard title="This Month" amount={monthTotal} icon="📈" color="#8B5CF6" />
        </View>

        <CategoryBreakdown expenses={expenses} categories={categories} />

        <View style={styles.expensesSection}>
          <View style={styles.expensesHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <View style={styles.controls}>
              <View style={styles.searchContainer}>
                <Search size={16} color="#6B7280" strokeWidth={2} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search notes or categories..."
                  value={filters.searchQuery}
                  onChangeText={(text) => setFilters(prev => ({ ...prev, searchQuery: text }))}
                />
              </View>
              <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setShowFilterModal(true)}
              >
                <Filter size={16} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {groupedExpenses.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>💰</Text>
              <Text style={styles.emptyTitle}>No expenses yet</Text>
              <Text style={styles.emptyText}>Start tracking by adding your first expense</Text>
            </View>
          ) : (
            groupedExpenses.map(([date, dayExpenses]) => (
              <View key={date} style={styles.dateGroup}>
                <Text style={styles.dateHeader}>{date}</Text>
                {dayExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    category={categories.find(c => c.name === expense.category)}
                    onDelete={deleteExpense}
                  />
                ))}
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter & Sort</Text>
            
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Category</Text>
              <TouchableOpacity
                style={[styles.filterOption, !filters.category && styles.filterOptionActive]}
                onPress={() => setFilters(prev => ({ ...prev, category: undefined }))}
              >
                <Text style={[styles.filterOptionText, !filters.category && styles.filterOptionTextActive]}>
                  All Categories
                </Text>
              </TouchableOpacity>
              
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.filterOption, filters.category === category.name && styles.filterOptionActive]}
                  onPress={() => setFilters(prev => ({ 
                    ...prev, 
                    category: prev.category === category.name ? undefined : category.name 
                  }))}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[styles.filterOptionText, filters.category === category.name && styles.filterOptionTextActive]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort By</Text>
              <TouchableOpacity
                style={[styles.filterOption, filters.sortBy === 'date' && styles.filterOptionActive]}
                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'date' }))}
              >
                <Calendar size={16} color={filters.sortBy === 'date' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
                <Text style={[styles.filterOptionText, filters.sortBy === 'date' && styles.filterOptionTextActive]}>
                  Date
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.filterOption, filters.sortBy === 'amount' && styles.filterOptionActive]}
                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'amount' }))}
              >
                <Text style={[styles.filterOptionText, filters.sortBy === 'amount' && styles.filterOptionTextActive]}>
                  Amount
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Sort Order</Text>
              <TouchableOpacity
                style={[styles.filterOption, filters.sortOrder === 'desc' && styles.filterOptionActive]}
                onPress={() => setFilters(prev => ({ ...prev, sortOrder: 'desc' }))}
              >
                <SortDesc size={16} color={filters.sortOrder === 'desc' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
                <Text style={[styles.filterOptionText, filters.sortOrder === 'desc' && styles.filterOptionTextActive]}>
                  Descending
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.filterOption, filters.sortOrder === 'asc' && styles.filterOptionActive]}
                onPress={() => setFilters(prev => ({ ...prev, sortOrder: 'asc' }))}
              >
                <SortAsc size={16} color={filters.sortOrder === 'asc' ? '#FFFFFF' : '#6B7280'} strokeWidth={2} />
                <Text style={[styles.filterOptionText, filters.sortOrder === 'asc' && styles.filterOptionTextActive]}>
                  Ascending
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
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
  summarySection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  expensesSection: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  expensesHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateGroup: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
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
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  filterOptionActive: {
    backgroundColor: '#3B82F6',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  filterOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});