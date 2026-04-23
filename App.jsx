import { useState } from 'react'
import { guardrails } from './guardrails'

export default function App() {
  const [sopInput, setSopInput] = useState('')
  const [sopOutput, setSopOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [audioFile, setAudioFile] = useState(null)
  const [transcription, setTranscription] = useState('')

  const generateSOP = async () => {
    if (!sopInput.trim()) {
      alert('Please enter a process description')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-sop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: sopInput })
      })
      const data = await response.json()
      setSopOutput(data.sop || 'Error generating SOP')
    } catch (error) {
      setSopOutput('Error: ' + error.message)
    }
    setLoading(false)
  }

  const transcribeAudio = async () => {
    if (!audioFile) {
      alert('Please select an audio file')
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('audio', audioFile)

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      setTranscription(data.text || 'Error transcribing audio')
    } catch (error) {
      setTranscription('Error: ' + error.message)
    }
    setLoading(false)
  }

  const exportMarkdown = () => {
    if (!sopOutput) {
      alert('Generate an SOP first')
      return
    }
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(sopOutput))
    element.setAttribute('download', 'sop.md')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container">
      <h1>Integrator SOP Architect</h1>
      
      <div style={{ marginBottom: '40px' }}>
        <h2>Generate SOP</h2>
        <textarea
          value={sopInput}
          onChange={(e) => setSopInput(e.target.value)}
          placeholder="Describe the process you want to create an SOP for..."
          rows="6"
        />
        <button onClick={generateSOP} disabled={loading}>
          {loading ? 'Generating...' : 'Generate SOP'}
        </button>
        {sopOutput && (
          <>
            <h3>Generated SOP:</h3>
            <pre>{sopOutput}</pre>
            <button onClick={exportMarkdown}>Export as Markdown</button>
          </>
        )}
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Transcribe Audio</h2>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
        <button onClick={transcribeAudio} disabled={loading}>
          {loading ? 'Transcribing...' : 'Transcribe'}
        </button>
        {transcription && (
          <>
            <h3>Transcription:</h3>
            <p>{transcription}</p>
          </>
        )}
      </div>

      <div>
        <h2>Guardrail Library</h2>
        {guardrails.map((guardrail) => (
          <div key={guardrail.id} style={{ marginBottom: '20px', padding: '10px', background: '#fff', borderRadius: '4px' }}>
            <h3>{guardrail.name}</h3>
            <p>{guardrail.description}</p>
            <ul>
              {guardrail.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
