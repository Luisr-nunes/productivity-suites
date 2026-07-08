import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (password) {
        analyzePassword(password);
      } else {
        setAnalysis(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [password]);

  const analyzePassword = async (pwd) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/analyze-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      const data = await response.json();
      if (response.ok) {
        setAnalysis(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getStrengthColor = () => {
    if (!analysis) return 'var(--text-secondary)';
    if (analysis.strength === 'FRACA') return 'var(--danger)';
    if (analysis.strength === 'MÉDIA') return '#f59e0b';
    if (analysis.strength === 'FORTE') return 'var(--success)';
    return 'var(--success)'; // MUITO FORTE
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '4rem' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <KeyRound size={32} color="var(--success)" />
          </div>
          <div>
            <h2>Analisador de Senhas</h2>
            <p className="text-secondary">Digite sua senha e veja o nível de segurança.</p>
          </div>
        </div>

        <input 
          type="text" 
          placeholder="Digite a senha..." 
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '2rem' }}
        />

        {loading && <p className="text-secondary">Analisando...</p>}

        {analysis && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', borderLeft: `4px solid ${getStrengthColor()}` }}
          >
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '1.2rem', color: getStrengthColor() }}>
                Força: {analysis.strength}
              </strong>
              <span className="text-secondary">Pontuação: {analysis.score} / 7</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <div>Comprimento: <strong style={{color: 'var(--text-primary)'}}>{analysis.length}</strong></div>
              <div>Maiúsculas: <strong style={{color: analysis.has_uppercase ? 'var(--success)' : 'var(--danger)'}}>{analysis.has_uppercase ? 'Sim' : 'Não'}</strong></div>
              <div>Minúsculas: <strong style={{color: analysis.has_lowercase ? 'var(--success)' : 'var(--danger)'}}>{analysis.has_lowercase ? 'Sim' : 'Não'}</strong></div>
              <div>Números: <strong style={{color: analysis.has_number ? 'var(--success)' : 'var(--danger)'}}>{analysis.has_number ? 'Sim' : 'Não'}</strong></div>
              <div>Especiais: <strong style={{color: analysis.has_special ? 'var(--success)' : 'var(--danger)'}}>{analysis.has_special ? 'Sim' : 'Não'}</strong></div>
            </div>

            {analysis.suggestions && analysis.suggestions.length > 0 && (
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Sugestões:</h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {analysis.suggestions.map((sug, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
