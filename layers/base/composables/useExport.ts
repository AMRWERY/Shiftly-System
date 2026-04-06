export function useExport() {
  function exportCsv(data: Record<string, unknown>[], filename = 'export.csv') {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const rows = data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? '')).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    downloadBlob(csv, filename, 'text/csv')
  }

  function exportJson(data: unknown, filename = 'export.json') {
    const json = JSON.stringify(data, null, 2)
    downloadBlob(json, filename, 'application/json')
  }

  function downloadBlob(content: string, filename: string, type: string) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return { exportCsv, exportJson }
}
