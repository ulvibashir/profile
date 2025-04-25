// setup-resend-domain.js
const { Resend } = require('resend');

async function setupDomain() {
  try {
    const resend = new Resend('');
    
    // Step 1: Add the domain
    console.log('Adding domain to Resend...');
    const domainResult = await resend.domains.create({ 
      name: 'ismat.pro' 
    });
    
    console.log('Domain added:', domainResult);
    
    // Step 2: Get the domain details to see required DNS records
    const domainId = domainResult.data.id;
    const domainDetails = await resend.domains.get(domainId);
    
    console.log('Domain details:', domainDetails);
    
    console.log('\n====== DNS RECORDS TO ADD ======');
    console.log('Add these records to your DNS configuration:');
    
    if (domainDetails.data.records) {
      domainDetails.data.records.forEach(record => {
        console.log(`Type: ${record.type}`);
        console.log(`Name: ${record.name}`);
        console.log(`Value: ${record.value}`);
        console.log(`Priority: ${record.priority || 'N/A'}`);
        console.log('----------------------------');
      });
    }
    
    console.log('\nAfter adding these DNS records, run the verification script.');
    
  } catch (error) {
    console.error('Error setting up domain:', error);
  }
}

setupDomain();