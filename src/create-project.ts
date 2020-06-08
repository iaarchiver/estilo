import {
  loadYml,
  ymlsInFolder
} from './util'

import {
  loadStatus,
  loadSyntax,
  loadTerminal,
  loadPalette
} from './loaders'

import {
  Palettes,
  Project,
  StatusStyles
} from './common'

export function createProject (folderPath: string): Project {
  return {
    config: loadYml(folderPath, 'estilo.yml').content,
    projectPath: folderPath,
    palettes: loadPalettes(folderPath),
    syntax: ymlsInFolder(folderPath, 'syntax').flatMap(loadSyntax),
    terminalStyle: loadTerminal(folderPath),
    airlineStyles: loadAllStatus(folderPath, 'airline'),
    lightlineStyles: loadAllStatus(folderPath, 'lightline')
  }
}

function loadPalettes (folderPath: string): Palettes {
  const filepaths = ymlsInFolder(folderPath, 'palettes')
  const palettes = {} as Palettes
  filepaths.forEach(file => {
    const palette = loadPalette(file)
    palettes[palette.name] = palette
  })
  return palettes
}

function loadAllStatus (folderPath: string, kind: string): StatusStyles {
  const filepaths = ymlsInFolder(folderPath, kind)
  const statusStyle = {} as StatusStyles
  filepaths.forEach(filepath => {
    const style = loadStatus(filepath)
    statusStyle[style.name] = style
  })
  return statusStyle
}