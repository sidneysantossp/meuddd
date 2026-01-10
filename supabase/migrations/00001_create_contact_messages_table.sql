-- Criar tabela para mensagens de contato
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Criar índice para busca por data
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Criar índice para filtrar mensagens não lidas
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read);

-- Habilitar RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política: Permitir inserção pública (qualquer pessoa pode enviar mensagem)
CREATE POLICY "Permitir inserção pública de mensagens"
  ON contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Comentários para documentação
COMMENT ON TABLE contact_messages IS 'Armazena mensagens enviadas através do formulário de contato';
COMMENT ON COLUMN contact_messages.name IS 'Nome completo do remetente';
COMMENT ON COLUMN contact_messages.email IS 'Email do remetente para resposta';
COMMENT ON COLUMN contact_messages.subject IS 'Assunto da mensagem';
COMMENT ON COLUMN contact_messages.message IS 'Conteúdo da mensagem';
COMMENT ON COLUMN contact_messages.read IS 'Indica se a mensagem foi lida pela equipe';