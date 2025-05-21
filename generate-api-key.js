// Gerador de chave API segura
// Execute com: node generate-api-key.js

const crypto = require('crypto');

// Gerar uma chave API forte com 32 bytes (256 bits) convertida para base64url
function generateStrongAPIKey() {
  // Gera bytes aleatórios
  const buffer = crypto.randomBytes(32);
  
  // Converte para base64url (base64 seguro para URLs)
  // Remove padding (=) e substitui + por - e / por _
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const apiKey = generateStrongAPIKey();
console.log('\n=== Chave API Segura Gerada ===');
console.log(apiKey);
console.log('\nCopie esta chave para seu arquivo .env como API_KEY=<chave-gerada>');
console.log('IMPORTANTE: Nunca compartilhe ou comprometa esta chave!\n');