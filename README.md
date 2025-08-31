# Personal Finance Tracker

A modern React Native expense tracking application built with Expo Router. Track your expenses, manage categories, and get insights into your spending patterns.

## Features

### 📊 Expense Management
- Add expenses with amount, category, and optional notes
- View expenses grouped by date
- Delete expenses with confirmation

### 📈 Financial Insights
- Daily, weekly, and monthly spending totals
- Category-based breakdown with percentages
- Visual spending summaries

### 🏷️ Category Management
- 5 predefined categories: Food, Transport, Shopping, Bills, Other
- Add custom categories with emoji icons
- Delete unused categories

### 🔍 Advanced Filtering
- Filter expenses by category
- Sort by date or amount (ascending/descending)
- Search expenses by notes or category names

### ⚙️ Settings & Data Management
- Manage all categories
- Clear all data with confirmation modal
- View expense statistics

## Tech Stack

- **Framework**: React Native with Expo Router
- **Navigation**: Expo Router with bottom tabs
- **Storage**: AsyncStorage for data persistence
- **Icons**: Lucide React Native
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Running the App

#### Web Browser
- Open the provided localhost URL in your browser

#### Mobile Device
1. Install [Expo Go](https://expo.dev/client) on your phone
2. Scan the QR code displayed in the terminal

#### Simulator/Emulator
- iOS: Use Xcode Simulator
- Android: Use Android Studio Emulator

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation layout
│   │   ├── index.tsx        # Home screen
│   │   ├── add-expense.tsx  # Add expense screen
│   │   └── settings.tsx     # Settings screen
│   ├── _layout.tsx          # Root layout
│   └── +not-found.tsx       # 404 screen
├── components/
│   ├── ExpenseCard.tsx      # Individual expense display
│   ├── SummaryCard.tsx      # Summary statistics card
│   └── CategoryBreakdown.tsx # Category spending breakdown
├── hooks/
│   └── useExpenses.ts       # Expense management hook
├── types/
│   └── expense.ts           # TypeScript type definitions
└── utils/
    ├── storage.ts           # AsyncStorage utilities
    └── dateUtils.ts         # Date formatting and calculations
```

## Usage

### Adding Expenses
1. Navigate to the "Add Expense" tab
2. Enter the amount spent
3. Select a category from the dropdown
4. Add an optional note
5. Tap "Add Expense" to save

### Viewing Expenses
- The home screen shows all expenses grouped by date
- View daily, weekly, and monthly totals at the top
- See category breakdown with spending percentages

### Managing Categories
1. Go to Settings tab
2. View all categories with their icons
3. Add new categories with custom names and emoji icons
4. Delete unused categories (only if no expenses use them)

### Filtering and Search
- Use the search bar to find expenses by notes or category
- Tap the filter icon to sort by date or amount
- Filter by specific categories

## Data Persistence

All data is stored locally using AsyncStorage:
- **Expenses**: Amount, category, note, date, and timestamp
- **Categories**: Name, icon, and color
- **Automatic**: Data persists between app sessions

## Building for Production

### Web Build
```bash
npm run build:web
```

### Mobile Build
For production mobile apps, you'll need to create a development build:

```bash
npx expo install expo-dev-client
npx expo run:ios    # For iOS
npx expo run:android # For Android
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.