import { supabase } from './supabase';
import type { ContactMessage } from '@/types';

/**
 * API para gerenciar mensagens de contato
 */

/**
 * Envia uma nova mensagem de contato
 * @param message - Dados da mensagem (name, email, subject, message)
 * @returns Mensagem criada ou erro
 */
export async function submitContactMessage(
  message: Omit<ContactMessage, 'id' | 'created_at' | 'read'>
): Promise<{ data: ContactMessage | null; error: Error | null }> {
  try {
    // Validar campos obrigatórios
    if (!message.name?.trim()) {
      throw new Error('Nome é obrigatório');
    }
    if (!message.email?.trim()) {
      throw new Error('Email é obrigatório');
    }
    if (!message.subject?.trim()) {
      throw new Error('Assunto é obrigatório');
    }
    if (!message.message?.trim()) {
      throw new Error('Mensagem é obrigatória');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(message.email)) {
      throw new Error('Email inválido');
    }

    // Inserir mensagem no banco de dados
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: message.name.trim(),
          email: message.email.trim().toLowerCase(),
          subject: message.subject.trim(),
          message: message.message.trim(),
        },
      ])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Erro ao enviar mensagem:', error);
      throw new Error('Erro ao enviar mensagem. Tente novamente.');
    }

    return { data, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Erro desconhecido');
    return { data: null, error };
  }
}

/**
 * Busca todas as mensagens de contato (para admin)
 * @param limit - Número máximo de mensagens a retornar
 * @returns Lista de mensagens ou erro
 */
export async function getContactMessages(
  limit = 50
): Promise<{ data: ContactMessage[]; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar mensagens:', error);
      throw new Error('Erro ao buscar mensagens');
    }

    return { data: Array.isArray(data) ? data : [], error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Erro desconhecido');
    return { data: [], error };
  }
}

/**
 * Marca uma mensagem como lida
 * @param id - ID da mensagem
 * @returns Sucesso ou erro
 */
export async function markMessageAsRead(
  id: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      throw new Error('Erro ao atualizar mensagem');
    }

    return { success: true, error: null };
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Erro desconhecido');
    return { success: false, error };
  }
}
