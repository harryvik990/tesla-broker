export const config = {
  runtime: 'edge',
}

export default function handler() {
  return new Response(JSON.stringify({ status: 'ok', service: 'tesla-mining-api' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
