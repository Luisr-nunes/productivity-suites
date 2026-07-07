import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, UploadCloud, FileAudio } from 'lucide-react';

export default function Transcriber() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/api/transcriptions/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || 'Erro ao enviar áudio');
      }
    } catch (err) {
      alert('Falha na conexão');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '4rem' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.2)', padding: '12px', borderRadius: '12px' }}>
            <Mic size={32} color="#f59e0b" />
          </div>
          <div>
            <h2>Transcritor de Áudio</h2>
            <p className="text-secondary">Transforme voz em texto usando inteligência artificial.</p>
          </div>
        </div>

        <div 
          style={{ 
            border: '2px dashed var(--border-color)', 
            borderRadius: '12px', 
            padding: '3rem', 
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: file ? 'rgba(255,255,255,0.02)' : 'transparent',
            marginBottom: '1rem'
          }}
          onClick={() => document.getElementById('audio-upload').click()}
        >
          {file ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <FileAudio size={48} color="var(--primary-accent)" />
              <p style={{ fontWeight: '500' }}>{file.name}</p>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>Clique para alterar</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <UploadCloud size={48} className="text-secondary" />
              <p>Clique para selecionar um arquivo de áudio</p>
              <p className="text-secondary" style={{ fontSize: '0.875rem' }}>WAV, MP3, M4A suportados</p>
            </div>
          )}
          <input 
            id="audio-upload" 
            type="file" 
            accept="audio/*" 
            style={{ display: 'none' }} 
            onChange={handleFileChange}
          />
        </div>

        <button 
          className="btn" 
          style={{ width: '100%', marginBottom: '2rem' }}
          disabled={!file || loading}
          onClick={handleUpload}
        >
          {loading ? 'Transcrevendo...' : 'Iniciar Transcrição'}
        </button>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid var(--primary-accent)' }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Resultado:</h3>
            <p style={{ lineHeight: '1.6', color: 'var(--text-primary)' }}>{result.content}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
