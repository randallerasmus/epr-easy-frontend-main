
# EPR-Easy Frontend

A React application for automating Extended-Producer-Responsibility (EPR) levy and Section 18 reporting for South African SMEs.

## Features

- Upload CSV product data for EPR reporting
- Classify materials and review submissions
- Generate EPR levy reports and Section 18 compliance documents
- Dashboard for tracking submissions and compliance status
- Authentication via Supabase magic links

## Tech Stack

- **Framework**: React with Vite
- **Language**: TypeScript
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **API Client**: Axios
- **Authentication**: Supabase Auth
- **Data Visualization**: Recharts
- **CSV Processing**: PapaParse with Web Workers
- **Testing**: Vitest
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm/yarn/pnpm

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd epr-easy-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from template:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env`:

```
VITE_API_BASE=http://your-api-url
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:8080](http://localhost:8080).

### Build for Production

```bash
npm run build
```

This will create a `dist` directory with the built application.

### Running Tests

```bash
npm run test
```

## Project Structure

- `src/`
  - `components/` - Reusable UI components
  - `pages/` - Top-level page components
  - `store/` - Zustand state management
  - `services/` - API service layer
  - `workers/` - Web workers for heavy processing
  - `lib/` - Utility functions and configuration
  - `hooks/` - Custom React hooks

## Main Functionality

### Authentication

Uses Supabase's magic link authentication. Users receive a secure link via email to sign in without passwords.

### CSV Upload & Processing

Large CSV files are processed using web workers to avoid blocking the UI thread. Data is validated and prepared for material classification.

### Material Classification

Interactive table for classifying product materials with bulk editing support. Classifications are saved and can be updated at any time.

### EPR Reporting

Generates compliant Section 18 reports based on the classified materials and calculated levies. Reports are available for download as PDFs.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
