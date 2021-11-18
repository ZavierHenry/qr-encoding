// https://observablehq.com/@zavierhenry/qr-encode-utilities@94
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Utilities for encoding QR code`
)});
  main.variable(observer("binaryEncode")).define("binaryEncode", function(){return(
function binaryEncode(number, length) {
  return number.toString(2).padStart(length, '0')
}
)});
  main.variable(observer("range")).define("range", ["makeArray"], function(makeArray){return(
function range(start, stop) {
  return makeArray(stop-start, (_, i) => start+i)
}
)});
  main.variable(observer("makeArray")).define("makeArray", function(){return(
function makeArray(length, mapper) {
  return Array.from({length}, mapper)
}
)});
  main.variable(observer("sum")).define("sum", function(){return(
function sum(arr) {
  return arr.reduce((x, y) => x + y, 0)
}
)});
  main.variable(observer("showTruncatedData")).define("showTruncatedData", ["d3"], function(d3){return(
function showTruncatedData(data, htmlifier, limit = 40) {
  const container = d3.create('div')
  
  if (data.length > limit) {
    let cachedResult;
    const truncatedResult = htmlifier(data.slice(0, limit))
    
    const content = container.append('div')
      .classed('content', true)
    
    content.append(() => truncatedResult)
      .append('span').text('...').style('padding', '0 4px')
    
    const collapsible = container.insert('div', ':first-child')
      .classed('collapsible', true)
      .classed('expanded-content', false)
      .text('Click to Expand')
      .style('font-weight', 'bold')
      .on('mouseenter', () => {
        container.select('.collapsible').style('background-color', '#d8d8d8')
      })
      .on('mouseleave', () => {
        container.select('.collapsible').style('background-color', 'white')
      })
      .on('click', () => {
        const collapsible = container.select('.collapsible')
        const content = container.select('.content')
        
        const isExpanded = collapsible.classed('expanded-content')
        collapsible.classed('expanded-content', !isExpanded)
        collapsible.text('Click to ' + (isExpanded ? 'Expand' : 'Collapse'))
        if (!isExpanded) {
          cachedResult = cachedResult || htmlifier(data).innerHTML
          content.html(cachedResult)
        } else {
          content.html(truncatedResult.innerHTML)
        }
      })
    
  } else {
    container.append(() => htmlifier(data))
  }
  
  return container.node()
}
)});
  main.variable(observer("stylizeMarkdownValue")).define("stylizeMarkdownValue", function(){return(
function stylizeMarkdownValue(value, color) {
  return `<span style="color:${color}"><strong><i>${value}</i></strong></span>`
}
)});
  main.variable(observer("generatorControls")).define("generatorControls", ["html","instructionRange"], function(html,instructionRange){return(
function generatorControls(steps) {
  const initPlay = false;
  
   const controls = html`<form>
          <input style="width:70%;" type="range" name="step" min="0" max="${steps-1}" value="0"></input><br/>
          <div style="display:flex;justify-content:space-between;width:50%;padding:0 10%";>
            <input type="button" name="begin" value="Beginning"></input>
            <input type="button" name="decr" value="Back One"></input>
            <input type="button" name="play" value="${initPlay ? "Pause" : "Play" }"></input>
            <input type="button" name="incr" value="Forward One"></input>
            <input type="button" name="end" value="End"></input>
          </div>
        </form>`
  
  controls.value = { 
    play: initPlay, 
    generator: instructionRange(0, steps, !initPlay),
    range: controls.elements["step"]
  }
  
  controls.addEventListener('click', e => {
    let detail;
    switch (e.target.name) {
      case "play":
        detail = { play: !controls.value.play }
        break;
      case "begin":
        detail = { step: 0, play: false }
        break;
      case "end":
        detail = { step: steps-1, play: false }
        break;
      case "incr":
        const incrStep = controls.elements["step"].valueAsNumber
        const incr = Math.min(incrStep+1, steps-1)
        detail = { step: incr, play: false }
        break;
      case "decr":
        const decrStep = controls.elements["step"].valueAsNumber
        const decr =  Math.max(decrStep-1, 0)
        detail = { step: decr, play: false }
        break;
      default:
        return;
    }
    controls.dispatchEvent(new CustomEvent("input", { detail }))
  })
  
  controls.addEventListener('input', e => {
    if (e.detail != null && e.detail.step != null) {
      controls.value = {
        ...controls.value,
        play: e.detail.play,
        generator: instructionRange(e.detail.step, steps, !e.detail.play)
      }
    } else if (e.detail != null) {
      const step = Math.min(controls.elements["step"].valueAsNumber, steps-1)
      controls.value = {
        ...controls.value,
        play: e.detail.play,
        generator: instructionRange(step, steps, !e.detail.play)
      }
    } else if (e.target.name == "step") {
      const step = parseInt(e.target.value)
      controls.value = {
        ...controls.value,
        play: false,
        generator: instructionRange(step, steps, true)
      }
    }
    
    controls.elements["play"].value = controls.value.play ? "Pause" : "Play"
  })
  
  return controls
  
}
)});
  main.variable(observer("instructionRange")).define("instructionRange", ["Promises"], function(Promises){return(
function* instructionRange(start, stop, paused, delay = 1500) {
  if (paused) return yield Promise.resolve(start)
  
  for (let i = start; i < stop; i++) {
    yield Promises.tick(delay, i)
  }
}
)});
  main.variable(observer("makeMultiColumnTable")).define("makeMultiColumnTable", ["html","d3"], function(html,d3){return(
function makeMultiColumnTable(data, entriesPerColumn, columnTitles, dataToColumns, options = {}) {
  
  const columns = Math.ceil(data.length / entriesPerColumn)
  const width = options.width || '100%'
  const title = options.title || ""
  const columnMargin = options.margin || '7px'
  const columnPadding = options.padding || '0px 27px'
  const cellspacing = options.cellspacing || 15
  const cellpadding = options.cellpadding || 10
  const highlightFunction = options.highlightFunction || null
  const highlightColor = options.highlightColor || 'white'
  
  const column = `
    <div class="version-table" style="margin:${columnMargin};padding:${columnPadding}";>
      <table cellspacing="${cellspacing}" cellpadding="${cellpadding}"></table>
    </div>
  `
  
  const container = html`
    <div>
      <div style="text-align:center;width:${width}">${title}</div>
      <div style="display:flex;">
        ${column.repeat(columns)}
      </div>
    </div>
  `
  
  const tables = d3.select(container)
    .selectAll('div.version-table table')
  
  for (const [i, table] of tables.nodes().entries()) {
    
    const rows = d3.select(table).selectAll('tr')
      .data(data.slice(entriesPerColumn*i, entriesPerColumn*(i+1)))
      .join('tr')
    
    if (highlightFunction) {
      rows.filter((d, j) => highlightFunction(d, entriesPerColumn*i+j))
        .style('background-color', highlightColor)
    }
    
    for (let k = 0; k < columnTitles.length; k++) {
      rows.append('td')
        .text((d, j) => dataToColumns(d, entriesPerColumn*i+j)[k])
    }
    
  }
  
  const titles = columnTitles.map(x => `<th>${x}</th>`)
  tables.insert(() => html`<tr>${titles.join('')}</tr>`, ':first-child')
  
  return container
  
}
)});
  main.variable(observer("groupString")).define("groupString", ["makeArray"], function(makeArray){return(
function groupString(str, groupSize) {
  return makeArray(Math.ceil(str.length / groupSize), (_, i) => str.slice(groupSize*i, groupSize*(i+1)))
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3')
)});
  return main;
}
