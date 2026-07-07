import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Link as LinkIcon, KeyRound, Mic } from 'lucide-react';

const tools = [
  {
    title: 'Encurtador de Links',
    description: 'Transforme URLs longas em links curtos e fáceis de compartilhar.',
    icon: <LinkIcon size={32} color="var(--primary-accent)" />,
    path: '/shortener',
  },
  {
    title: 'Analisador de Senhas',
    description: 'Verifique a força das suas senhas em tempo real com regras complexas.',
    icon: <KeyRound size={32} color="#10b981" />,
    path: '/password',
  },
  {
    title: 'Transcritor de Áudio',
    description: 'Converta áudios em texto instantaneamente com suporte a múltiplos idiomas.',
    icon: <Mic size={32} color="#f59e0b" />,
    path: '/transcriber',
  }
];

export default function Dashboard() {
  return (
    <div style={{ paddingTop: '2rem' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }} className="gradient-text">Suas ferramentas, unificadas.</h1>
        <p className="text-secondary" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Produtividade elevada a um novo nível. Selecione uma das ferramentas abaixo para começar.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {tools.map((tool, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={tool.path}
          >
            <RouterLink to={tool.path} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
              <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', width: '64px', height: '64px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {tool.icon}
                </div>
                <h2>{tool.title}</h2>
                <p className="text-secondary">{tool.description}</p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-accent)', fontWeight: '500' }}>
                  Acessar ferramenta <span>→</span>
                </div>
              </div>
            </RouterLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
