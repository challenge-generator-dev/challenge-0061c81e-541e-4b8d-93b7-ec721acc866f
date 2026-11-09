import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ClientEntity } from './ClientList';

export interface CreateClientDto {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface ClientFormProps {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const API_BASE_URL = 'http://localhost:3000';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export function ClientForm({ onSuccess, onError }: ClientFormProps) {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateClientDto>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      loadClient(id);
    }
  }, [id, isEditMode]);

  async function loadClient(clientId: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/clients/${clientId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Cliente no encontrado`);
      }
      const client: ClientEntity = await response.json();
      setFormData({
        name: client.name,
        email: client.email,
        phone: client.phone,
        address: client.address,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar cliente';
      onError?.(message);
      navigate('/clients');
    } finally {
      setIsLoading(false);
    }
  }

  function validateForm(data: CreateClientDto): FormErrors {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (data.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    } else if (data.name.trim().length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres';
    }

    if (!data.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        newErrors.email = 'El formato del email no es válido';
      }
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
      if (!phoneRegex.test(data.phone)) {
        newErrors.phone = 'El formato del teléfono no es válido';
      }
    }

    if (!data.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    } else if (data.address.trim().length < 5) {
      newErrors.address = 'La dirección debe tener al menos 5 caracteres';
    }

    return newErrors;
  }

  function handleInputChange(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const url = isEditMode
        ? `${API_BASE_URL}/clients/${id}`
        : `${API_BASE_URL}/clients`;

      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: No se pudo guardar el cliente`);
      }

      const savedClient: ClientEntity = await response.json();
      const successMessage = isEditMode
        ? `Cliente "${savedClient.name}" actualizado correctamente`
        : `Cliente "${savedClient.name}" creado correctamente`;

      onSuccess?.(successMessage);
      navigate(`/clients/${savedClient.id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al guardar cliente';
      onError?.(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="client-form-loading" role="status" aria-label="Cargando formulario">
        <div className="spinner"></div>
        <p>Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <section className="client-form-container" aria-labelledby="form-title">
      <header className="client-form-header">
        <h1 id="form-title">
          {isEditMode ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h1>
        <Link to="/clients" className="btn btn-secondary">
          Volver a la lista
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="client-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Nombre <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            maxLength={100}
            autoComplete="name"
          />
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Teléfono <span aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <span id="phone-error" className="error-message" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">
            Dirección <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            aria-required="true"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? 'address-error' : undefined}
            rows={3}
            autoComplete="street-address"
          />
          {errors.address && (
            <span id="address-error" className="error-message" role="alert">
              {errors.address}
            </span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : isEditMode ? 'Actualizar Cliente' : 'Crear Cliente'}
          </button>
          <Link to="/clients" className="btn btn-secondary">
            Cancelar
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ClientForm;