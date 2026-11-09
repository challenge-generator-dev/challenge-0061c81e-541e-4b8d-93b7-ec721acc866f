import { Routes, Route } from 'react-router-dom';
import { ClientList } from '@/features/clients/components/ClientList';
import { ClientForm } from '@/features/clients/components/ClientForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <header className="app-header">
          <h1>Gestión de Clientes</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
};

export default App;