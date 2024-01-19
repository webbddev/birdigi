import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {pexelsImageAsset} from 'sanity-plugin-asset-source-pexels'

export default defineConfig({
  name: 'default',
  title: 'Birdigi Blog',

  projectId: '0buhqdzi',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    unsplashImageAsset(),
    pexelsImageAsset({
      API_KEY: 'tHZ09q6Y4PVN4Y0591hGTIMCrlasdErC9Pp74miBi7mufHvLfTg52mNB',
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
