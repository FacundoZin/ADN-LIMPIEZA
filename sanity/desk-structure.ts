import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: any = (S: any) =>
  S.list()
    .title('Content')
    .items(S.documentTypeListItems())
