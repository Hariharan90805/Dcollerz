export async function onRequestPost({ request }: any) {
  try {
    const data = await request.json();
    const { source = 'Floating Widget', packageInterest = 'General' } = data || {};
    
    const newRecord = {
      id: `wa-${Date.now()}`,
      type: 'whatsapp_click',
      timestamp: new Date().toISOString(),
      title: '💬 WhatsApp Chat Initiated',
      details: `Visitor clicked WhatsApp connect via "${source}" for interest: ${packageInterest}. Dispatched to dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com`,
      recipientEmail: 'dcollaberzoffical@gmail.com',
    };

    return new Response(JSON.stringify({ success: true, notification: newRecord }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
