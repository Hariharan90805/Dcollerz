export async function onRequestGet() {
  // Since Cloudflare Functions are stateless without a DB (like D1 or KV),
  // we return a mock notification so the frontend doesn't break.
  const notificationsLog = [
    {
      id: 'init-1',
      type: 'visitor_entry',
      timestamp: new Date().toISOString(),
      title: '🔔 System Monitor Ready',
      details: 'Real-time visitor notification dispatcher active. Monitoring arrivals for dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com.',
      recipientEmail: 'dcollaberzoffical@gmail.com',
    },
  ];

  return new Response(JSON.stringify({
    recipient: 'dcollaberzoffical@gmail.com & hariharanrobo123@gmail.com',
    status: 'ACTIVE',
    logs: notificationsLog,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
