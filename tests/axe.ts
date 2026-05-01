// Tiny axe-core wrapper for use inside Vitest Browser Mode.
//
// vitest-axe ships a Node-only entry that calls `module.createRequire`, so it
// crashes when imported from a real-browser test. Calling axe.run() directly
// works fine in Chromium and gives us the same axe-core engine the official
// Storybook a11y addon uses.

import axe from "axe-core"
import type { RunOptions, AxeResults } from "axe-core"

/**
 * Runs axe against an element (or the whole document body) and returns the
 * raw axe report. The caller usually pipes the result through
 * `expectNoViolations()` so the failure message lists each rule that broke.
 */
export function runAxe(target: Element | Document = document, options: RunOptions = {}): Promise<AxeResults> {
    return axe.run(target, options)
}

/**
 * Asserts that the axe run produced zero violations. The thrown Error includes
 * the rule id, help text, and a JSON snapshot of every offending node so a
 * failed test points the developer straight at the broken markup.
 */
export function expectNoViolations(results: AxeResults): void {
    if (results.violations.length === 0) return

    const formatted = results.violations
        .map((violation) => {
            const nodes = violation.nodes
                .map((node) => `        - ${node.html}\n          ${node.failureSummary?.replace(/\n/g, "\n          ")}`)
                .join("\n")
            return `  • [${violation.id}] ${violation.help}\n${nodes}`
        })
        .join("\n")

    throw new Error(`axe-core found ${results.violations.length} violation(s):\n${formatted}`)
}
