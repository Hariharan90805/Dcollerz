export async function onRequestPost({ request }: any) {
  try {
    const data = await request.json();
    const { tierId, tierName, amount, billingCycle, customerName, customerPhone, customerEmail, paymentMethod, transactionId } = data || {};
    const txnId = transactionId || `TXN-${Date.now().toString(36).toUpperCase()}`;
    const invoiceNumber = `DCOL-INV-${Math.floor(100000 + Math.random() * 900000)}`;

    const newRecord = {
      id: `pay-${Date.now()}`,
      type: 'payment_completed',
      timestamp: new Date().toISOString(),
      title: `💰 Payment Received: ₹${amount?.toLocaleString('en-IN')} for ${tierName}`,
      details: `Client: ${customerName} (${customerPhone}) | Txn: ${txnId} | Invoice: ${invoiceNumber} | Method: ${paymentMethod || 'UPI'}. Dispatched to dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com`,
      recipientEmail: 'dcollaberzoffical@gmail.com',
      payload: {
        tierId,
        tierName,
        amount,
        billingCycle,
        customerName,
        customerPhone,
        customerEmail,
        txnId,
        invoiceNumber,
      },
    };

    return new Response(JSON.stringify({
      success: true,
      transactionId: txnId,
      invoiceNumber,
      notification: newRecord,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
