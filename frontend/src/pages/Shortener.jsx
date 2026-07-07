import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link2, Copy, Check } from 'lucide-react';

export default function Shortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (response.ok) {
        setShortUrl(data.short_url);
        setCopied(false);
      } else {
        alert(data.error || 'Erro ao encurtar');
      }
    } catch (err) {
      alert('Falha de conexão com o servidor');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '4rem' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Link2 size={32} color="var(--primary-accent)" />
          </div>
          <div>
            <h2>Encurtador de Links</h2>
            <p className="text-secondary">Cole sua URL gigante abaixo.</p>
          </div>
        </div>

        <form onSubmit={handleShorten} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="url" 
            placeholder="https://exemplo.com/url-muito-longa..." 
            className="input-field"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit" className="btn" disabled={loading} style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Encurtando...' : 'Encurtar Link'}
          </button>
        </form>

        {shortUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <span style={{ color: 'var(--success)', fontWeight: '500' }}>{shortUrl}</span>
            <button 
              onClick={copyToClipboard}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {copied ? <Check size={20} color="var(--success)" /> : <Copy size={20} />}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
