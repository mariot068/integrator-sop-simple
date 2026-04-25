import { useState } from 'react'
import { guardrails } from './guardrails'

export default function App() {
  const [sopInput, setSopInput] = useState('')
  const [sopOutput, setSopOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const generateSOP = async () => {
    if (!sopInput.trim()) {
      alert('Please enter a process description')
      return
    }

    setLoading(true)
    
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const sop = `# Standard Operating Procedure

## Process: ${sopInput}

### Overview
This SOP provides step-by-step instructions for ${sopInput.toLowerCase()}.

### Steps
1. Initial assessment and planning
2. Resource allocation
3. Execution
4. Quality assurance
5. Documentation and review

### Guardrails
- Ensure proper approvals at each stage
- Maintain detailed records
- Follow compliance requirements
- Regular audits and reviews

### Success Metrics
- Process completion rate
- Quality standards met
- Timeline adherence
- Cost efficiency
`

    setSopOutput(sop)
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
