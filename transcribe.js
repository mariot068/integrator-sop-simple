export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const text = 'Audio transcription feature requires API integration. This is a placeholder response.'

  res.status(200).json({ text })
}
