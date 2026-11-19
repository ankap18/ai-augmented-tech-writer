// Mermaid's flowchart tooltips call selection.transition(), which only exists
// after d3-transition loads and patches d3's selection prototype. Mermaid
// imports `select` from "d3", and d3 declares "sideEffects": false, so the
// bundler drops d3-transition and every mouseout on a flowchart node throws
// "tooltipElem.transition is not a function". Importing it here runs the patch.
import 'd3-transition';
