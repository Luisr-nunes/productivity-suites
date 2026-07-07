import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (password) {
        analyzePassword(password);
      } else {
        setAnalysis('');
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
        setAnalysis(data.output);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getStrengthColor = () => {
    if (analysis.includes('FRACA')) return 'var(--danger)';
    if (analysis.includes('MÉDIA')) return '#f59e0b';
    if (analysis.includes('FORTE')) return 'var(--success)';
    return 'var(--text-secondary)';
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
            <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', margin: 0 }}>
              {analysis}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
