// verify-resend-domain.js
const { Resend } = require('resend');

async function verifyDomain(domainId) {
  try {
    const resend = new Resend('');
    
    console.log('Verifying domain...');
    const verificationResult = await resend.domains.verify(domainId);
    
    console.log('Verification result:', verificationResult);
    
    if (verificationResult.data.status === 'verified') {
      console.log('Domain successfully verified!');
    } else {
      console.log('Domain not verified yet. DNS changes might still be propagating.');
    }
    
  } catch (error) {
    console.error('Error verifying domain:', error);
  }
}

// Replace with your actual domain ID from the first script
const domainId = 'YOUR_DOMAIN_ID';
verifyDomain(domainId);