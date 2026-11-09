import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface ClientEntity {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface ClientListProps {
  onError?: (message: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

export function ClientList({ onError }: ClientListProps) {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/clients`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setClients(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar clientes';
      setClients([]);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(clientId: string) {
    if (!confirm('¿Está seguro de que desea eliminar este cliente?')) {
      return;
    }

    try {
      setDeleteLoading(clientId);
      const response = await fetch(`${API_BASE_URL}/clients/${clientId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo eliminar el cliente`);
      }

      setClients((prev) => prev.filter((client) => client.id !== clientId));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar cliente';
      onError?.(message);
    } finally {
      setDeleteLoading(null);
    }
  }

  if (isLoading) {
    return (
      <div className="client-list-loading" role="status" aria-label="Cargando clientes">
        <div className="spinner"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <section className="client-list-container" aria-labelledby="clients-title">
      <header className="client-list-header">
        <h1 id="clients-title">Gestión de Clientes</h1>
        <Link to="/clients/new" className="btn btn-primary" aria-label="Crear nuevo cliente">
          Nuevo Cliente
        </Link>
      </header>

      {clients.length === 0 ? (
        <div className="client-list-empty">
          <p>No hay clientes registrados.</p>
          <Link to="/clients/new">Registrar el primer cliente</Link>
        </div>
      ) : (
        <table className="client-table" aria-label="Lista de clientes">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Dirección</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>
                  <a href={`mailto:${client.email}`}>{client.email}</a>
                </td>
                <td>
                  <a href={`tel:${client.phone}`}>{client.phone}</a>
                </td>
                <td>{client.address}</td>
                <td className="actions">
                  <Link
                    to={`/clients/${client.id}`}
                    className="btn btn-secondary"
                    aria-label={`Ver detalles de ${client.name}`}
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/clients/${client.id}/edit`}
                    className="btn btn-secondary"
                    aria-label={`Editar ${client.name}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(client.id)}
                    disabled={deleteLoading === client.id}
                    aria-label={`Eliminar ${client.name}`}
                  >
                    {deleteLoading === client.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ClientList;