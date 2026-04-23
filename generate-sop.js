export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { input } = req.body

  const sop = `# Standard Operating Procedure

## Process: ${input}

### Overview
This SOP provides step-by-step instructions for ${input.toLowerCase()}.

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

  res.status(200).json({ sop })
}
