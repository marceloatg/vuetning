# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vuetning is a Vue.js 3 component library that implements Salesforce Lightning Design System (SLDS) components. It provides a comprehensive set of UI components following SLDS design patterns and accessibility standards.

## Common Development Commands

### Component Library Development
- `npm run build` - Build the component library for distribution
- `npm run lint` - Run ESLint with auto-fix enabled
- `npm run type-check` - Run TypeScript type checking without emitting files

### Documentation Development  
- `npm run docs:dev` - Start VitePress development server for component documentation
- `npm run docs:build` - Build static documentation site

## Architecture Overview

### Component Library Structure
Vuetning is structured as a modern Vue 3 component library with TypeScript support:

**Build Configuration:**
- Vite-based build system with Vue plugin
- Dual format output: ES modules (`vuetning.es.js`) and UMD (`vuetning.umd.js`)
- TypeScript declarations generated automatically
- External Vue dependency (peer dependency pattern)

**Component Organization:**
- `/src/components/` - All SLDS components organized by component type
- Each component has its own directory with `.vue` file and supporting TypeScript interfaces
- Components export both individual and bulk installation methods
- Component names follow `slds-{component-name}` pattern (e.g., `slds-button`, `slds-modal`)

**Key Architectural Patterns:**
- Vue 3 Composition API with `<script lang="ts">` using Options API (not `<script setup>`)
- TypeScript interfaces for component props and data models
- Scoped SCSS styling following SLDS design tokens
- Component-specific TypeScript definition files (e.g., `vertical-tab.ts`)

**Styling System:**
- Salesforce Lightning Design System CSS as base stylesheet
- Custom Salesforce Sans font family with multiple weights and formats
- Component-specific scoped SCSS with SLDS class structure
- Utility classes for responsive design and common layout patterns

**Component Categories:**
The library includes 80+ components covering:
- Form elements (inputs, checkboxes, picklists, etc.)
- Navigation (tabs, breadcrumbs, vertical navigation)
- Data display (tables, tiles, media objects)  
- Feedback (alerts, notifications, toasts)
- Layout (grids, containers, panels)
- Complex components (modals, global header, page header)

**Entry Points:**
- `src/main.ts` - Main library entry with global Vue plugin installation
- `src/components/index.ts` - Individual component exports
- Component registration follows Vue plugin pattern with `install()` function

**Dependencies:**
- Vue 3.4+ (peer dependency)
- Animation libraries: @formkit/auto-animate, gsap
- Utility libraries: @vueuse/core, @vueuse/components  
- Date/number formatting: moment, numeral
- DOM utilities: scrollparent, uuid, vue-observe-visibility

## Development Notes

### Component Implementation Patterns
- Components use Vue 3 Options API with TypeScript
- Props are strongly typed with TypeScript interfaces
- Event emission follows SLDS patterns and accessibility standards
- Scoped styling preserves SLDS class names and structure

### Documentation System
- VitePress-based documentation with component examples
- Live component demos in `/docs/examples/`
- Markdown documentation for each major component category

### Testing and Quality
- ESLint configuration with Vue and TypeScript rules
- TypeScript strict mode enabled for type safety
- Component props and interfaces provide runtime validation