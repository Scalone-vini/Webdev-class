// app/contact/[id]/page.js
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const ContactDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contatos');

    if (!savedContacts) {
      router.push('/');
      setLoading(false);
      return;
    }

    try {
      const contacts = JSON.parse(savedContacts);
      const foundContact = contacts.find((c) => c.id === Number(params.id));

      if (!foundContact) {
        router.push('/');
        return;
      }

      setContact(foundContact);
    } catch (error) {
      console.error('Erro ao carregar contato:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-600">Contato não encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Detalhes do Contato</h1>
            <button
              onClick={() => router.back()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded"
            >
              ← Voltar
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <p className="text-gray-900">{contact.nome}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">{contact.email || '—'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <p className="text-gray-900">{contact.telefone || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;