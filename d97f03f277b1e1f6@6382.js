// https://observablehq.com/@zavierhenry/encoding-qr-codes@6382
import define1 from "./ecc137687e8f6a0c@111.js";
import define2 from "./1cbffd19a7aa736e@94.js";
import define3 from "./8d271c22db968ab0@158.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["finder@1.png",new URL("./files/30daf409f4f67542b62c80fda65dbb9e73e6d1cac5e9ac61216f232bd80eaebeb8b640748e3d6d9eb353b150996536e2926a63d966765fbb609f24300340a8c9",import.meta.url)],["alignment.png",new URL("./files/805e39d16c85c7f402dd736e20e7986a4b6fb8f52c147df93fdd860d6e0e61cc21920291aeb63177ffb369e6345f9f1483f9180d64bf7fe818c9ac5d53498f17",import.meta.url)],["penalty_three_right.jpg",new URL("./files/8e56aa21de59b0a40a1ade8482b3fc4e798934e457ff45f8e94f0713e99fbc59207515a87cb11125c4d3479fc1ce545b4ea7cf3934a462a871023ff986ef303a",import.meta.url)],["penalty_three_left.jpg",new URL("./files/fab1eb3b5329cf16f9b01ffcc14c8ac93c7f8de1489c669934b4b5f4b7d3ba1265ca7eca273c5c148b630c27141cff86faa8c6e6a14db27f2a4493f928a7b7e5",import.meta.url)],["penalty_three_example@1.png",new URL("./files/c734657045e7f1b1c4215f497216a6499d7dc3b8d171ffafa732db77f23db611abad04fccf341b43e6d6ca4f919aa68e3668df6cbe4ff56488d8f85591d1692f",import.meta.url)],["downward_data.png",new URL("./files/70fa0f910d55fd764d5bbb03007cf053761bd45a69e9a88ac3a8e0f06f0991de0c2838196e432674af716f864c286f8b69aae1e14d830ff392ba1aa12dc5d178",import.meta.url)],["upward_data.png",new URL("./files/63589977902a5bfe7f30830f221af5b0b06b5d2ca4749dd0b8bdbea36958579867a14b2e08d33cc3c96914b10c97bc0ec43280713cb7d88acec5606fbd310cb4",import.meta.url)],["penalty_one_vertical@1.png",new URL("./files/3b7ab9b530c7f5996513e6063fcf898f59dd97f4d1112e32836ac2bdd45b69f0b694cd0f274cb9cba9dbe6806b7473cdbb1c0c5e75c1faffb2dfcd48ee6762e5",import.meta.url)],["penalty_one_horizontal@1.png",new URL("./files/2c77c051d83ef9da8578c234cc709acdca12b3206dd8decae354818df72e3be690b0e0b90573d58af88e86434eae863f3357550122cf3afa394f9373d1164734",import.meta.url)],["penalty_2.png",new URL("./files/86a0e52f9947fe065c38e5e11749673d62900bfaef48440ea65040248b67ee6d7730f5f1ac480399ff1daf379c2a6175bea6c2cebf9c99f17b5159ee5cb0f182",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Encoding QR codes
An interactive tutorial on encoding QR codes
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## Introduction

QR codes are a type of barcode that can be used to encode information, specifically a string of text. They can encode more information than simple barcodes and enjoy widespread adoption. QR codes are made up of units called _modules_ and come in various sizes, called _versions_. The larger the version, the more data that can be contained inside of it. 

This page attempts to explain the encoding process of a QR code with visualizations that change to match the user input.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## Data and Error Correction Level

Naturally, the first step in creating a QR code is choosing the data to encode. We also need to specify an error correction level. Along with the encoded data, the QR code creates error correction codewords that are able to correct error in reading the data, up to a point. The error correction level describes the level of recovery of incorrect data. The higher the level, the higher percentage of data that is able to be recovered.

`
)});
  main.variable(observer("viewof phrase")).define("viewof phrase", ["html"], function(html)
{
  const phraseInput = html`<input type="text" name="phrase" value="HELLO WORLD"></input>`
  const applyButton = html`<input type="button" name="applyButton" value="Apply"></input>`
  
  const phraseForm = html`
    <form>
      <label for="phrase"><i>Data</i></label><br>
      ${phraseInput}
      ${applyButton}
    </form>
  `
  
  phraseInput.addEventListener('input', e => e.stopPropagation())
  phraseInput.addEventListener('change', e => e.stopPropagation())
  
  
  applyButton.addEventListener('click', () => {
    phraseForm.dispatchEvent(new CustomEvent('input', {detail: phraseForm.elements["phrase"].value}))
  })
  phraseForm.value = phraseForm.elements["phrase"].value
  phraseForm.addEventListener('input', e => {
    phraseForm.value = e.detail
  })
  
  return phraseForm
  
}
);
  main.variable(observer("phrase")).define("phrase", ["Generators", "viewof phrase"], (G, _) => G.input(_));
  main.variable(observer("viewof recoveryLevel")).define("viewof recoveryLevel", ["html"], function(html)
{
  const recoveryForm = html`
    <form>
      <label for="correctionLevel"><i>Recovery Level</i></label><br>
      <label><b><input type="radio" name="correctionLevel" value="L">L (7%)</input></b></label><br>
      <label><b><input type="radio" name="correctionLevel" value="M">M (15%)</input></b></label><br>
      <label><b><input type="radio" name="correctionLevel" value="Q">Q (25%)</input></b></label><br>
      <label><b><input type="radio" name="correctionLevel" value="H" checked>H (30%)</input></b></label><br>
    </form>
  `
  recoveryForm.value = recoveryForm.elements['correctionLevel'].value
  
  recoveryForm.addEventListener('input', e => {
    recoveryForm.value = e.target.value;
  })
  
  return recoveryForm
  
}
);
  main.variable(observer("recoveryLevel")).define("recoveryLevel", ["Generators", "viewof recoveryLevel"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`## Choosing the right encoding mode

We must choose an encoding more for our data. While there are numerous QR encoding modes, this tutorial focuses on the four most common ones.

### Numeric mode

Numeric mode is only for digits 0-9.

### Alphanumeric Mode

Alphanumeric mode supports digits and *uppercase* letters (note that this mode does not support lowercase letters). Additionally this mode also supports the following characters:

- _$_, _%_, _\*_, _+_, _-_, _._, _/_, _:_, and the space character

### Byte Mode

Byte mode is for characters in the [ISO-8859-1 character set](https://www.w3schools.com/charsets/ref_html_8859.asp). Some QR code scanners can detect [UTF-8](https://www.w3schools.com/charsets/ref_html_utf8.asp) in byte mode

### Kanji Mode

Kanji mode is for characters in the [Shift JIS](https://en.wikipedia.org/wiki/Shift_JIS) encoding of the [JIS X 0208](https://en.wikipedia.org/wiki/JIS_X_0208) character set. Shift JIS uses two bytes to encode kanji characters.

### Note About Mixing Modes

Note that while it is possible to use different modes for different sections of a QR code, this page does not do so when making a QR code.
`
)});
  main.variable(observer("viewof mode")).define("viewof mode", ["html","d3","phrase","isShiftCharacter","form"], function(html,d3,phrase,isShiftCharacter,form)
{
  const modeForm = html`
  <form>
    <label for="mode"><i>Choose Encoding Mode</i></label><br>
    <select id="mode" name="mode">
    </select>
  </form>
`
  const selection = d3.select(modeForm).select('#mode')
  
  if (phrase.match(/^\d*$/)) {
    selection.append(() => html`<option value="numeric">Numeric</option>`)
  }
  
  if (phrase.match(/^[A-Z0-9 $%*+\-./:]*$/)) {
    selection.append(() => html`<option value="alphanumeric">Alphanumeric</option>`)
  }
  
  
  if (Array.from(phrase).every(x => x.codePointAt(0) < 256)) {
    selection.append(() => html`<option value="byte">Byte</option>`)
  }
  
  if (Array.from(phrase).every(x => isShiftCharacter(x))) {
    selection.append(() => html`<option value="kanji">Kanji</option>`)
  }

  return form(modeForm)
  
}
);
  main.variable(observer("mode")).define("mode", ["Generators", "viewof mode"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","phrase","recoveryLevel","mode","stylizeMarkdownValue","version"], function(md,phrase,recoveryLevel,mode,stylizeMarkdownValue,version){return(
md`
## Calculating Version

After selecting the error correction level and the encoding mode, we must determine the _version_ of a QR code. A QR code has 40 possible versions, numbered from 1-40. Each version makes a QR code that is 4 modules wider and taller than the previous version from Version 1 (21 x 21 modules) to Version 40 (177 x 177 modules). Therefore, one can calculate the size of a QR code using the following formula:

\`size = 4 * (version-1) + 21\`

The minimum version of a QR code is dependent on the length of the data being encoded, the error correction level, and the current encoding mode. Finding this version can be found by consulting the [capabilities table](https://gist.github.com/ZavierHenry/a4b3761212109d5598bb2db79c334782) and looking for the mininum version that has the same correction level and encoding mode with a higher character count than the data to encode.

For your data that is ***${phrase.length}*** character${phrase.length != 1 ? "s" : ""} long with an error correction level of ***${recoveryLevel}*** in ***${mode.mode}*** encoding mode, the minimum version number is ${stylizeMarkdownValue(version, "green")}. This also makes the size of the QR code 

\` 4 * (${version}-1) + 21 = ${4*(version-1)+21}\`

The minimum version and maximum character count of that version, given the current encoding level, encoding mode, and length of your data, is highlighted in the table below
`
)});
  main.variable(observer()).define(["getAllVersions","recoveryLevel","mode","version","makeMultiColumnTable"], function(getAllVersions,recoveryLevel,mode,version,makeMultiColumnTable)
{
  
  const capitalize = word => word.slice(0, 1).toUpperCase() + word.slice(1)
  const columnTitles = ["Version", "Char Count"]
  const data = getAllVersions(recoveryLevel, mode.mode)
  const entriesPerColumn = 14
  const options = {
    width: "70%",
    highlightColor: "#008000a0",
    highlightFunction: (data, index) => data.version == version,
    title: `Version and Character Count for <strong><i>${capitalize(mode.mode)}</i></strong> Encoding Mode and Error Correction Level <strong><i>${recoveryLevel}</i></strong>`
  }
  
  const mapper = (data, index) => [data.version, data.maxCharacters]
  
  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
  
}
);
  main.variable(observer()).define(["md","mode","stylizeMarkdownValue","binaryEncode","dataEncoding"], function(md,mode,stylizeMarkdownValue,binaryEncode,dataEncoding){return(
md`

## Encoding Data

Next is to encode the data. There are 4 parts to the encoded data: the mode indicator, the character count indicator, the encoded payload, and extra padding, if necessary. Each part will be explained in detail below

### Mode Indicator

The encoded data starts with a four bit indicator that identifies the mode the QR code is using. The indicator for each mode can be found in the mode indicator table, shown below.

The mode indicator for your data with ***${mode.mode}*** encoding is ${stylizeMarkdownValue(binaryEncode(dataEncoding.data.indicator, 4), "green")}. This is also highlighted in the below table
`
)});
  main.variable(observer()).define(["d3","html","mode"], function(d3,html,mode)
{
  
  const indicatorTable = [
    ["Numeric", "0001"],
    ["Alphanumeric", "0010"],
    ["Byte", "0100"],
    ["Kanji", "1000"],
  ]
  
  const table = d3.create('table')
  
  const rows = table.selectAll('tr')
    .data(indicatorTable)
    .join('tr')
  
  rows.append('td')
    .text(([name, _]) => name)
  
  rows.append('td')
    .text(([_, indicator]) => indicator)
  
  table.insert(() => html`<tr><th>Mode Name</th><th>Mode Indicator</th></tr>`, ":first-child")
  
  rows.filter(([name, _]) => name.toLowerCase() === mode.mode.toLowerCase())
    .style('background-color', '#008000a0')
  
  return table.node()
  
}
);
  main.variable(observer()).define(["md","phrase","mode","version","dataEncoding"], function(md,phrase,mode,version,dataEncoding){return(
md`
### Character Count Indicator

After the mode indicator, the encoded data has the character count indicator, which represents the number of characters that are being encoded. 

Your data has <span style="color:blue"><strong><i>${phrase.length}</strong></i></span> characters.

Additionally, the number of bits used for the character count indicator is dependent on the QR version and the encoding mode. The table below shows the different indicator sizes. For your data in ***${mode.mode}*** encoding mode, the QR version is ***${version}*** which makes the character count indicator <span style="color:blue"><strong><i>${dataEncoding.data.characterCount.bits}</strong></i></span> bits long, which is also highlighted in the below table. 

`
)});
  main.variable(observer()).define(["d3","makeArray","getCharacterCountBits","html","version","mode"], function(d3,makeArray,getCharacterCountBits,html,version,mode)
{
  const table = d3.create("table")
  const data = makeArray(12, (_, i) => {
    const m = i % 4
    const r = Math.floor(i/4)
    const minVersion = r == 0 ? 1 : r == 1 ? 10 : 27
    const maxVersion = r == 0 ? 9 : r == 1 ? 26 : 40
    
    const mode = m == 0 ? "numeric"
      : m == 1 ? "alphanumeric"
      : m == 2 ? "byte"
      : "kanji"
    
    return { minVersion, maxVersion, mode, countLength: getCharacterCountBits(minVersion, mode) }
  })

  const rows = table.selectAll("tr")
    .data(data)
    .join("tr")
  
  rows.append('td')
    .text(({mode}) => mode.slice(0,1).toUpperCase() + mode.slice(1))
  
  rows.append('td')
    .text(({minVersion, maxVersion}) => `${minVersion}-${maxVersion}`)
  
  rows.append('td')
    .text(({countLength}) => countLength)
  
  table.insert(() => html`
    <tr>
      <th>Encoding Mode</th>
      <th>QR Version Range</th>
      <th>Indicator Size in Bits</th>
    </tr>
  `, ":first-child")
  
  rows.filter(({minVersion, maxVersion, mode: m}) => (version >= minVersion) && (version <= maxVersion) && m.toLowerCase() === mode.mode.toLowerCase())
    .style('background-color', '#0000ff60')
          
  return table.node()
  
}
);
  main.variable(observer()).define(["md","mode"], function(md,mode){return(
md`
  ### Encoded Payload Data

  Next comes the actual payload data. Each encoding mode has a different method for encoding data. For ***${mode.mode}*** encoding mode, this is the encoding process:
`
)});
  main.variable(observer()).define(["mode","numericProcessExplanation","phrase","alphanumericProcessExplanation","byteProcessExplanation","kanjiProcessExplanation"], function(mode,numericProcessExplanation,phrase,alphanumericProcessExplanation,byteProcessExplanation,kanjiProcessExplanation)
{
  switch (mode.mode) {
    case "numeric":
      return numericProcessExplanation(phrase)
    case "alphanumeric":
      return alphanumericProcessExplanation(phrase)
    case "byte":
      return byteProcessExplanation(phrase)
    case "kanji":
      return kanjiProcessExplanation(phrase)
  }
}
);
  main.variable(observer()).define(["md","mode"], function(md,mode){return(
md`For your data in ***${mode.mode}*** mode, the encoded  payload data is:`
)});
  main.variable(observer()).define(["showTruncatedData","dataEncoding","md","binaryEncode"], function(showTruncatedData,dataEncoding,md,binaryEncode){return(
showTruncatedData(
  dataEncoding.data.payload.encoding,
  data => md`${data.map(x => binaryEncode(x.data, x.bits)).join(' ')}`, 
  20
)
)});
  main.variable(observer()).define(["md","mode"], function(md,mode){return(
md`Below cycles through the steps to encode your data in ${mode.mode} mode`
)});
  main.variable(observer()).define(["mode","numericStep","phrase","alphanumericStep","byteStep","kanjiStep","encodingGeneratorControls"], async function*(mode,numericStep,phrase,alphanumericStep,byteStep,kanjiStep,encodingGeneratorControls)
{  
  let showStep = null

  switch (mode.mode) {
    case "numeric":
      showStep = step => numericStep(phrase, step)
      break;
    case "alphanumeric":
      showStep = step => alphanumericStep(phrase, step)
      break;
    case "byte":
      showStep = step => byteStep(phrase, step)
      break;
    case "kanji":
      showStep = step => kanjiStep(phrase, step)
      break;     
  }
  
  for (const step of encodingGeneratorControls.generator) {
    const i = await step
    yield showStep(i)
    encodingGeneratorControls.range.value = i
  }
}
);
  main.variable(observer("viewof encodingGeneratorControls")).define("viewof encodingGeneratorControls", ["mode","phrase","generatorControls"], function(mode,phrase,generatorControls)
{
  let length = 1
  
  switch (mode.mode) {
    case "numeric":
      length = Math.ceil(phrase.length / 3) + 1
      break;
    case "alphanumeric":
      length = Math.ceil(phrase.length / 2) + 1
      break;
    case "byte":
    case "kanji":
      length = phrase.length
      break;
  }
  
  return generatorControls(length)
}
);
  main.variable(observer("encodingGeneratorControls")).define("encodingGeneratorControls", ["Generators", "viewof encodingGeneratorControls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","version","recoveryLevel","stylizeMarkdownValue","dataEncoding"], function(md,version,recoveryLevel,stylizeMarkdownValue,dataEncoding){return(
md`
### Padding data if neccesary and separating into 8 bit codewords

After encoding the data, we must find out the required number of bits for a QR code. This is dependent on the version and error correction level of the QR code, and can be found in the error corrections table.

Under version ***${version}*** and error correction level ***${recoveryLevel}***, ${stylizeMarkdownValue(dataEncoding.totalDataBits/8, "orange")} codewords are required, meaning that ${stylizeMarkdownValue(dataEncoding.totalDataBits, "orange")} of bits are required. The currently encoded data is ${stylizeMarkdownValue(dataEncoding.data.bits, "orange")} bits long. Therefore, ${dataEncoding.padding.bits == 0 ? "no" : stylizeMarkdownValue(dataEncoding.padding.bits, "red")} more bit${dataEncoding.padding.bits == 1 ? ' is' : 's are'} required as padding.
`
)});
  main.variable(observer()).define(["md","stylizeMarkdownValue","dataEncoding"], function(md,stylizeMarkdownValue,dataEncoding){return(
md`

#### Adding Terminator of Zeros

If the encoded data is not long enough, a terminator of zeros is required at the end of the data. Put the number of bits required to reach the required number of bits, up to 4 bits. In other words, if more than 4 bits of data are required, use 4 zeros; otherwise, use the necessary number of zeros.

Because we are ${stylizeMarkdownValue(dataEncoding.padding.bits, "orange")} bits short of the required length, we put ${stylizeMarkdownValue(dataEncoding.padding.terminatorBitsCount, "red")} zero${dataEncoding.padding.terminatorBitsCount == 1 ? '' : 's'} at the end of the currently encoded data.

`
)});
  main.variable(observer()).define(["md","stylizeMarkdownValue","dataEncoding"], function(md,stylizeMarkdownValue,dataEncoding){return(
md`

#### Adding More Zeros to Make the Length a Multiple of 8

If the encoded data is still not long, we must add pad bytes until it is. However, before we do that, we must make the current data length a multiple of 8. This is done by adding zeros at the end of the data. Our encoded data so far is ${stylizeMarkdownValue(dataEncoding.data.bits + dataEncoding.padding.terminatorBitsCount, "orange")} bits long, which ${dataEncoding.padding.multipleEightBitsCount == 0 ? "is" : "is not"} a multiple of eight. Therefore, we ${dataEncoding.padding.multipleEightBitsCount == 0 ? "don't need to add any zeros" : `need to add ${stylizeMarkdownValue(dataEncoding.padding.multipleEightBitsCount, "red")} zero${dataEncoding.padding.multipleEightBitsCount == 1 ? "" : "s"} to the end of our current data.`}

`
)});
  main.variable(observer()).define(["dataEncoding","md","stylizeMarkdownValue","makeArray"], function(dataEncoding,md,stylizeMarkdownValue,makeArray)
{
  
  const padBytes = dataEncoding.padding.padBits / 8
  
  return md`

#### Add Pad Bytes to Equal the Required Number of Bits

If the encoded data still is less than the maximum capacity, add 236 (_11101100_) and 17 (_00010001_) as bytes to the end of the string, repeating as necessary until the data has reached the maximum length.

Because we are ${stylizeMarkdownValue(dataEncoding.padding.padBits, "orange")} bits short of the required length, we need to add ${stylizeMarkdownValue(padBytes, "red")} pad byte${padBytes == 1 ? "" : "s"} to the end of our current data.

These pad bytes are ${stylizeMarkdownValue(makeArray(padBytes, (_, i) => i % 2 == 0 ? "11101100" : "00010001").join(' '), "green")}.
`
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`The final data codewords to be put in the QR code is:`
)});
  main.variable(observer()).define(["bitString","showTruncatedData","md"], function(bitString,showTruncatedData,md)
{
  const data = Array.from({length: bitString.length / 8}, (_, i) => bitString.slice(8*i, 8*i+8))
  return showTruncatedData(data, data => md`${data.join(' ')}`, 20)
}
);
  main.variable(observer("errorCorrectionSection")).define("errorCorrectionSection", ["md"], function(md){return(
md`## Generating Error Correction Codes

Along with the encoded data, QR codes also include _error correction codes_. These codes allow a QR code to correct errors that occur when decoding a QR code. The steps involved in creating error correction codes are detailed below

`
)});
  main.variable(observer()).define(["errorCorrectionsEntry","md","stylizeMarkdownValue","recoveryLevel"], function(errorCorrectionsEntry,md,stylizeMarkdownValue,recoveryLevel)
{
  const {
    version,
    errorLevel,
    ecCodewordsPerBlock,
    groupOneBlockCount,
    groupOneDataCodewordsCountPerBlock,
    groupTwoBlockCount,
    groupTwoDataCodewordsCountPerBlock
  } = errorCorrectionsEntry;
  
  const numGroups = groupTwoBlockCount != null ? 2 : 1
  
  return md`
  ### Breaking Up Data Codewords into Groups and Blocks

  If the version of the QR code is larger than 2, it might be necessary to split the data codewords into groups and   blocks. The number of groups and blocks to split the data into is determined by the error correction table shown    below. For our QR code version ${stylizeMarkdownValue(version, "orange")} and error correction level   ${stylizeMarkdownValue(recoveryLevel, "orange")}, our data is put into ${stylizeMarkdownValue(numGroups, "green")} group${numGroups == 2 ? "s" : ""}.

Group one is split into ${stylizeMarkdownValue(groupOneBlockCount, "green")} block${groupOneBlockCount == 1 ? "" : "s"}, each with ${stylizeMarkdownValue(groupOneDataCodewordsCountPerBlock, "green")} data codeword${groupOneDataCodewordsCountPerBlock == 1 ? "" : "s"} per block.${groupTwoBlockCount == null ? "" : `Group two is split into ${stylizeMarkdownValue(groupTwoBlockCount, "green")} block${groupTwoBlockCount == 1 ? "" : "s"}, each with ${stylizeMarkdownValue(groupTwoDataCodewordsCountPerBlock, "green")} data codeword${groupTwoDataCodewordsCountPerBlock == 1 ? "" : "s"} per block`}

Each block will have ${stylizeMarkdownValue(errorCorrectionsEntry.ecCodewordsPerBlock, "green")} error correction codeword${errorCorrectionsEntry.ecCodewordsPerBlock == 1 ? "" : "s"} per block.

`
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

#### Polynomial Division

To generate error correction codes, we use a method known as Reed-Solomon error correction. In order the use that method, we need to understand two concepts: polynomial long divison and Galois fields. Just as long division divides two numbers, polynomial long division divides two polynomials.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
#### Galois Fields

As mentioned in the previous section, Galois fields are a concept that needs to be understood in order to generate error correction codes. A Galois field basically consists of a set of numbers as well as mathematical operators that produce numbers that are also in the same set.

According to the QR code, we use bitwise arithmatic modulo 2 arithmatic and byte-wise modulo 285 arithmatic. This corresponds to Galois Field 2<sup>8</sup>, also known as Galois Field 256 or GF(256). GF(256) consists of numbers that are between 0-255.

`
)});
  main.variable(observer("galoisAddition")).define("galoisAddition", ["md","tex"], function(md,tex){return(
md`

#### Addition and Subtraction in the Galois field

In GF(256), _n_ = _-n_. This means that when we use Galois Field addition or subtraction, use the absolute value of the numbers. Additionally, this means that addition and subtraction are equivalent operations. To add or subtract in a Galois field, use regular addition and subtraction, and then use the modulo operator. Because, as mentioned earlier, we are using bitwise arithmatic modulo 2, this is equivalent to using the XOR (or exclusive or) operator.

XOR (^ or ${tex`\oplus`}) is an operation such that _a_ ^ _b_ = 1 if either _a_ = 1 or _b_ = 1 but not if both does. In other words, it follows these rules:

- 0 ^ 0 = 0
- 0 ^ 1 = 1
- 1 ^ 0 = 1
- 1 ^ 1 = 0

All addition and subtraction in GF(256) is done using XOR.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

#### Generating Powers of 2 in the Galois field

Every number in GF(256) can be represented as a power of 2, or 2<sup>n</sup>. In GF(256), _n_ is a number between 0-255. However, recall that every number in GF(256) is between 0-255. This presents a problem for numbers like 2<sup>8</sup> = 256 and 2<sup>9</sup> = 512 as those numbers are greater than 255. To resolve this, a number should be XORed with 285. So, for 2<sup>8</sup>:

2<sup>8</sup> = 256 ^ 285 = 29

However, the calculation different for 2<sup>9</sup>. Instead of XORing 512 with 285, take 2 \\* 2<sup>8</sup> = 2 \\* 29 = 58. Continue in this way, using the previous power of 2 to generate the next power of 2. Generally, generating the next power of 2, 2<sup>n</sup> should look like this:

1. If n = 0, return 1
2. Otherwise, calculate 2 \\* 2<sup>n-1</sup>
3. If the result from step 2 is greater than 255, XOR with 285

For convenience, all of the generated values in GF(256) can be found in the below table. The _exponent_ column represents the exponent _n_ in 2<sup>n</sup> while the _value_ column represents the value of that power of 2. For example, in GF(256), 2<sup>9</sup> = 58. Therefore, 9 is put in the exponent column while 58 is put in the value column.
`
)});
  main.variable(observer()).define(["GaloisTable","exponentValuePagination","makeArray","makeMultiColumnTable"], function(GaloisTable,exponentValuePagination,makeArray,makeMultiColumnTable)
{
  const reference = new GaloisTable()
  const entriesPerColumn = 11
  const tablesPerPage = 4
  const entriesPerPage = entriesPerColumn * tablesPerPage
  const columnTitles = ["Exponent", "Value"]
  const options = {
    width: "80%",
    padding: "0px 17px",
    margin: "3px",
    title: "QR Code Exponent and Value"
  }
  
  const start = entriesPerPage*exponentValuePagination
  const data = makeArray(Math.min(256-start, entriesPerPage), (_, i) => reference.atointeger(start + i))
  const mapper = (data, index) => [start+index, data]
  
  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
  
}
);
  main.variable(observer("viewof exponentValuePagination")).define("viewof exponentValuePagination", ["html","d3","range"], function(html,d3,range)
{
  
  const entriesPerPage = 44
  const pages = Math.ceil(256 / entriesPerPage)
  
  const paginator = html`
    <div class="pagination" style="display:flex;width:80%;justify-content:center;padding:15px 0px">
      <div id="decrement">&lt;</div>
      <div id="increment">&gt;</div>
    </div>
  `
  
  paginator.value = 0
  paginator.addEventListener('input', e => {
    paginator.value = e.detail
  })
  
  const pagination = d3.select(paginator)
  
  const pageButtons = pagination
    .selectAll('div.page-button')
    .data(range(0, pages))
    .enter()
      .insert('div', '#increment')
        .classed('page-button', true)
        .text(d => d+1)
        .on('click', function(d) {
          
          d3.select(paginator).selectAll('div.selected')
            .classed('selected', false)
            .style('color', '#0086b3')
            .style('background-color', 'white')
          
          d3.select(this).classed('selected', true)
            .style('color', 'white')
            .style('background-color', '#0086b3')
            .dispatch('input', d => ({ bubbles: true, detail: d }))
        })
  
  pagination.selectAll('div')
    .style("color", "#0086b3")
    .style("width", "4%")
    .style("text-align", "center")
    .style("cursor", "pointer")
    .on('mouseenter', function() { 
      d3.select(this).classed('focused', true)
        .style('background-color', '#c0c0c077')
    })
    .on('mouseleave', function() {
      const isSelected = d3.select(this).classed('selected')
      d3.select(this).classed('focused', false)
        .style('background-color', isSelected ? "#0086b3" : "white")
    })
  
  pageButtons
    .classed('selected', d => d == 0)
    .style('background-color', d => d == 0 ? '#0086b3' : 'white')
    .style('color', d => d == 0 ? 'white' : '#0086b3')
    
  pagination.select('#increment').on('click', function() {
    if (paginator.value < pages-1) {
      const incr = paginator.value + 1
      d3.select(paginator).select(`.page-button:nth-child(${incr+2})`)
        .dispatch('click')
    }
  })
  
  pagination.select('#decrement').on('click', function() {
    if (paginator.value > 0) {
      const decr = paginator.value - 1
      d3.select(paginator).select(`.page-button:nth-child(${decr+2})`)
        .dispatch('click')
    }
  })
  
  
  return paginator
  
}
);
  main.variable(observer("exponentValuePagination")).define("exponentValuePagination", ["Generators", "viewof exponentValuePagination"], (G, _) => G.input(_));
  main.variable(observer("galoisMultiplication")).define("galoisMultiplication", ["md"], function(md){return(
md`

#### Multiplication in the Galois field

In general, when multiplying 2 numbers with the same base b, b<sup>x</sup> \\* b<sup>y</sup> = b<sup>(x + y)</sup>.

This formula creates a shortcut in multiplying numbers in GF(256). Recall that any number in GF(256) can be expressed as a power of 2. Therefore, all multiplication can be expressed as an addition of exponents of base 2.

For example, suppose we were trying to multiple 76 * 43. We would use the following steps to perform the multiplication:

1. Convert 76 and 43 to base 2 forms. Here, 76 = 2<sup>16</sup> and 43 = 2<sup>218</sup>.
2. Add the exponents together. Here, 16 + 218 = 234
3. If the result from step 2, _x_, is greater than 255, apply _x_ modulo 255.
4. Convert the exponent back to the final value. Here, 2<sup>234</sup> = 251.

So, 76 * 43 = 251 in GF(256)

Now that all of the base concepts are explained, we can move on to generating the error codes
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Calculating Error Codes

In order to actually calculate the error codes, we need to divide a _message polynomial_ by a _generator polynomial_. Each is explained in detail below.

`
)});
  main.variable(observer()).define(["md"], function(md)
{
  const data = ["01000101", "11110010", "00010001", "10101011"]
  const numbers = data.map(x => parseInt(x, 2))
  const listToString = values => `${values.slice(0, values.length-1).join(", ")}, and ${values[values.length-1]}`
  const polynomial = numbers.slice(0, numbers.length-1).reverse().reduce((x, y, i, arr) => {
    return `${i == 0 ? `${y}x` : `${y}x<sup>${i+1}</sup>`} + ${x}`
  }, numbers[numbers.length-1].toString())
  
  return md`

#### Message Polynomial

The message polynomial consists of the data codewords converted to integers as its coefficients. For example, suppose the data codewords for a message was ${listToString(data)}. Converting the data codewords to integers would get us ${listToString(numbers)} and the message polynomial would be ${polynomial}.
  `
}
);
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
#### Generator Polynomial

The message polynomial is divided by a generator polynomial. A generator polynomial is a polynomial that is created by multiplying together ${tex`(\alpha^0x - \alpha^0)`} through ${tex`(\alpha^0x - \alpha^{n-1})`} where ${tex`\alpha = 2`} and ${tex`n = `} the number of error correction codewords to be generated.

To multiply two polynomials in GF(256) do the following steps:

1. Multiply each term of the first polynomial with each term of the second polynomial as described in [Multiplication in the Galois Field](#galoisMultiplication).

2. Convert exponents to integers using the exponent and value table, if necessary.

3. Add like terms as described in [Addition and Subtraction in the Galois Field](#galoisAddition)
`
)});
  main.variable(observer()).define(["tex","md"], function(tex,md)
{
  const term1 = tex`(x^2 + 3x + 2)`
  const term2 = tex`(x-4)`
  const alpha = tex`\alpha`
  
  return md`

  For example, suppose we were to multiply ${tex`(x^2 + 3x + 2)`} and ${tex`(x-4)`}.

  1. Multiply each term of ${term1} with each term of ${term2}.
  
    1. Convert to alpha notation where ${tex`\alpha = 2`}.

        ${tex`(x^2 + 3x + 2) \rightarrow (\alpha^0x^2 + \alpha^{25}x + \alpha^1)`}<br/><br/>
        ${tex`(x-4) \rightarrow (\alpha^0x - \alpha^2)`}

    2. Add the exponents of each part of the first term with the parts of the second term.

        ${tex`\alpha^{(0+0)}x^{(2+1)} + \alpha^{(25+0)}x^{(1+1)} + \alpha^{(1+0)}x^{(0+1)} - \alpha^{(0+2)}x^{(2+0)} - \alpha^{(25+2)}x^{(1+0)} - \alpha^{(1+2)}x^{(0+0)} \rightarrow (\alpha^0x^3 + \alpha^{25}x^2 + \alpha^1x^1 - \alpha^2x^2 - \alpha^{27}x^1 - \alpha^3x^0)`}
  
  2. Convert exponents to integers: ${tex`1x^3 + 3x^2 + 2x^1 - 4x^2 - 12x^1 - 8`}
  
  3. Combine like terms: ${tex`1x^3 + (3 \oplus 4)x^2 + (2 \oplus 12)x^1 - 8`}

  4. Final expression: ${tex`x^3 + ${3 ^ 4}x^2 + ${2 ^ 12}x + 8`}. Note how all the terms in this expression is positive. This is fine because in GF(256), negative and positive numbers are equivalent.
  `
}
);
  main.variable(observer()).define(["md","stylizeMarkdownValue","errorCorrectionsEntry"], function(md,stylizeMarkdownValue,errorCorrectionsEntry){return(
md`As mentioned before, we are generating ${stylizeMarkdownValue(errorCorrectionsEntry.ecCodewordsPerBlock, "green")} correction codeword${errorCorrectionsEntry.ecCodewordsPerBlock == 1 ? "" : "s"} per block. Therefore, the generator polynomial we will use is:`
)});
  main.variable(observer()).define(["GaloisTable","generatorPolynomial","md","showTruncatedData"], function(GaloisTable,generatorPolynomial,md,showTruncatedData)
{
  const reference = new GaloisTable()
  const trueLength = generatorPolynomial.length
  const htmlifier = poly => {
    const data = poly.map((x, i) => {
      const val = reference.atointeger(x)
      return i == trueLength-1 ? `${val}` 
        : i == trueLength-2 ? `${val == 1 ? "" : val}x` 
          : `${val == 1 ? "" : val}x<sup>${trueLength-1-i}</sup>`
    }).join(' + ')

    return md`${data}`
  }
  
  return showTruncatedData(generatorPolynomial, htmlifier, 20)
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`See below for a step by step guide to creating the generator polynomial`
)});
  main.variable(observer()).define(["galoisTable","generatorPolynomialSteps","md","tex","generatorPolyControls"], async function*(galoisTable,generatorPolynomialSteps,md,tex,generatorPolyControls)
{
  
  const toIntegers = arr => arr.map(x => galoisTable.atointeger(x))
  const toPolyTerm = (prefix, power) => {
    return power == 0 ? `${prefix}` : power == 1 ? `${prefix == 1 ? "" : prefix}x` : `${prefix == 1 ? "" : prefix}x^{${power}}`
  }
  
  const integerTransformation = (integer, power) => {
    return toPolyTerm(integer, power)
  }
  
  const alphaTransformation = (alpha, power) => {
    return toPolyTerm(`\\alpha^{${alpha}}`, power)
  }
  
  const expandedAdditionTransformation = step => {
    return (alpha, power) => {
      const term2alphaStep = `\\alpha^{(${alpha+step >= 255 ? `(${alpha}+${step})~\\%~255` : `${alpha}+${step}`})}`
      
      const term1 = toPolyTerm(`\\alpha^{(${alpha}+0)}`, `(${power}+1)`)
      const term2 = toPolyTerm(term2alphaStep, `(${power}+0)`)
      return `${term1} + ${term2}`
    }
  }
  
  const additionTransformation = step => {
    return (alpha, power) => {
      const term1 = toPolyTerm(`\\alpha^{${alpha}}`, power+1)
      const term2 = toPolyTerm(`\\alpha^{${(alpha+step) % 255}}`, power)
      return `${term1} + ${term2}`
    }
  }
  
  const additionIntegerTransformation = step => {
    return (alpha, power) => {
      const term1 = toPolyTerm(galoisTable.atointeger(alpha), power+1)
      const term2 = toPolyTerm(galoisTable.atointeger((alpha+step) % 255), power)
      return `${term1} + ${term2}`
    }
  }
  
  const xorTransformation = (previousPoly, step) => {
    return (integer, power) => {
      if (power == 0 || power == previousPoly.length) {
        return toPolyTerm(integer, power)
      } else {
        const prevIndex = previousPoly.length-1-power
        const term1 = galoisTable.atointeger((previousPoly[prevIndex] + step) % 255)
        const term2 = galoisTable.atointeger(previousPoly[prevIndex+1])
        return toPolyTerm(`(${term1} \\oplus ${term2})`, power)
      }
    }
  }
  
  const toPolyString = (arr, transformation) => arr.map((x, i) => transformation(x, arr.length-1-i)).join(' + ')
  
  const toInstructions = step => {
    const previousPoly = generatorPolynomialSteps.steps[step-1]
    const currentPoly = generatorPolynomialSteps.steps[step]
    
    const previousPolyString = toPolyString(toIntegers(previousPoly), integerTransformation)
    const previousAlphaString = toPolyString(previousPoly, alphaTransformation)
    
    const additionAlphaString = toPolyString(previousPoly, additionTransformation(step, false))
    
    
    return md`
  Mutiply last result by ${tex`(x - \alpha^{${step}})`}

  ${tex`(${previousPolyString}) * (x - \alpha^{${step}})`}

  1. Convert to alpha notation.
    
     ${tex`(${previousPolyString}) \rightarrow (${previousAlphaString})`}<br/><br/>
     ${tex`(x - \alpha^{${step}}) \rightarrow (\alpha^0x^1 - \alpha^{${step}})`}

  2. Multiply polynomials.

     ${tex`(${previousAlphaString}) * (\alpha^0x^1 - \alpha^{${step}})`}<br/><br/>
     ${tex`${toPolyString(previousPoly, expandedAdditionTransformation(step))}`}<br/><br/>
     ${tex`${toPolyString(previousPoly, additionTransformation(step))}`}
  
  3. Convert to integer notation.
     
     ${tex`${additionAlphaString}`}<br/><br/>
     ${tex`${toPolyString(previousPoly, additionIntegerTransformation(step))}`}

  4. Combine like terms.
    
     ${tex`${toPolyString(previousPoly, additionIntegerTransformation(step))}`}<br/><br/>
     ${tex`${toPolyString(toIntegers(currentPoly), xorTransformation(previousPoly, step))}`}<br/><br/>
     ${tex`${toPolyString(toIntegers(currentPoly), integerTransformation)}`}

<br/>Result: ${tex`${toPolyString(toIntegers(currentPoly), integerTransformation)}`}
    `
  }
  
  const initialStep = md`

  First polynomial:

  ${toPolyString(toIntegers(generatorPolynomialSteps.steps[0]), integerTransformation)}
  `
  
  for (const step of generatorPolyControls.generator) {
    const s = await step
    yield (s == 0 ? initialStep : toInstructions(s))
    generatorPolyControls.range.value = s
  }
}
);
  main.variable(observer("viewof generatorPolyControls")).define("viewof generatorPolyControls", ["generatorControls","errorCorrectionsEntry"], function(generatorControls,errorCorrectionsEntry){return(
generatorControls(errorCorrectionsEntry.ecCodewordsPerBlock)
)});
  main.variable(observer("generatorPolyControls")).define("generatorPolyControls", ["Generators", "viewof generatorPolyControls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`
#### Dividing the Polynomials

Now that the message and generator polynomials have been created, divide them to get the error codewords.

To divide the message polynomial by the generator polynomial, perform the following steps:

1. Multiply the message polynomial by ${tex`x^n`} where ${tex`n`} is the number of error correction codewords to be generated and multiply the generator polynomial by ${tex`x^m`} where ${tex`m`} is the leading exponent of the message polynomial.

2. Multiply the generator polynomial by the lead term of the message polynomial.

3. XOR the result of Step 2 with the message polynomial and discard the lead 0 term.

4. Repeat Steps 2-3 _n_-1 more times where ${tex`n`} is the number of data codewords.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

### Interleaving Data Block and Error Codewords

Recall that the first step of generating error codewords was dividing the encoded data into groups and blocks. If there is only one block of data codewords and one block of error codewords, all that is needed is to put the error codewords after the data codewords.

However, if there is more than one block, the data codewords and error codewords have to be interleaved.

To interleave the codewords, do the following steps:

  1. Add the first data codeword from the first block

  2. Add the first data codeword from the second block

  3. Continue until the first data codeword has been added from all the blocks

  4. Repeat steps 1-3 with the second data codeword, third data codeword, and so on.

Once all of the data codewords have been interleaved, do the same with the error codewords and add them to the end of the interleaved data codewords.

The interleaved message is:

`
)});
  main.variable(observer()).define(["groupString","interleavedMessages","showTruncatedData","md"], function(groupString,interleavedMessages,showTruncatedData,md)
{
  const data = groupString(interleavedMessages, 8)
  return showTruncatedData(data, data => md`${data.join(' ')}`, 30)
}
);
  main.variable(observer()).define(["getFinalRemainderBits","version","md","stylizeMarkdownValue"], function(getFinalRemainderBits,version,md,stylizeMarkdownValue)
{
  const remainderBits = getFinalRemainderBits(version)
  return md`
### Final Remainder Bits If Necessary

After the messages have been interleaved, there still may be a number of zeros to add to the end of the data, known as _remainder bits_. The number of remainder bits can be found in the below data. For QR code version ${stylizeMarkdownValue(version, "green")}, the current version of your QR code, there are ${remainderBits == 0 ? "no" : stylizeMarkdownValue(remainderBits, "orange")} remainder bit${remainderBits == 1 ? "" : "s"} needed to be added to the end of the data.
`
}
);
  main.variable(observer()).define(["makeArray","getFinalRemainderBits","version","makeMultiColumnTable"], function(makeArray,getFinalRemainderBits,version,makeMultiColumnTable)
{
  
  const data = makeArray(40, (_, i) => getFinalRemainderBits(i+1))
  const columnTitles = ["Version", "Remainder Bits"]
  const entriesPerColumn = 14
  const options = {
    width: "70%",
    title: "Version and Remainder Bits",
    highlightColor: "#008000a0",
    highlightFunction: (data, index) => index+1 == version
  }
  
  const mapper = (data, index) => [index+1, data]
  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`The final result in encoding your data is shown below, split into 8 bit chunks:`
)});
  main.variable(observer()).define(["md","groupString","finalMessage","showTruncatedData"], function(md,groupString,finalMessage,showTruncatedData)
{
  const htmlifier = data => md`${data.join(' ')}`
  const chunks = groupString(finalMessage, 8)
  return showTruncatedData(chunks, htmlifier, 30)
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

## Placing the encoded data in the QR code

Now that we have generated the encoded data with the error correction codewords, it is time to create our QR code. Along with our data, a QR code is comprised of different areas, shown in the picture below. Each area will be explained in detail. For our QR code, we will use black for dark modules and white for light modules.
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version","d3"], function(QRCodeRenderer,version,d3)
{
  const renderer = new QRCodeRenderer(version).include('all')
  const moduleSize = renderer.getModuleSize()
  const side = 4*(version-1)+21
  const data = [
    { keyword: 'finders', title: "Finder Patterns", color: "blue"},
    { keyword: 'separators', title: "Separators", color: "yellow"},
    { keyword: 'timings', title: "Timing Patterns", color: "red"},
    { keyword: 'dark', title: "Dark Module", color: "black" },
    { keyword: 'format', title: "Format Information", color: "violet"}
  ]
  
  if (version > 1) {
    data.push({ keyword: 'alignments', title: "Alignment Patterns", color: "green"})
  }
  
  if (version >= 7) {
    data.push({ keyword: 'version', title: "Version Information", color: "orange"})
  }
  
  const svg = data
    .reduce((x, {keyword, color}) => keyword === 'dark' ? x : x.highlight(keyword, color), renderer)
    .render()
  
  const container = d3.select(svg)
  const legend = container.append("g")
    .attr('transform', `translate(${moduleSize*(side+5)},${moduleSize*3 + 3})`)
    .selectAll('g')
    .data(data)
    .join('g')
  
  legend.append("circle")
    .attr("x", 7)
    .attr("cy", (_, i) => i * 15)
    .attr('r', 5)
    .style("fill", ({color}) => color)
  
  legend.append("text")
    .attr("x", 13)
    .attr("y", (_, i) => i * 15 + 3)
    .attr("font-size", "10px")
    .text(({title}) => title)
  
  return container.node()

}
);
  main.variable(observer()).define(["md","FileAttachment","stylizeMarkdownValue","version"], async function(md,FileAttachment,stylizeMarkdownValue,version){return(
md`
### Finder Patterns

Every QR code has finder patterns, illustrated below, consisting of a dark square, an inner light square, and a center dark square. The outer dark square is 7 modules by 7 modules while the light square and the center dark square are 5x5 and 3x3, respectively.

<br />
<div style="align:center">
${await FileAttachment("finder@1.png").image().then(image => {
  image.width = 300
  return image
})}
</div>

<br />
The finder patterns are placed in the top left corner, top right corner, and bottom left corner of the QR code. Below shows how the finder patterns would be placed, given Version ${stylizeMarkdownValue(version, "green")} of the QR code, the current version for your data.
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version"], function(QRCodeRenderer,version)
{
  const renderer = new QRCodeRenderer(version)
  return renderer.include('finders').render()
}
);
  main.variable(observer()).define(["md","stylizeMarkdownValue","version"], function(md,stylizeMarkdownValue,version){return(
md`
### Separators

Sparators are lines of light modules that sit on the outside of the finder patterns to separate them from the rest of the QR code. Separators are 1 module wide and only appear on the sides of the finder patterns that face towards the inside of the code. This is illustrated below including with the finder patterns for reference using Version ${stylizeMarkdownValue(version, "green")} of the QR code, the current version for your data.
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version"], function(QRCodeRenderer,version)
{
  const renderer = new QRCodeRenderer(version)
  return renderer
    .include(['finders', 'separators'])
    .highlight('finders', 'black')
    .render()
}
);
  main.variable(observer()).define(["md","stylizeMarkdownValue","version"], function(md,stylizeMarkdownValue,version){return(
md`
### Timing Patterns

Each QR code has two timing patterns, one horizontal and one vertical. These timing patterns consist of alternating dark and light modules, always starting and ending with a dark module. They are placed in the 7th column and 7th row of the QR code, between the separators.

Below illustrates the location of the timing patterns in Version ${stylizeMarkdownValue(version, "green")} of the QR code, the current version for your data.
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version"], function(QRCodeRenderer,version)
{
  const renderer = new QRCodeRenderer(version)
  return renderer.include(['separators', 'timings'])
    .highlight('separators', 'gray')
    .render()
}
);
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`
### Alignment Patterns

QR Versions larger than 1 are required to have alignment patterns. An alignment pattern, illustrated below is a similar design to a finder pattern. It has a 5 module by 5 module dark pattern, an inner 3 module by 3 module light pattern, and a single dark module in the center.

${await FileAttachment("alignment.png").image().then(image => {
  image.height = 200
  return image
})}

The alignment pattern location table, shown below, defines the locations of the alignments, which are dependent on the version of the QR code. The values in the table represent row and column coordinates of the center of each module. For example, Version 2 has the values 6 and 18. This corresponds to 4 alignment patterns with the center coordinates (6, 6), (6, 18), (18, 6) and (18, 18).

`
)});
  main.variable(observer()).define(["version","makeArray","getAlignmentPatternCenters","makeMultiColumnTable"], function(version,makeArray,getAlignmentPatternCenters,makeMultiColumnTable)
{
  const options = {
    width: "85%",
    title: "Alignment Pattern Location Table",
    highlightColor: "#008000a0",
    highlightFunction: (_, index) => index + 2 == version,
  }
  
  const data = makeArray(39, (_, i) => getAlignmentPatternCenters(i+2))
  const entriesPerColumn = 14
  const mapper = (data, index) => [index+2, data.join(', ')]
  const columnTitles = ["Version", "Center Values"]
  
  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
  
}
);
  main.variable(observer()).define(["getAlignmentPatternCenters","stylizeMarkdownValue","getAlignmentPatternCenterCoordinates","md","version"], function(getAlignmentPatternCenters,stylizeMarkdownValue,getAlignmentPatternCenterCoordinates,md,version)
{
  const versionOneText = "there are no alignment patterns to be placed."
  const normalText = (version) => {
    
    const tableValues = getAlignmentPatternCenters(version)
    const markedTableValues = tableValues.map(x => stylizeMarkdownValue(x, "orange"))
    const joinAsList = (values) => {
      return `${values.slice(0, values.length-1).join(", ")}${values.length > 2 ? "," : ""} and ${values[values.length-1]}`
    }
    
    const coordinates = getAlignmentPatternCenterCoordinates(version, true)
    const markedCoordinates = coordinates.map(([x, y]) => stylizeMarkdownValue(`(${x},${y})`, "orange"))
    const invalidCoordinates = [
      [tableValues[0], tableValues[0]],
      [tableValues[0], tableValues[tableValues.length-1]],
      [tableValues[tableValues.length-1], tableValues[0]]
    ]
    
    const markedInvalidCoordinates = invalidCoordinates.map(([x, y]) => stylizeMarkdownValue(`(${x},${y})`, "red"))
    
    return `the values from the alignment table are ${joinAsList(markedTableValues)} which translates into center coordinates of ${joinAsList(markedCoordinates)}. However, coordinates ${joinAsList(markedInvalidCoordinates)} overlap the finder and separator patterns, so no alignment pattern is placed there. 

This is illustrated below, with both the initial and final placement of alignment patterns, along with the row and columns highlighted and the finder and separator patterns as reference.
  `
  }
  
  return md`
  However, the alignment patterns cannot overlap the finder and separator patterns; therefore, they must be placed after those other patterns are placed. It also means that the coordinates which overlap the finder and separator patterns are excluded from having an alignment pattern. In our Version 2 example, (6, 6), (6, 18) and (18, 6) do not have an alignment pattern because they overlap the separator and finder patterns.

  For Version ${stylizeMarkdownValue(version, "green")}, the current version of your QR Code, ${version == 1 ? versionOneText : normalText(version)}
  `
}
);
  main.variable(observer()).define(["version","html","getAlignmentPatternCenters","QRCodeRenderer","d3"], function(version,html,getAlignmentPatternCenters,QRCodeRenderer,d3)
{
  if (version == 1) {
    return html``
  }
  
  const values = getAlignmentPatternCenters(version)
  const incorrectRenderer = new QRCodeRenderer(version)
  const moduleSize = incorrectRenderer.getModuleSize()
  
  const incorrectAlignmentSvg = incorrectRenderer
    .include(['finders', 'separators', 'alignments'])
    .highlight('finders', 'black')
    .highlight('separators', 'black')
    .render()
  
  const correctAlignmentSvg = new QRCodeRenderer(version)
    .include(['finders', 'separators', 'alignments'])
    .highlight('finders', 'black')
    .highlight('separators', 'black')
    .render()
  
  const incorrectValues = [
    [values[0]-2, values[0]-2],
    [values[0]-2, values[values.length-1]-2],
    [values[values.length-1]-2, values[0]-2]
  ]
  
  const applyHighlightedAlignmentLocations = (svg, values) => {
    const side = 4*(version-1)+21
    
    const rows = d3.select(svg)
      .selectAll('g.alignment-row')
      .data(values)
      .join('g')
        .classed('alignment-row', true)
    
    rows.append('rect')
        .attr('x', 0)
        .attr('y', d => d*moduleSize)
        .attr('width', side*moduleSize)
        .attr('height', 1*moduleSize)
        .style('fill', 'red')
        .style('fill-opacity', 0.45)
    
    rows.append('text')
      .attr('x', side*moduleSize+5)
      .attr('y', d => d * moduleSize + 6)
      .text(d => d)
      .style('fill', 'red')
      .style('stroke', 'red')
      .style('font-size', 12)
      .style('stroke-width', 0.3)
    
    rows.append('text')
      .attr('x', -17)
      .attr('y', d => d * moduleSize + 6)
      .text(d => d)
      .style('fill', 'red')
      .style('stroke', 'red')
      .style('font-size', 12)
      .style('stroke-width', 0.3)
    
    const columns = d3.select(svg)
      .selectAll('g.alignment-col')
      .data(values)
      .join('g')
        .classed('alignment-col', true)
     
    columns.append('rect')
        .attr('x', d => d*moduleSize)
        .attr('y', 0)
        .attr('width', 1*moduleSize)
        .attr('height', side*moduleSize)
        .style('fill', 'red')
        .style('fill-opacity', 0.45)
    
    columns.append('text')
      .attr('x', d => d * moduleSize-2)
      .attr('y', side*moduleSize + 14)
      .text(d => d)
      .style('fill', 'red')
      .style('stroke', 'red')
      .style('font-size', 12)
      .style('stroke-width', 0.3)
    
    columns.append('text')
      .attr('x', d => d * moduleSize-2)
      .attr('y', -6)
      .text(d => d)
      .style('fill', 'red')
      .style('stroke', 'red')
      .style('font-size', 12)
      .style('stroke-width', 0.3)
  }
  
  applyHighlightedAlignmentLocations(incorrectAlignmentSvg, values)
  applyHighlightedAlignmentLocations(correctAlignmentSvg, values)
  
  const incorrectAlignments = d3.select(incorrectAlignmentSvg)
    .select('.alignment')
    .selectAll('g.incorrect')
    .data(incorrectValues)
    .join('g')
      .classed('incorrect', true)
  
  incorrectAlignments.append("rect")
    .attr("x", ([x, _]) => x*moduleSize)
    .attr("y", ([_, y]) => y*moduleSize)
    .attr("width", 5*moduleSize)
    .attr("height", 5*moduleSize)
    .style("fill", "black")
  
  incorrectAlignments.append("rect")
    .attr("x", ([x, _]) => (x+1)*moduleSize)
    .attr("y", ([_, y]) => (y+1)*moduleSize)
    .attr("width", 3*moduleSize)
    .attr("height", 3*moduleSize)
    .style("fill", "white")
  
  incorrectAlignments.append("rect")
    .attr("x", ([x, _]) => (x+2)*moduleSize)
    .attr("y", ([_, y]) => (y+2)*moduleSize)
    .attr("width", moduleSize)
    .attr("height", moduleSize)
    .style("fill", "black")
  
  incorrectAlignments.append("rect")
    .attr("x", ([x, _]) => x*moduleSize)
    .attr("y", ([_, y]) => y*moduleSize)
    .attr("width", 5*moduleSize)
    .attr("height", 5*moduleSize)
    .style("fill", "red")
    .style("fill-opacity", 0.6)
  
  return html`
    <div>
      <div><strong>Incorrect Alignment Placement</strong></div>
      ${incorrectAlignmentSvg}
      <div><strong>Correct Alignment Placement</strong></div>
      ${correctAlignmentSvg}
    </div>
`
  
}
);
  main.variable(observer()).define(["version","md"], function(version,md)
{
  if (version == 1) {
    return md``
  }
  
  return md`
Notice also that position of some of the alignment patterns overlap with the timing patterns. However, this does not create a conflict as the light and dark modules of the timing patterns always coincide with the light and dark patterns of the alignment patterns.
`
  
}
);
  main.variable(observer()).define(["md","stylizeMarkdownValue","version"], function(md,stylizeMarkdownValue,version){return(
md`
### Dark Module

Every QR code has a single dark module just to the right of the top of the bottom left separator. Specifically, the module is at coordinate (4*(_version_-1)+13, 8). For Version ${stylizeMarkdownValue(version, "green")}, the current QR version for your data, this coordinate is at ${stylizeMarkdownValue(`(${4*(version-1)+13}, 8)`, "green")}. This is illustrated below in black, with the separators shown as reference
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version"], function(QRCodeRenderer,version)
{
  const renderer = new QRCodeRenderer(version)
  return renderer.include(['separators', 'dark'])
    .highlight('separators', 'gray')
    .render()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
### Version Information

Versions 7 and higher contain two areas that store version information bits. One area is a 6 module by 3 module block above the bottom left separator. The other area is a 3 module by 6 module block to the left of the top right separator.

The following tables shows the indices of the version information string and their location within both of the version information blocks.

`
)});
  main.variable(observer()).define(["QRCodeRenderer"], function(QRCodeRenderer)
{
  const renderer = new QRCodeRenderer(7)
  return renderer.include(['version', 'timings', 'separators'])
    .highlight('separators', 'gray')
    .highlight('timings', 'gray')
    .render()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

<strong>Top Right Version Information Block</strong>

| Column 1     | Column 2  | Column 3  |
-------------- | --------- | --------- |
| 0            | 1         | 2        |
| 3            | 4         | 5        |
| 6            | 7         | 8        |
| 9            | 10        | 11        |
| 12           | 13        | 14        |
| 15           | 16        | 17        |
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

<strong>Bottom Left Version Information Block</strong>

| Column 1     | Column 2  | Column 3  | Column 4  | Column 5  | Column 6  |
-------------- | --------- | --------- | --------- | --------- | --------- |
| 0           | 1        | 2        | 3        | 4        | 5        |
| 6           | 7        | 8        | 9        | 10        | 11        |
| 12           | 13        | 14        | 15        | 16        | 17        |

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
 The version string itself is 18 bits long with 6 bits for the QR code version and 12 error correction bits. This is explained in further detail below.
`
)});
  main.variable(observer()).define(["md","version","stylizeMarkdownValue","binaryEncode"], function(md,version,stylizeMarkdownValue,binaryEncode){return(
md`
#### Version Bits

  The first 6 bits of the version string specify the version of the QR code. ${version < 7 ? "" : `Because the current QR code version for your data is ${stylizeMarkdownValue(version, "orange")}, the version string bits are ${stylizeMarkdownValue(binaryEncode(version, 6), "green")}.
`}
`
)});
  main.variable(observer("versionErrorCorrectionBits")).define("versionErrorCorrectionBits", ["md"], function(md){return(
md`
#### Error Correction Bits

  The last 12 bits of the string are error correction bits. Error correction bits are still created by dividing a message polynomial by a generator polynomial, but there are differences in doing so, which are discussed below
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
 ##### Message Polynomial
  
  The message polynomial is the version bits described above. While each bit is a coefficient in the polynomial, it remains represented as a binary string.
`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`

##### Generator Polynomial

Per the QR code specification, the generator polynomial for creating version error correction codes is ${tex`x^{12} + x^{11} + x^{10} + x^9 + x^8 + x^5 + x^2 + 1`}. This is represented by the binary string 1111100100101.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
##### Division Steps

Pad zeros to the right of the message bit string until it is _n_ + _m_ bits long, where _n_ is the length of the message bit string and _m_ is the number of desired error correction bits. Remove any leading zeros to the left of the message bit string. Then, repeat these steps until the length of the message bit string is less than or equal to _m_.

1. Pad zeros to the right of the generator polynomial bit string until it is the same length as the message bit string.
2. XOR the result of the previous step with the current bit string.
3. Remove leading zeros from the left side of the result from the previous step. This is the new message bit string.

Once this is done, pad the message bit string with zeros on the left to make it _m_ bits long. This string is the error correction bits.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now, combine the version bits and the error correction bits to make the version information string.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
#### Version Table

  Instead of calculating the version string manually, all the possible version information strings can be put into a table. From there, we can simply choose the version information string that matches our QR code version. That table is shown below, with the current version (if applicable) highlighted.
`
)});
  main.variable(observer()).define(["makeArray","getVersionString","version","makeMultiColumnTable"], function(makeArray,getVersionString,version,makeMultiColumnTable)
{
  const data = makeArray(41-7, (_, i) => getVersionString(i+7))
  const columnTitles = ["Version", "Version Bits"]
  const entriesPerColumn = 14
  const mapper = (data, index) => [index+7, data]
  const options = {
    width: "90%",
    highlightColor: "#008000a0",
    highlightFunction : (_, index) => index+7 == version,
    title: "Version and Version Information Bits"
  }
  
  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
}
);
  main.variable(observer()).define(["stylizeMarkdownValue","version","md"], function(stylizeMarkdownValue,version,md)
{
  const belowVersionText = `For QR code Version ${stylizeMarkdownValue(version, "green")}, the current version of your data, there is no version information to be stored`

  const normalText = `Placement of the version string is shown below for QR code Version ${stylizeMarkdownValue(version, "green")}, the current version of your data. The timing patterns and separators are included as reference.`
  
  return md`${version < 7 ? belowVersionText : normalText}`
}
);
  main.variable(observer()).define(["version","html","QRCodeRenderer"], function(version,html,QRCodeRenderer)
{
  if (version < 7) {
    return html``
  }
  
  const renderer = new QRCodeRenderer(version)
  return renderer.include(['separators', 'timings', 'version'])
    .highlight('separators', 'gray')
    .highlight('timings', 'gray')
    .render()
}
);
  main.variable(observer()).define(["md","stylizeMarkdownValue","version"], function(md,stylizeMarkdownValue,version){return(
md`
### Reserve Format Information

Before we put the encoded data into our QR code, we have to reserve space for the format information. Because the content of this information is based on the mask pattern for the QR code, we cannot fill the space yet, so we simply reserve the space.

Space is reserved for the QR core format information in the following places:

- Below and to the right of the top left separator
- Below the top right separator
- To the right of the bottom left separator

This is illustrated below in red for Version ${stylizeMarkdownValue(version, "green")}, the current version for your QR code. The separators, timings patterns, and dark module are included as reference.
`
)});
  main.variable(observer()).define(["QRCodeRenderer","version"], function(QRCodeRenderer,version)
{
  const renderer = new QRCodeRenderer(version)
  return renderer.include(['separators', 'format', 'dark', 'timings'])
    .highlight('separators', 'gray')
    .highlight('timings', 'gray')
    .highlight('dark', 'gray')
    .highlight('format', 'red')
    .render()
}
);
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`
## Placing the Encoded Data in the QR Code

Now we can place the encoded data in the QR code. We start the placement at the bottom right of the QR code, going upwards in a 2 module wide column. First, the right column gets filled, then the left column. This is illustrated in the below picture, where the module to be filled is labeled in order from 1 to 8.

${await FileAttachment("upward_data.png").image()}

<br />
<br />
Once we have reached the top of the QR code, we start another 2 module column to the left of the previous one. We move downward, one again filling the right column before the left column. Just like the above direction, this is illustrated below

${await FileAttachment("downward_data.png").image()}

<br />
This pattern continues from right to left until we reach the left edge of the QR code

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Encountering Function Patterns or Reserved Areas

When a function pattern such as an alignment pattern or a reserved area like the format area is encountered, simply skip the module and proceed in the current upward or downward direction. 
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Encountering the Vertical Timing Pattern

The exception to encountering function patterns is the vertical timing pattern. When this pattern is encountered, start the new column to the left of the timing pattern. In other words, do not overlap a column with this function pattern. This rule is demonstrated below.

`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
Below is the final data illustrated
`
)});
  main.variable(observer()).define(["QRCodeDataRenderer","version","finalMessage","recoveryLevel"], function(QRCodeDataRenderer,version,finalMessage,recoveryLevel)
{
  const renderer = new QRCodeDataRenderer(version, finalMessage, recoveryLevel)
  return renderer.include('all').exclude(['format', 'datamask']).render()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`See below for a step by step visualization of filling in the data modules`
)});
  main.variable(observer()).define(["version","QRCodeRenderer","d3","dataHandler","finalMessage","recoveryLevel","dataPlacingControls"], async function*(version,QRCodeRenderer,d3,dataHandler,finalMessage,recoveryLevel,dataPlacingControls)
{
  const side = 4*(version-1)+21
  
  const renderer = new QRCodeRenderer(version);
  const moduleSize = renderer.getModuleSize()
  
  const svg = renderer.include('all')
    .highlight('format', 'red')
    .render()
  
  const container = svg
  
  const info = d3.select(container).append('g')
    .classed('info', true)
    .attr('transform', `translate(${moduleSize*side+8+21},${24+12})`)
  
  info.append('text')
    .text('Type of module:')
  
  info.append('text')
    .classed('module-type', true)
    .attr('dy', 20) 
    .attr('fontsize', 18)
  
  info.append('text')
    .attr('dy', 45)
    .text('Action:')
  
  info.append('text')
    .attr('dy', 65)
    .classed('action', true)
    .attr('fontsize', 18)
   
  const toCapitalize = phrase => phrase.split(' ').map(x => x.slice(0, 1).toUpperCase() + x.slice(1)).join(' ')
  
  const handler = dataHandler(finalMessage, version, recoveryLevel)
  const indices = handler.toIndices()
  
  d3.select(svg).append('rect')
    .classed('pointer', true)
    .style('fill', '#FFFF00')
    .attr('width', moduleSize)
    .attr('height', moduleSize)
    .attr('x', (side-1)*moduleSize)
    .attr('y', (side-1)*moduleSize)
  
  for (const step of dataPlacingControls.generator) {
    
    let s = await step

    const filledDataSize = d3.select(svg).selectAll('rect.data').size()
    const indicesToFill = indices.filter(([x1, y1]) => {
      const column = Math.floor(side/2) - Math.ceil((x1 < 6 ? x1 + 1 : x1)/2)
      const direction = column % 2
      const columnRemainder = direction == 0 ? 2*(side-1-y1) : 2*y1
      const rightSide = Math.ceil((x1 < 6 ? x1 + 1 : x1/2)) == Math.ceil((x1 < 6 ? x1 : x1-1)/2)
      return (2*side*column + columnRemainder + (rightSide ? 0 : 1)) < s
    })

    d3.select(svg).selectAll('rect.data')
      .data(indicesToFill)
      .enter()
      .append('rect')
      .classed('data', true)
      .attr('width', moduleSize)
      .attr('height', moduleSize)
      .attr('x', ([x, _]) => x*moduleSize)
      .attr('y', ([_, y]) => y*moduleSize)
      .style('fill', (_, i) => finalMessage[i+filledDataSize] == '1' ? 'black' : 'white')

    if (s == side*side - side) {
      d3.select(svg).select('rect.pointer').style('fill', 'none')
      d3.select(svg).select('.action').text('')
      d3.select(svg).select('.module-type').text('')
      d3.select(svg).select('g.gridlines').raise()
      d3.select(svg).selectAll('.format').remove()
      yield container
      dataPlacingControls.range.value = s
      continue;
    }

    const column = Math.floor(s/(2*side))
    const afterVerticalTiming = (Math.floor(side/2) - column <= 3) ? 1 : 0

    const direction = column % 2
    const x = side-1-(2*column) - (s%2) - afterVerticalTiming
    const columnNumber = s % (2*side)
    const y = direction == 0 ? (side-1-Math.floor(columnNumber/2)) : Math.floor(columnNumber/2)

    const coordinateType = handler.getCoordinateType([x, y])

    d3.select(svg).select('rect.pointer')
      .attr('x', x*moduleSize)
      .attr('y', y*moduleSize)

    d3.select(svg).select('.module-type').text(toCapitalize(coordinateType))

    if (coordinateType == 'data') {
      const index = indices.findIndex(([x1, y1]) => (x1 == x) && (y1 == y))
      const data = finalMessage[index]

      d3.select(svg).append('rect')
        .classed('data', true)
        .attr('width', moduleSize)
        .attr('height', moduleSize)
        .style('fill', data == '1' ? 'black' : 'white')
        .attr('x', x*moduleSize)
        .attr('y', y*moduleSize)

      d3.select(svg).select('rect.pointer').raise()
      d3.select(svg).select('.action').text(`Place ${data == '1' ? 'black' : 'white'} module`)

    } else {
      d3.select(svg).select('.action').text('Skip Module')
    }

    d3.select(svg).select('g.gridlines').raise()

    yield container
    dataPlacingControls.range.value = s
  }
  
}
);
  main.variable(observer("viewof dataPlacingControls")).define("viewof dataPlacingControls", ["generatorControls","version"], function(generatorControls,version){return(
generatorControls((4*(version-1)+21) * (4*(version-1)+21) - (4*(version-1)+21) + 1)
)});
  main.variable(observer("dataPlacingControls")).define("dataPlacingControls", ["Generators", "viewof dataPlacingControls"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`## Masking the QR Code

Once the data is placed in the QR code, we must determine the best mask pattern to be used. Masking a module simply means to change a dark module to a light module and vice versa. This is done to ease the scanning process for a QR code reader. Mask patterns can only be applied to data modules and error corrections codes. In other words, don't mask finder patterns, timing patterns, alignment patterns, etc.

### Masking Patterns

There are eight possible mask patterns for a QR code. The mask patterns are described below as formulas. The mask is applied if the formula is true for a given module row and column coordinate:

- Pattern 0: \` (row + column) mod 2 == 0\` (row and column are both odd or both even)
- Pattern 1: \` row mod 2 == 0\` (even numbered rows)
- Pattern 2: \` column mod 3 == 0\` (every third column)
- Pattern 3: \` (row + column) mod 3 == 0\` (sum of row and column is divisible by 3)
- Pattern 4: \` (floor(row/2) + floor(column / 3)) mod 2 == 0\`
- Pattern 5: \` ((row * column) mod 2) + ((row * column) mod 3) == 0\`
- Pattern 6: \` ( ((row * column) mod 2) + ((row * column) mod 3) ) mod 2 == 0\`
- Pattern 7: \` ( ((row + column) mod 2) + ((row * column) mod 3) ) mod 2 == 0\`

Side note: Here's an explanation for some of the math operations used:

- _a_ mod _n_ refers to the [modulo operation](https://en.wikipedia.org/wiki/Modulo_operation), or the remainder after _a_ is divided by _n_.
- _floor_(_n_) refers to the [floor operation](https://en.wikipedia.org/wiki/Floor_and_ceiling_functions), or the greatest integer less than or equal to _n_.

### Evaluating the Best Mask Pattern to Use

In order to find the best mask pattern, apply one of the mask patterns to a QR code. Then there is a penalty score that is given based on four conditions. Do this for all eight mask patterns and pick the mask pattern that has the lowest penalty score. Note that the evalution applies to the entire code, not just the area that has been masked. Because of this, we will need to fill in the format section of the QR code.
`
)});
  main.variable(observer()).define(["md","stylizeMarkdownValue","recoveryLevel"], function(md,stylizeMarkdownValue,recoveryLevel){return(
md`## Filling in Format Information

Now that the mask pattern to use has been identified, fill in the reserved format information

### Format Information

The format string is 15 bits long and consists of 2 bits for the error correction level, 3 bits for the mask pattern number, and 10 error correction bits. Once those bits are generated, they are XORed with the pattern 101010000010010. This is explained in further detail below

#### Error Correction Level Bits

First, we get the two bits that specify the error correction level. The below table shows the specified bits for each correction level. For correction level ${stylizeMarkdownValue(recoveryLevel, 'orange')} of your data, the error correction bits are ${stylizeMarkdownValue(recoveryLevel === 'L' ? '01' : recoveryLevel === 'M' ? '00' : recoveryLevel === 'Q' ? '11' : '10', "green")}. This is also displayed in the below table.
`
)});
  main.variable(observer()).define(["d3","html","recoveryLevel"], function(d3,html,recoveryLevel)
{
  const data = [
    {level: 'L', bits: '01'},
    {level: 'M', bits: '00'},
    {level: 'Q', bits: '11'},
    {level: 'H', bits: '10'}
  ]
  
  const table = d3.create('table')
  
  const rows = table.selectAll('tr')
    .data(data)
    .join('tr')
  
  rows.append('td')
    .text(({level}) => level)
  
  rows.append('td')
    .text(({bits}) => bits)
  
  table.insert(() => html`<tr><th>Error Correction Level</th><th>Bits</th></tr>`, ":first-child")
  
  rows.filter(({level}) => level === recoveryLevel)
    .style('background-color', '#0000ff60')
  
  return table.node()
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`
#### Mask Pattern Bits

Next, we convert the mask pattern into a 3 bit binary number. For example, Mask Pattern 3 would be converted to _011_ while Mask Pattern 6 would be converted to _110_.
`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex){return(
md`

#### Error Correction Bits and Final Steps

Now we generate 10 error correction bits for the first 5 bits using the same process as the [Version Error Correction Bits](#versionErrorCorrectionBits) section. In this case, the message polynomial is the 5 bits described in the previous section and the generator polynomial is ${tex`x^{10} + x^8 + x^5 + x^4 + x^2 + x + 1`} or 10100110111.

Afterwards, we XOR the 15 bits with the pattern 101010000010010 to get the final format information string.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Placing Version String in QR Code

Below illustrates how to put the format string into a QR code

`
)});
  main.variable(observer()).define(["QRCodeRenderer","version","d3"], function*(QRCodeRenderer,version,d3)
{
  
  const renderer = new QRCodeRenderer(version)
  const svg = renderer.include(['separators', 'timings'])
    .highlight('separators', 'gray')
    .highlight('timings', 'gray')
    .render()
  
  const container = d3.select(svg)
  yield svg
  
  const moduleSize = renderer.getModuleSize()
  const size = 4*(version-1)+21
  
  const data = Array.from({length: 15}, (_, i) => i)
  
  const colors = d3.scaleOrdinal()
    .domain(data)
    .range([...d3.schemePastel1, ...d3.schemeCategory10.slice(0, 6)])
  
  const format = container.append('g')
    .classed('format', true)
  
  format.selectAll('rect.first')
    .data(data)
    .join('rect')
      .classed('first', true)
      .attr('x', d => moduleSize * (d < 6 ? d : d == 6 ? 7 : 8))
      .attr('y', d => moduleSize * (d < 8 ? 8 : d == 8 ? 7 : 14-d))
      .attr('width', moduleSize)
      .attr('height', moduleSize)
      .style('fill', d => colors(d))
  
  format.selectAll('rect.second')
    .data(data)
    .join('rect')
      .classed('second', true)
      .attr('x', d => moduleSize * (d < 7 ? 8 : size-1-(14-d)))
      .attr('y', d => moduleSize * (d < 7 ? size-1-d : 8))
      .attr('width', moduleSize)
      .attr('height', moduleSize)
      .style('fill', d => colors(d))
  
}
);
  main.variable(observer()).define(["d3","range"], function(d3,range)
{
  const container = d3.create('svg')
    .attr('viewBox', [-5, 0, 25*5*2+10, 45])
  
  const data = range(0, 15)
  
  const colors = d3.scaleOrdinal()
    .domain(data)
    .range([...d3.schemePastel1, ...d3.schemeCategory10.slice(0, 6)])
  
  const legend = container.append('g')
    .attr('transform', `translate(0, 10)`)
    .classed('legend', true)
  
  legend.append('g')
    .selectAll('rect')
    .data(data)
    .join('rect')
      .attr('x', d => (5+10)*d)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', d => colors(d))
  
  legend.append('g')
    .attr('transform', `translate(0, 22)`)
    .selectAll('text')
    .data(data)
    .join('text')
      .attr('x', d => (5+10)*d+(d < 10 ? 2 : 0))
      .attr('y', 0)
      .style('font-size', '0.5em')
      .text(d => d)
    
      
  return container.node()
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

#### Format Table

Similar to the version information table, we can put all of the possible format strings in a table and choose the one that matches our mask pattern and error correction level.
`
)});
  main.variable(observer()).define(["makeArray","getFormatString","makeMultiColumnTable"], function(makeArray,getFormatString,makeMultiColumnTable)
{
  const entriesPerColumn = 16
  const options = {
    title: "<strong>Format Table</strong>",
  }

  const columnTitles = ["Error Correction Level", "Mask Pattern", "Format String"]

  const indexToLevelPattern = index => {
    const ecc = Math.floor(index/8)
    const pattern = index % 8
    return {
      ecc: ecc == 0 ? 'L' : ecc == 1 ? 'M' : ecc == 2 ? 'Q' : 'H',
      pattern
    }
  }

  const mapper = (data, index) => {
    const {ecc, pattern } = indexToLevelPattern(index)
    return [ecc, pattern, data]
  }

  const data = makeArray(32, (_, i) => {
    const { ecc, pattern } = indexToLevelPattern(i)
    return getFormatString(ecc, pattern)
  })

  return makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Now that we know how to fill in the format areas, we can evaluate a QR code mask pattern using four evaluation conditions.

The four evaluation conditions are as follows:

- A score for each row or column of 5 or more modules that have the same color
- A score for each 2x2 area of the same-colored modules in the code
- A score for patterns tht look similar to the finder patterns
- A score if more than half of the modules are dark or light

Each condition will be explained more in detail below. Each explanation will also have an application example with a version 2 QR code with error correction level H and mask pattern 0.

`
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`

#### Penalty 1 (Row/Column of 5+ Modules of the Same Color)

For every row and column, check if there are five consecutive modules of the same color. If so, add 3 to the penalty. If there are additional consecutive modules of the same color, add 1 for each one. For example, using our reference QR code, we note the rows in which the above pattern appears. This is highlighted in the below picture, with red denoting the 5 consecutive modules worth 3 each, and teal representing the extra modules that are of the same color. The horizontal total adds up to 102. 

${await FileAttachment("penalty_one_horizontal@1.png").image()}

We highlight the same patterns for column. This is illustrated in the below picture. The vertical total adds up to 108.

${await FileAttachment("penalty_one_vertical@1.png").image()}

Therefore, the total penalty score for this part is 102 + 108 = 210.
`
)});
  main.variable(observer()).define(["penaltyHandler","finalMessage","version","recoveryLevel"], function(penaltyHandler,finalMessage,version,recoveryLevel)
{

  const maskVersion = 0
  const handler = penaltyHandler(finalMessage, version, recoveryLevel, maskVersion)

  return Array.from(handler._compactData.join(''))

}
);
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`

#### Penalty 2 (2x2 Area of the Same Color)

Check every 2x2 square in the QR code making sure to include blocks that overlap with other blocks. For every 2x2 square with the same color module, add 3 to the penalty score.

For example, looking at our reference QR code, the above pattern is highlighted. Note that some of the 2x2 squares overlap each other. 

${await FileAttachment("penalty_2.png").image()}

There are a total of 56 2x2 squares in the QR code. Therefore, the penalty score for this part is 56 * 3 = 168.

`
)});
  main.variable(observer()).define(["md","FileAttachment"], async function(md,FileAttachment){return(
md`

#### Penalty 3 (Similarity to the Finder Pattern)

For every row and column, look for a pattern of dark-light-dark-dark-dark-dark-light-dark with four light modules on either side. As an illustration, the pattern would look like either:

${await FileAttachment("penalty_three_left.jpg").image()}

or

${await FileAttachment("penalty_three_right.jpg").image()}

Add 40 to the penalty score every time either of these pattern occur.

For example, look at the QR code below. The above pattern appears 3 times; since the penalty is 40 for each pattern, the total penalty score for this part is 120.

${await FileAttachment("penalty_three_example@1.png").image()}
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`



`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Penalty 4 (Difference of Light and Dark Modules)

This penalty is based on the ratio of light modues to dark modules. The calculation for this penalty rule can be made using the following steps:

1. Calculate the percentage of dark modules that are in the QR code.
2. Determine the previous and next multiple of five of this percent. For example, if a QR code has 38% dark modules, the previous multiple is 35 and the next multiple is 40.
3. Subtract 50 from the numbers in step 2. Then take the absolute value. From our previous example: 
  \` |35-50| = |-15| = 15 and |40-50| = |-10| = 10\`
4. Divide the numbers from step 3 by 5. From our previous example: \` 15/5 = 3 and 10/5 = 2\`
5. Take the smaller of the two numbers and multiply it by 10. This is the penalty score. From our example, 2 is the smaller number so the penalty score is \` 2 * 10 = 20 \`
`
)});
  main.variable(observer()).define(["md","tex"], function(md,tex)
{
  const darkModules = 312
  const totalModules = 625
  
  const percentage = darkModules / totalModules * 100
  const prevMultiple = Math.floor(percentage/5)*5
  const nextMultiple = Math.ceil(percentage/5)*5
  
  const leftStep3 = Math.abs(prevMultiple-50)
  const rightStep3 = Math.abs(nextMultiple-50)
  
  const leftStep4 = leftStep3 / 5
  const rightStep4 = rightStep3 / 5
  
  const minStep4 = Math.min(leftStep4, rightStep4)
  const lastStep = minStep4 * 10
  
  return md`

  Going back to our QR code example, let us calculate this penalty score.

  1. There are ${darkModules} dark modules and ${totalModules} total modules in the QR code, meaning that the percentage of dark modules is: 
  (${darkModules} / ${totalModules}) * 100 ${tex`\approx`} ${Math.round(darkModules/totalModules*1000000)/10000}

  2. Based on step 1, the previous multiple of 5 is ${prevMultiple} and the next multiple of 5 is ${nextMultiple}.

  3. Given our values in step 2, we get 
|${prevMultiple}-50| = ${leftStep3} and 
|${nextMultiple}-50| = ${rightStep3}

  4. Dividing each value by 5, we get ${leftStep3} / 5 = ${leftStep4} and ${rightStep3} / 5 = ${rightStep4}.

  5. ${minStep4} is the smaller of the two values in step 4. Therefore the final penalty score for this part is ${minStep4} * 10 = ${lastStep}.

`
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Adding up all the penalty scores, we get 498 and this would be our final score for this mask pattern. Then, repeat all the steps for the other 7 mask patterns and pick the one with the lowest score. In this case, it would be mask pattern 1.`
)});
  main.variable(observer()).define(["md","stylizeMarkdownValue","minPenalty","chosenMask"], function(md,stylizeMarkdownValue,minPenalty,chosenMask){return(
md`For your data and correction level, the different QR code mask patterns are shown below with their respective penalty scores. As highlighted below, the minimum penalty score is ${stylizeMarkdownValue(minPenalty, "orange")}. Therefore we should pick mask pattern ${stylizeMarkdownValue(chosenMask, "green")}`
)});
  main.variable(observer()).define(["html","QRCodeDataRenderer","version","finalMessage","recoveryLevel","penalties","d3","chosenMask"], function*(html,QRCodeDataRenderer,version,finalMessage,recoveryLevel,penalties,d3,chosenMask)
{
  const container = html`
    <div class="penalty-container" style="display:grid;grid-template-rows:repeat(4, 1fr);grid-template-columns:repeat(2, 45%);">
    </div>
  `
  
  yield container
  
  const renderer = new QRCodeDataRenderer(version, finalMessage, recoveryLevel)
  const data = penalties.map((penalty, i) => {
    return {
      penalty,
      code: renderer.include('all').setMask(i).render(),
    }
  })
  
  const areas = d3.select(container).selectAll('div.penalty-container div')
    .data(data)
    .join('div')
  
  areas.append(({code}) => code)
  
  const penaltyArea = areas.append('div')
    .classed('penalties', true)
  
  penaltyArea.append('div')
    .text((_, i) => `Mask Pattern ${i}`)
    .style('padding', '2% 10%')
    .style('font-size', '24px')
  
  penaltyArea.append('div')
    .text(({penalty}) => `Penalty 1: ${penalty.penalties[0].score}`)
    .style('padding', '0 10%')
    .style('font-size', '24px')
  
  penaltyArea.append('div')
    .text(({penalty}) => `Penalty 2: ${penalty.penalties[1].score}`)
    .style('padding', '0 10%')
    .style('font-size', '24px')
  
  penaltyArea.append('div')
    .text(({penalty}) => `Penalty 3: ${penalty.penalties[2].score}`)
    .style('padding', '0 10%')
    .style('font-size', '24px')
  
  penaltyArea.append('div')
    .text(({penalty}) => `Penalty 4: ${penalty.penalties[3].score}`)
    .style('padding', '0 10%')
    .style('font-size', '24px')
  
  penaltyArea.append('div')
    .text(({penalty}) => `Total Score: ${penalty.score}`)
    .style('padding', '0 10%')
    .style('font-size', '24px')
    .style('font-weight', 'bold')
  
  penaltyArea
    .select('div:last-child')
    .filter(({penalty}, i) => i == chosenMask)
    .style('background-color', '#ffff00a0')
  
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

## Final QR Code

Finally, we put a quiet zone around the QR code. The quiet zone is a border around the QR code that is at least 4 modules wide. And below is our final QR code.
`
)});
  main.variable(observer()).define(["QRCodeDataRenderer","version","finalMessage","recoveryLevel","chosenMask","d3"], function(QRCodeDataRenderer,version,finalMessage,recoveryLevel,chosenMask,d3)
{
  const renderer =  new QRCodeDataRenderer(version, finalMessage, recoveryLevel)
  const svg = renderer.include('all').setMask(chosenMask).render()
  d3.select(svg).selectAll('.gridlines').remove()
  return svg
}
);
  main.variable(observer("chosenMask")).define("chosenMask", ["penalties","minPenalty"], function(penalties,minPenalty){return(
penalties.findIndex(({score}) => minPenalty == score)
)});
  main.variable(observer("minPenalty")).define("minPenalty", ["penalties"], function(penalties){return(
Math.min(...penalties.map(x => x.score))
)});
  main.variable(observer("penalties")).define("penalties", ["makeArray","penaltyHandler","finalMessage","version","recoveryLevel"], function(makeArray,penaltyHandler,finalMessage,version,recoveryLevel){return(
makeArray(8, (_, i) => penaltyHandler(finalMessage, version, recoveryLevel, i).penalty())
)});
  main.variable(observer("penaltyHandler")).define("penaltyHandler", ["dataHandler","sum"], function(dataHandler,sum){return(
function penaltyHandler(data, version, ecc, mask) {
  const compactData = dataHandler(data, version, ecc, mask).toFullQRString()
  const size = 4*(version-1)+21
  
  return {
    _size: size,
    _compactData: compactData,
    _compactDataT: Array.from({length: size}, (_, i) => Array.from({length: size}, (_, j) => {
      return compactData[j][i]
    }).join('')),
    _penaltyOne: function() {
      const literal = /0{5,}|1{5,}/g
      const rowPenalties = this._compactData.map((row, i) => {
        return [...row.matchAll(literal)].map(match => {
          return {
            row: i,
            start: match.index,
            length: match[0].length,
            score: (match[0].length-5)+3
          }
        })
      })
      const columnPenalties = this._compactDataT.map((col, i) => {
        return [...col.matchAll(literal)].map(match => {
          return {
            col: i,
            start: match.index,
            length: match[0].length,
            score: (match[0].length-5)+3
          }
        })
      })
      
      const penalties = [...rowPenalties.flat(), ...columnPenalties.flat()]
      
      return {
        score: sum(penalties.map(x => x.score)),
        penalties,
      }
    },
    _penaltyTwo: function() {
      const penalties = []
      for (let i = 0; i < this._size-1; i++) {
        for (let j = 0; j < this._size-1; j++) {
          const a = this._compactData[i][j]
          const b = this._compactData[i][j+1]
          const c = this._compactData[i+1][j]
          const d = this._compactData[i+1][j+1]
          
          if ((a == b) && (c == d) && (a == c)) {
            penalties.push({row: i, col: j})
          }
        }
      }
      return {
        score: penalties.length * 3,
        penalties
      }
    },
    _penaltyThree: function() {
      const literal1 = /10111010000/g
      const literal2 = /00001011101/g
      
      const rowPenalties = this._compactData.map((row, i) => {
        const matches = [...row.matchAll(literal1), ...row.matchAll(literal2)]
        
        return matches.map(match => {
          return {
            row: i,
            start: match.index,
            score: 40,
          }
        })
      })
      
      const columnPenalties = this._compactDataT.map((col, i) => {
        const matches = [...col.matchAll(literal1), ...col.matchAll(literal2)]
        
        return matches.map(match => {
          return {
            col: i,
            start: match.index,
            score: 40,
          }
        })
      })
      
      const penalties = rowPenalties.flat().concat(columnPenalties.flat())
      
      return {
        score: 40*penalties.length,
        penalties
      }
    },
    _penaltyFour: function() {
      const totalModules = this._size * this._size
      const darkModules = this._compactData.join('').replaceAll('0', '').length
      // const darkModules = this._compactData.reduce((x, y) => {
      //   const sum = 0
      //   for (var letter of x) {
      //     if (letter == '1') {
      //       sum += 1
      //     }
      //   }
      //   return sum
      // }, 0)
      
      const darkPercent = darkModules / totalModules * 100
      const left = Math.abs(Math.floor(darkPercent/5)*5 - 50) / 5
      const right = Math.abs(Math.ceil(darkPercent/5)*5 - 50) / 5
      
      return {
        score: Math.min(left, right) * 10,
        darkModules,
        totalModules,
      }
    },
    
    penalty: function() {
      const penalty1 = this._penaltyOne()
      const penalty2 = this._penaltyTwo()
      const penalty3 = this._penaltyThree()
      const penalty4 = this._penaltyFour()
      
      return {
        score: penalty1.score + penalty2.score + penalty3.score + penalty4.score,
        penalties: [penalty1, penalty2, penalty3, penalty4]
      }
    }
  }
}
)});
  main.variable(observer("dataHandler")).define("dataHandler", ["getAlignmentPatternCenterCoordinates","makeArray","getAlignmentPatternCenters","getVersionString","getFormatString","binaryEncode"], function(getAlignmentPatternCenterCoordinates,makeArray,getAlignmentPatternCenters,getVersionString,getFormatString,binaryEncode){return(
function dataHandler(data, version, ecc, mask = null) {
  return {
    _data: data,
    _version: version,
    _ecc: ecc,
    _size: 4*(version-1)+21,
    _indices: null,
    _isInRectangle: ([x, y], x0, y0, width, height) => {
      return (x >= x0) && (x < x0+width) && (y >= y0) && (y < y0+height)
    },
    _isInSquare: function(coordinate, x0, y0, size) { 
      return this._isInRectangle(coordinate, x0, y0, size, size)
    },
    _isFinder: function(coordinate) {
      const topLeftFinder = this._isInSquare(coordinate, 0, 0, 7)
      const topRightFinder = this._isInSquare(coordinate, this._size-7, 0, 7)
      const bottomLeftFinder = this._isInSquare(coordinate, 0, this._size-7, 7)
      
      return topLeftFinder || topRightFinder || bottomLeftFinder
    },
    _isSeparator: function(coordinate) {
      const topLeft = this._isInSquare(coordinate, 0, 0, 8)
      const topRight = this._isInSquare(coordinate, this._size-8, 0, 8)
      const bottomLeft = this._isInSquare(coordinate, 0, this._size-8, 8)
      
      return !this._isFinder(coordinate) && (topLeft || topRight || bottomLeft)
    },
    _isVerticalTiming: function(coordinate) { return this._isInRectangle(coordinate, 6, 8, 1, this._size-16) },
    _isHorizontalTiming: function(coordinate) { 
      return this._isInRectangle(coordinate, 8, 6, this._size-16, 1)
    },
    _isTiming: function(coordinate) {
      return this._isVerticalTiming(coordinate) || this._isHorizontalTiming(coordinate)
    },
    _isVersion: function(coordinate) {
      if (this._version < 7) return false;
      
      const leftVersion = this._isInRectangle(coordinate, 0, this._size-11, 6, 3)
      const rightVersion = this._isInRectangle(coordinate, this._size-11, 0, 3, 6)
      
      return leftVersion || rightVersion
    },
    _isFormat: function(coordinate) {
      if (this._isTiming(coordinate)) return false;
      
      const topLeftFormat = this._isInRectangle(coordinate, 8, 0, 1, 9) 
        || this._isInRectangle(coordinate, 0, 8, 9, 1)
      const topRightFormat = this._isInRectangle(coordinate, this._size-8, 8, 8, 1)
      const bottomLeftFormat = this._isInRectangle(coordinate, 8, this._size-7, 1, 7)
      
      return topLeftFormat || topRightFormat || bottomLeftFormat
    },
    
    _isAlignment: function(coordinate) {
      if (this._version < 2) return false;
      
      return getAlignmentPatternCenterCoordinates(this._version)
        .some(([a, b]) => this._isInSquare(coordinate, a-2, b-2, 5))
    },
    
    _isDarkModule: function([x, y]) { return (x == 8) && (y == this._size-8) },
    _isFunction: function(coordinate) {
      return this._isFinder(coordinate) || this._isSeparator(coordinate)
        || this._isAlignment(coordinate) || this._isDarkModule(coordinate) || this._isVersion(coordinate)
        || this._isFormat(coordinate) || this._isTiming(coordinate)
    },
    
    toIndices: function() {
      if (this._indices != null) {
        return this._indices
      }
      
      const indices = makeArray(this._size*this._size - this._size, (_, i) => {
        const column = Math.floor(i/(2*this._size))
        const afterVerticalTiming = (Math.floor(this._size/2) - column <= 3) ? 1 : 0
        const direction = column % 2
        const x = this._size-1-(2*column) - (i%2) - afterVerticalTiming
        const columnNumber = i % (2*this._size)
        const y = direction == 0 ? (this._size-1-Math.floor(columnNumber/2)) : Math.floor(columnNumber/2)
        return [x, y]
        
      }).filter(x => this.getCoordinateType(x) == 'data')
      
      this._indices = indices
      return indices
    },
    
    _maskFunction: function() {
      switch (this.mask) {
        case 0:
          return (row, col) => (row + col) % 2 == 0;
        case 1:
          return (row, _col) => row % 2 == 0;
        case 2:
          return (_row, col) => col % 3 == 0;
        case 3:
          return (row, col) => (row + col) % 3 == 0;
        case 4:
          return (row, col) => (Math.floor(row/2) + Math.floor(col/3)) % 2 == 0;
        case 5:
          return (row, col) => ((row*col) % 2) + ((row*col) % 3) == 0;
        case 6:
          return (row, col) => (((row*col) % 2) + ((row*col) % 3)) % 2 == 0;
        case 7:
          return (row, col) => (((row+col) % 2) + ((row*col) % 3)) % 2 == 0;
      }
    },
    mask: mask,
    maskData: function() {
      const indices = this.toIndices()
      if (this.mask == null || this.mask >= 8) {
        return this._data
      }
      const maskFunction = this._maskFunction()
      return indices.map(([x, y], i) => {
        return (this._data[i] === '1') != maskFunction(y, x) ? '1' : '0'
      }).join('')
    },
    
    _finderQRBit: function(compactData) {
      const pattern1 = 0b1111111n
      const pattern2 = 0b1000001n
      const pattern3 = 0b1011101n
      
      for (let i = 0; i < 7; i++) {
        const pattern = (i == 0 || i == 6) ? pattern1 : (i == 1 || i == 5) ? pattern2 : pattern3
        compactData[i] |= (pattern << BigInt(this._size-1-6)) | pattern
      }
      
      for (let i = 7; i > 0; i--) {
        const pattern = (i == 7|| i == 1) ? pattern1 : (i == 6 || i == 2) ? pattern2 : pattern3
        compactData[this._size-i] |= (pattern << BigInt(this._size-1-6))
      }
    },
    _separatorQRBit: function(compactData) {},
    _alignmentQRBit: function(compactData) {
      if (this._version < 2) return;
      
      const pattern1 = 0b11111n
      const pattern2 = 0b10001n
      const pattern3 = 0b10101n
      
      const centers = getAlignmentPatternCenters(this._version)
      
      for (const [i, centerColumn] of centers.entries()) {
        const rows = i == 0 ? centers.slice(1, centers.length-1) 
          : i == centers.length-1 ? centers.slice(1)
          : centers.slice(0)
        
        for (let i = 0; i < 5; i++) {
          const pattern = (i == 0 || i == 4) ? pattern1 : (i == 1 || i == 3) ? pattern2 : pattern3
          for (const row of rows) {
            compactData[centerColumn-2+i] |= (pattern << BigInt(this._size-1-(row+2)))
          }
        }
      }
    },
    _darkModuleQRBit: function(compactData) { 
      compactData[this._size-8] |= 1n << BigInt(this._size-9)
    },
    _versionQRBit: function(compactData) {
      if (this._version < 7) return;
      
      const infostring = getVersionString(this._version)
      const versionData = Array.from(infostring).reverse().join('')
      const compactVersion = parseInt(versionData, 2)
      
      
      for (let i = 0; i < 6; i++) {
        const data = (compactVersion >> (15-3*i)) & 0b111
        compactData[i] |= BigInt(data << 8)
      }
      
      for (let i = 0; i < 3; i++) {
        const data = (compactVersion >> (12-6*i)) & 0b111111
        compactData[this._size-11+i] |= BigInt(data) << BigInt(this._size-1-6)
      }
      
    },
    _formatQRBit: function(compactData) {
      const formatData = getFormatString(this._ecc, this.mask)
  
      const compactFormat = parseInt(formatData, 2)
      
      for (let i = 0; i < 15; i++) {
        const row = i < 7 ? this._size-1-i : ((i >= 7) && (i <= 8)) ? 15-i : 14-i
        compactData[row] |= BigInt((compactFormat >> 14-i) & 0x1) << BigInt(this._size-1-8)
      }
      
      const rowFormat = BigInt((compactFormat >> 14-5) & 0b111111) << BigInt(this._size-1-5)
        | BigInt((compactFormat >> 14-6) & 0x1) << BigInt(this._size-1-7)
        | BigInt(compactFormat & 0b11111111)
      
      compactData[8] |= rowFormat
    },
    _timingQRBit: function(compactData) {
      for (let i = 8; i < this._size-8; i+=2) {
        compactData[6] |= 1n << BigInt(this._size-1-i)
        compactData[i] |= 1n << BigInt(this._size-1-6)
      }
    },
    _dataQRBit: function(compactData) {
      const indices = this.toIndices()
      const maskData = this.maskData()
      for (const [i, [x, y]] of indices.entries()) {
        compactData[y] |= BigInt(parseInt(maskData[i])) << BigInt(this._size-1-x)
      }
    },
    toFullQRString: function() {
      const compactData = Array.from({length: this._size}, () => 0n)
      
      this._finderQRBit(compactData)
      this._darkModuleQRBit(compactData)
      this._timingQRBit(compactData)
      this._alignmentQRBit(compactData)
      this._formatQRBit(compactData)
      this._dataQRBit(compactData)
      
      return compactData.map(x => binaryEncode(x, this._size))
    },
    getCoordinateType: function(coordinate) {
      if (this._isFinder(coordinate)) {
        return 'finder'
      } else if (this._isSeparator(coordinate)) {
        return 'separator'
      } else if (this._isVerticalTiming(coordinate)) {
        return 'vertical timing'
      } else if (this._isHorizontalTiming(coordinate)) {
        return 'horizontal timing'
      } else if (this._isVersion(coordinate)) {
        return 'version'
      } else if (this._isFormat(coordinate)) {
        return 'format'
      } else if (this._isAlignment(coordinate)) {
        return 'alignment'
      } else if (this._isDarkModule(coordinate)) {
        return 'dark module'
      } else {
        return 'data'
      }
    }
  }
}
)});
  main.variable(observer("QRCodeDataRenderer")).define("QRCodeDataRenderer", ["QRCodeRenderer","dataHandler","getFormatString","d3"], function(QRCodeRenderer,dataHandler,getFormatString,d3){return(
class QRCodeDataRenderer extends QRCodeRenderer {
  constructor(version, message, level) {
    super(version)
    this._message = message
    this._level = level
    this._dataHandler = dataHandler(message, version, level)
    this._mask = null
    this._indices = null
  }
  
  include(keywords) {
    super.include(keywords)
    if (keywords === 'all') {
      ['data', 'datamask'].forEach(keyword => this._partsToRender.add(keyword))
    }
    return this
  }
  
  exclude(keywords) {
    super.exclude(keywords)
    if (keywords === 'all') {
      ['data', 'datamask'].forEach(keyword => this._partsToRender.add(keyword))
    }
    return this
  }
  
  setMask(pattern) {
    this._mask = pattern
    this._dataHandler.mask = pattern
    return this
  }
  
  _renderData(container) {
    if (this._indices == null) {
      this._indices = this._dataHandler.toIndices()
    }
    
    container.append('g')
      .classed('data', true)
      .selectAll('rect')
      .data(this._indices)
      .join('rect')
        .attr('x', ([x, _]) => this._moduleSize * x)
        .attr('y', ([_, y]) => this._moduleSize * y)
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .style('fill', (_, i) => this._message[i] === '1' ? 'black' : 'white')
  }
  
  _renderMask(container) {
    if (this._mask == null) return;
    container.selectAll('g.data rect')
      .data(this._dataHandler.maskData())
      .join('rect')
        .style('fill', (d, i) => {
          return d === '1' ? 'black' : 'white'
        })
  }
  
  _renderFormat(container) {
    if (this._mask == null) return;
    
    let formatGroup = container.select('g.format')
    
    if (formatGroup.empty()) {
      formatGroup = container.append('g')
        .classed('format', true)
    }
    
    const data = Array.from(getFormatString(this._level, this._mask))
    const highlights = formatGroup.selectAll('rect')
      .classed('highlights', true)
    
    formatGroup.selectAll('rect.first')
      .data(data)
      .join('rect')
        .classed('first', true)
        .attr('x', (_, i) => this._moduleSize * (i < 6 ? i : i == 6 ? 7 : 8))
        .attr('y', (_, i) => this._moduleSize * (i < 8 ? 8 : i == 8 ? 7 : 14-i))
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .style('fill', d => d === '1' ? 'black' : 'white')
    
    formatGroup.selectAll('rect.second')
      .data(data)
      .join('rect')
        .classed('second', true)
        .attr('x', (_, i) => this._moduleSize * (i < 7 ? 8 : this._side-1-(14-i)))
        .attr('y', (_, i) => this._moduleSize * (i < 7 ? this._side-1-i : 8))
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .style('fill', d => d === '1' ? 'black' : 'white')
    
    highlights.raise()
  }
  
  render() {
    const svg = super.render()
    const container = d3.select(svg)
    
    if (this._partsToRender.has('datamask')) {
      this._renderData(container)
      this._renderMask(container)
    } else if (this._partsToRender.has('data')) {
      this._renderData(container);
    }
    
    if (this._partsToRender.has('format')) {
      super._renderFormat(container);
      this._renderFormat(container);
    }
    
    container.select('g.gridlines').raise()
    return container.node()
    
  }
}
)});
  main.variable(observer("QRCodeRenderer")).define("QRCodeRenderer", ["getAlignmentPatternCenterCoordinates","getVersionString","d3"], function(getAlignmentPatternCenterCoordinates,getVersionString,d3){return(
class QRCodeRenderer {
  constructor(version) {
    this._version = version
    this._side = 4*(version-1) + 21
    this._partsToRender = new Set()
    this._partsToHighlight = new Map()
    this._moduleSize = 5
  }
  
  getModuleSize() {
    return this._moduleSize
  }
  
  include(keywords) {
    if (keywords === 'all') {
      keywords = ['finders', 'separators', 'dark', 'timings', 'format', 'version', 'alignments']
    } else if (typeof(keywords) == 'string') {
      keywords = [keywords]
    }
    
    keywords.forEach(keyword => this._partsToRender.add(keyword))
    return this
  }
  
  exclude(keywords) {
    if (keywords === 'all') {
      keywords = ['finders', 'separators', 'dark', 'timings', 'format', 'version', 'alignments']
    } else if (typeof(keywords) == 'string') {
      keywords = [keywords]
    }
    
    keywords.forEach(keyword => this._partsToRender.delete(keyword))
    return this
  }
  
  highlight(keyword, color) {
    this._partsToHighlight.set(keyword, color)
    return this
  }
  
  _renderBase(container){
    const baseContainter = container.append("g")
    this._makeSquare(baseContainter, 0, 0, this._side, 'gray')
  }
  
  _renderGridlines(container) {
    const gridlineGroup = container.append('g')
      .classed('gridlines', true)
    
    this._makeSquare(gridlineGroup, 0, 0, this._side, 'url(#baseModule)')
  }
  
  _makeSquare(root, x, y, side, color, fillOpacity = 1) {
    return this._makeRectangle(root, x, y, side, side, color, fillOpacity)
  }
  
  _makeRectangle(root, x, y, width, height, color, fillOpacity = 1) {
    return root.append('rect')
      .attr('x', this._moduleSize*x)
      .attr('y', this._moduleSize*y)
      .attr('width', this._moduleSize * width)
      .attr('height', this._moduleSize * height)
      .style('fill', color)
      .style('fill-opacity', fillOpacity)
  }
  
  _makePattern(root, x, y, size) {
    this._makeSquare(root, x, y, size, 'black')
    this._makeSquare(root, x+1, y+1, size-2, 'white')
    this._makeSquare(root, x+2, y+2, size-4, 'black')
  }
  
  _renderFinders(container) {
    const finderGroup = container.append('g')
      .classed('finder', true)
    
    this._makePattern(finderGroup, 0, 0, 7)
    this._makePattern(finderGroup, 0, this._side-7, 7)
    this._makePattern(finderGroup, this._side-7, 0, 7)
    
    if (this._partsToHighlight.has('finders')) {
      const color = this._partsToHighlight.get('finders')
      this._makeSquare(finderGroup, 0, 0, 7, color, 0.6)
      this._makeSquare(finderGroup, 0, this._side-7, 7, color, 0.6)
      this._makeSquare(finderGroup, this._side-7, 0, 7, color, 0.6)
    }
  }
  
  _renderSeparators(container) {
    const separatorGroup = container.append('g')
      .classed('separator', true)
    
    this._makeRectangle(separatorGroup, 0, 7, 8, 1, 'white')
    this._makeRectangle(separatorGroup, 7, 0, 1, 7, 'white')
    
    this._makeRectangle(separatorGroup, 0, this._side - 8, 8, 1, 'white')
    this._makeRectangle(separatorGroup, 7, this._side - 7, 1, 7, 'white')
    
    this._makeRectangle(separatorGroup, this._side-8, 7, 8, 1, 'white')
    this._makeRectangle(separatorGroup, this._side-8, 0, 1, 7, 'white')
    
    if (this._partsToHighlight.has('separators')) {
      const color = this._partsToHighlight.get('separators')
      this._makeRectangle(separatorGroup, 0, 7, 8, 1, color, 0.6)
      this._makeRectangle(separatorGroup, 7, 0, 1, 7, color, 0.6)
      
      this._makeRectangle(separatorGroup, 0, this._side-8, 8, 1, color, 0.6)
      this._makeRectangle(separatorGroup, 7, this._side-7, 1, 7, color, 0.6)
      
      this._makeRectangle(separatorGroup, this._side-8, 7, 8, 1, color, 0.6)
      this._makeRectangle(separatorGroup, this._side-8, 0, 1, 7, color, 0.6)
    }
    
  }
  
  _renderDarkModule(container) {
    const darkModuleGroup = container.append('g')
      .classed('dark-module', true)
    
    this._makeSquare(darkModuleGroup, 8, this._side-8, 1, 'black')
    if (this._partsToHighlight.has('dark')) {
      const color = this._partsToHighlight.get('dark')
      this._makeSquare(darkModuleGroup, 8, this._side-8, 1, color, 0.6)
    }
  }
  
  _renderTimingPatterns(container) {
    const size = this._side - 16
    
    const timingPatternGroup = container.append('g')
      .classed('timing', true)
    
    for (let i = 0; i < Math.ceil(size/2); i++) {
      this._makeRectangle(timingPatternGroup, 6, 8+i, 1, size-2*i, i % 2 == 0 ? 'black' : 'white')
      this._makeRectangle(timingPatternGroup, 8+i, 6, size-2*i, 1, i % 2 == 0 ? 'black' : 'white')
    }
    
    if (this._partsToHighlight.has('timings')) {
      const color = this._partsToHighlight.get('timings')
      this._makeRectangle(timingPatternGroup, 6, 8, 1, size, color, 0.6)
      this._makeRectangle(timingPatternGroup, 8, 6, size, 1, color, 0.6)
    }
  }
  
  _renderAlignments(container) {
    const alignmentsGroup = container.append('g')
      .classed('alignment', true)
    
    if (this._version < 2) return;
    
    const coordinates = getAlignmentPatternCenterCoordinates(this._version)
    
    for (const [x,y] of coordinates) {
      this._makePattern(alignmentsGroup, x-2, y-2, 5)
      if (this._partsToHighlight.has('alignments')) {
        const color = this._partsToHighlight.get('alignments')
        this._makeSquare(alignmentsGroup, x-2, y-2, 5, color, 0.6)
      }
    }
    
  }
  
  _renderFormat(container) {
    if (this._partsToHighlight.has('format')) {
      const color = this._partsToHighlight.get('format')
      
      const formatGroup = container.append('g')
        .classed('format', true)
      
      this._makeRectangle(formatGroup, this._side-8, 8, 8, 1, color, 0.6)
      this._makeRectangle(formatGroup, 8, this._side-7, 1, 7, color, 0.6)
      this._makeRectangle(formatGroup, 0, 8, 6, 1, color, 0.6)
      this._makeRectangle(formatGroup, 8, 0, 1, 6, color, 0.6)
      
      this._makeSquare(formatGroup, 7, 8, 1, color, 0.6)
      this._makeSquare(formatGroup, 8, 8, 1, color, 0.6)
      this._makeSquare(formatGroup, 8, 7, 1, color, 0.6)
    }
  }
  
  _renderVersion(container) {
    if (this._version < 7) return;
    
    const versionGroup = container.append('g')
        .classed('version', true)

    const infostring = getVersionString(this._version)
    const data = Array.from(infostring).reverse()
    
    versionGroup.selectAll('rect.first')
      .data(data)
      .join('rect')
        .classed('first', true)
        .attr('x', (_, i) => this._moduleSize * Math.floor(i/3))
        .attr('y', (_, i) => this._moduleSize * (this._side-11 + (i % 3)))
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .style('fill', d => d === '1' ? 'black' : 'white')
    
    versionGroup.selectAll('rect.second')
      .data(data)
      .join('rect')
        .classed('second', true)
        .attr('x', (_, i) => this._moduleSize * (this._side-11 + (i % 3)))
        .attr('y', (_, i) => this._moduleSize * Math.floor(i/3))
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .style('fill', d => d === '1' ? 'black' : 'white')
    
    if (this._partsToHighlight.has('version')) {
      const color = this._partsToHighlight.get('version')
      
      this._makeRectangle(versionGroup, this._side-11, 0, 3, 6, color, 0.6)
      this._makeRectangle(versionGroup, 0, this._side-11, 6, 3, color, 0.6) 
    }
  }
  
  render() {
    const length = this._moduleSize * (this._side + 8)
    
    const container = d3.create('svg')
      .attr('width', length*4)
      .attr('height', length*2)
      .attr('viewBox', [this._moduleSize*-4,this._moduleSize*-4,length*2, length])
    
    container.append('defs')
      .append('pattern')
        .attr('id', 'baseModule')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', this._moduleSize)
        .attr('height', this._moduleSize)
        .attr('patternUnits', 'userSpaceOnUse')
        .append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', this._moduleSize)
          .attr('height', this._moduleSize)
          .style('fill', 'none')
          .style('stroke-width', 0.1)
          .style('stroke', 'black')
    
    this._renderBase(container)
    
    if (this._partsToRender.has('finders')) this._renderFinders(container);
    if (this._partsToRender.has('separators')) this._renderSeparators(container);
    if (this._partsToRender.has('dark')) this._renderDarkModule(container);
    if (this._partsToRender.has('timings')) this._renderTimingPatterns(container);
    if (this._partsToRender.has('alignments')) this._renderAlignments(container);
    if (this._partsToRender.has('format')) this._renderFormat(container);
    if (this._partsToRender.has('version')) this._renderVersion(container);
    
    this._renderGridlines(container)
    
    return container.node()
  }
}
)});
  main.variable(observer("finalMessage")).define("finalMessage", ["interleavedMessages","getFinalRemainderBits","version"], function(interleavedMessages,getFinalRemainderBits,version){return(
interleavedMessages +'0'.repeat(getFinalRemainderBits(version))
)});
  main.variable(observer("interleavedMessages")).define("interleavedMessages", ["messagePolynomials","errorCodewords","binaryEncode"], function(messagePolynomials,errorCodewords,binaryEncode)
{
  const blocks = messagePolynomials.map(groups => groups.flat()).flat()
  const errors = errorCodewords.map(groups => groups.flat()).flat()
  
  const messages = []
  
  const maxBlocksLength = Math.max(...blocks.map(x => x.length))
  const maxErrorsLength = Math.max(...errors.map(x => x.length))
  
  for (let i = 0; i < maxBlocksLength; i++) {
    for (const block of blocks) {
      if (i < block.length) {
        messages.push(block[i])
      }
    }
  }
  
  for (let i = 0; i < maxErrorsLength; i++) {
    for (const error of errors) {
      if (i < error.length) {
        messages.push(error[i])
      }
    }
  }
  
  return messages.map(x => binaryEncode(x, 8)).join("")
  
}
);
  main.variable(observer("errorCodewords")).define("errorCodewords", ["messagePolynomials","generateErrorCodewords"], function(messagePolynomials,generateErrorCodewords){return(
messagePolynomials.map(group => group.map(block => block.map(mps => generateErrorCodewords(mps))))
)});
  main.variable(observer("generateErrorCodewords")).define("generateErrorCodewords", ["galoisTable","makeArray","errorCorrectionsEntry","generatorPolynomial"], function(galoisTable,makeArray,errorCorrectionsEntry,generatorPolynomial){return(
function generateErrorCodewords(messagePolynomial) {
  
  const mp = [
    ...messagePolynomial.map(x => galoisTable.integertoa(x)), 
    ...makeArray(errorCorrectionsEntry.ecCodewordsPerBlock, () => null)
  ]
  
  
  for (let i = 0; i < messagePolynomial.length; i++) {
    const lead = mp[i]
    for (const [j, x] of generatorPolynomial.entries()) {
      let y = galoisTable.atointeger((x+lead) % 255)
      if (mp[i+j] != null) {
        y ^= galoisTable.atointeger(mp[i+j])
      }
      mp[i+j] = y == 0 ? null : galoisTable.integertoa(y)
    }
  }
  
  return mp.slice(messagePolynomial.length).map(x => x == null ? 0 : galoisTable.atointeger(x))
}
)});
  main.variable(observer("generatorPolynomial")).define("generatorPolynomial", ["generatorPolynomialSteps"], function(generatorPolynomialSteps){return(
generatorPolynomialSteps.result
)});
  main.variable(observer("generatorPolynomialSteps")).define("generatorPolynomialSteps", ["errorCorrectionsEntry","galoisTable"], function(errorCorrectionsEntry,galoisTable)
{
  
  const intermediateSteps = []
  const { ecCodewordsPerBlock: codewords } = errorCorrectionsEntry
  const prod = new Array(codewords+1)
  prod.fill(0, codewords-1, codewords+1)

  for (let i = 1; i < codewords; i++) {
    intermediateSteps.push(prod.slice(codewords-i, codewords+1))
    for (let j = codewords-i-1; j <= codewords; j++) {
      if (j == (codewords-i-1)) {
        prod[j] = prod[j+1]
      } else if (j == codewords) {
        prod[j] = (prod[j]+i) % 255
      } else {
        const x = galoisTable.atointeger(prod[j+1])
        const y = galoisTable.atointeger((prod[j]+i) % 255)
        prod[j] = galoisTable.integertoa(x^y)
      }
    }
  }
  
  return {
    result: prod,
    steps: [...intermediateSteps, prod],
  }
  
}
);
  main.variable(observer("galoisTable")).define("galoisTable", ["GaloisTable"], function(GaloisTable){return(
new GaloisTable()
)});
  main.variable(observer("GaloisTable")).define("GaloisTable", function(){return(
class GaloisTable {
  constructor() {
    this._table = new Array(256)
    this._table[0] = 1
    for (let i = 1; i < 256; i++) {
      let val = this._table[i-1] << 1
      if (val > 255) {
        val ^= 285
      }
      this._table[i] = val
    }
  }
  
  atointeger(a) {
    return this._table[a]
  }
  
  integertoa(integer) {
    return this._table.findIndex(x => x == integer)
  }
  
}
)});
  main.variable(observer("messagePolynomials")).define("messagePolynomials", ["bitGroups"], function(bitGroups){return(
bitGroups.map(group => group.map(block => block.map(codes => codes.map(code => parseInt(code, 2)))))
)});
  main.variable(observer("bitGroups")).define("bitGroups", ["errorCorrectionsEntry","bitString"], function(errorCorrectionsEntry,bitString)
{
  
  const {
    groupOneBlockCount: g1BlockCount,
    groupOneDataCodewordsCountPerBlock: g1dc,
    groupTwoBlockCount: g2BlockCount,
    groupTwoDataCodewordsCountPerBlock: g2dc
  } = errorCorrectionsEntry
  
  if (g2BlockCount == null) {
    return [
      [Array.from({length: g1BlockCount}, (_, i) => {
        return Array.from({length: g1dc}, (_, j) => {
          return bitString.substring(i*g1dc*8+8*j, i*g1dc*8+8*j+8)
        })
      })],
    ];
  } else {
    return [
      [Array.from({length: g1BlockCount}, (_, i) => {
        return Array.from({length: g1dc}, (_, j) => {
          const blockIndex = i*g1dc*8
          return bitString.substring(blockIndex+8*j, blockIndex+8*(j+1))
        })
      })],
      [Array.from({length: g2BlockCount}, (_, i) => {
        return Array.from({length: g2dc}, (_, j) => {
          const blockIndex = (g1BlockCount * g1dc * 8) + (g2dc * i * 8) 
          return bitString.substring(blockIndex+8*j, blockIndex+8*j+8)
        })
      })]
    ];
  }
  
}
);
  main.variable(observer("bitString")).define("bitString", ["dataEncoding","binaryEncode","makeArray"], function(dataEncoding,binaryEncode,makeArray)
{
  
  const { 
    data: {
      indicator,
      characterCount: { length: charCountLength, bits: charCountBits },
      payload: { encoding }
    }, 
    padding: {
      terminatorBitsCount,
      multipleEightBitsCount,
      padBits
    } 
  } = dataEncoding
  
  return binaryEncode(indicator, 4)
    + binaryEncode(charCountLength, charCountBits)
    + encoding.map(x => binaryEncode(x.data, x.bits) ).join('')
    + '0'.repeat(terminatorBitsCount)
    + '0'.repeat(multipleEightBitsCount)
    + makeArray(padBits/8, (_, i) => i % 2 == 0 ? "11101100" : "00010001").join('')
  
}
);
  main.variable(observer("kanjiProcessExplanation")).define("kanjiProcessExplanation", ["md"], function(md){return(
function kanjiProcessExplanation(phrase) {
  return md`
  
  First, convert the characters to bytes. Remember that Shift JIS characters are represented using two bytes. For example:
  
  覚 &rarr; 0x8A6F
  裄 &rarr; 0xE5E0

  Then, we subtract each character by either 0x8140 or 0xC140, depending on the character. If the character is between 0x8140 and 0x9FFC, subtract 0x8140; otherwise, subtract 0xC140.

  Then, split the result into its most and least significant byte. Mutliply the most significant byte by 0xC0 and add the least significant byte to the result.

  Convert that result into a 13 bit binary.
  `
}
)});
  main.variable(observer("byteProcessExplanation")).define("byteProcessExplanation", ["binaryEncode","md"], function(binaryEncode,md){return(
function byteProcessExplanation(phrase) {
  
  const toMarkdownStep = letter => {
    return `- ${letter} &rarr; 0x${letter.charCodeAt(0).toString(16)} &rarr; ${binaryEncode(letter.charCodeAt(0), 8)}`
  }
  
  return md`
  First, split the string into bytes. Then convert each byte into 8 bit string, adding zeros to the left for padding as needed. 

  For example, suppose the data was "Hello". Following the conversion process we get:

  ${toMarkdownStep('H')}
  ${toMarkdownStep('e')}
  ${toMarkdownStep('l')}
  ${toMarkdownStep('l')}
  ${toMarkdownStep('o')}

  `
}
)});
  main.variable(observer("alphanumericProcessExplanation")).define("alphanumericProcessExplanation", ["range","makeArray","makeMultiColumnTable","md","binaryEncode"], function(range,makeArray,makeMultiColumnTable,md,binaryEncode){return(
function alphanumericProcessExplanation(phrase) {
  
  
  const entriesPerColumn = 9
  const columnTitles = ["Char", "Value"]
  const mapper = (data, index) => [index, data]
  const data = [
    ...range(0, 10), 
    ...makeArray(26, (_, i) => String.fromCharCode('A'.charCodeAt(0)+i)), 
    ..." $%*+-./:"
  ]
  
  const options = {
    title: "<strong>Alphanumeric Values Table</strong>"
  }
  
  const table = makeMultiColumnTable(data, entriesPerColumn, columnTitles, mapper, options)
  
  return md`

  First, the string is broken up into pairs of characters. Then for each pair, get the number representation for each character. This can be found in the table of alphanumeric values, shown below:

  ${table}

  Afterwards, take the first value, multiply it by 45, and add the second character. Convert the number into an 11 bit binary string, padding the left with zeros if needed. For example, if we were to look at the first pair of characters in HELLO WORLD.
    
  H &rarr; 17
  
  E &rarr; 14

  (45*17) + 14 = ${45*17 + 14}

  ${45*17+14} &rarr; ${binaryEncode(45*17+14, 11)}

  If there are an odd number of characrters, convert the numeric representation of the last character and convert it to a 6-bit binary string. In our HELLO WORLD example, it would look like this:

  D &rarr; 13 &rarr; ${binaryEncode(13, 6)}
    `
}
)});
  main.variable(observer("numericProcessExplanation")).define("numericProcessExplanation", ["groupString","md","stylizeMarkdownValue","binaryEncode"], function(groupString,md,stylizeMarkdownValue,binaryEncode){return(
function numericProcessExplanation(phrase) {
  const threes = groupString(phrase, 3)
  const numbers = threes.map(parseInt)
  const examples = [291, 76, 4]
  
  
  return md`First, the string is broken up into groups of 3 digits. For your input, the result would be this: ${stylizeMarkdownValue(threes.join(", "))}.

  Then, treat those digits as a single number. If the number is greater than 100, convert it to a 10 bit string. If the number is between 10 and 100, convert it to a 7 bit string. Otherwise, convert it to a 4 bit string. For example: 

  - ${examples[0]} &rarr; ${binaryEncode(examples[0], 10)}
  - ${examples[1]} &rarr; ${binaryEncode(examples[1], 7)}
  - ${examples[2]} &rarr; ${binaryEncode(examples[2], 4)}
  `
}
)});
  main.variable(observer("kanjiStep")).define("kanjiStep", ["getShiftCode","binaryEncode","md"], function(getShiftCode,binaryEncode,md){return(
function(phrase, step) {
  const character = phrase[step]
  const shiftCode = getShiftCode(character)
  const subResult = shiftCode - (shiftCode >= 0x8140 && shiftCode <= 0x9FFC ? 0x8140 : 0xC140)
  const msb = (subResult >> 8) & 0xFF
  const lsb = subResult & 0xFF
  
  const result = msb * 0xC0 + lsb
  const binaryCharacter = binaryEncode(result, 13)
  
  return md`

  Character: ${character}

  ${character} &rarr; ${shiftCode.toString(16)}

  0x${shiftCode.toString(16)} - 0x${(shiftCode >= 0x8140 && shiftCode <= 0x9FFC) ? Number(0x8140).toString(16) : Number(0xC140).toString(16)} = 0x${subResult.toString(16).padStart(4, '0')}

  Most Significant Byte: 0x${msb.toString(16).padStart(2, '0')}

  Least Significant Byte: 0x${lsb.toString(16).padStart(2, '0')}

  0x${msb.toString(16).padStart(2, '0')} * 0xC0 + 0x${lsb.toString(16).padStart(2, '0')} = 0x${result.toString(16).padStart(4, '0')}

  0x${result.toString(16).padStart(4, '0')} &rarr; ${binaryCharacter}

  `
  
}
)});
  main.variable(observer("byteStep")).define("byteStep", ["binaryEncode","md"], function(binaryEncode,md){return(
function byteStep(phrase, step) {
  const character = phrase[step]
  const hexCharacter = "0x" + character.codePointAt(0).toString(16)
  const binaryCharacter = binaryEncode(character.codePointAt(0), 8)
  
  return md`
  Character: ${character}

  ${character} &rarr; ${hexCharacter} &rarr; ${binaryCharacter}
  `
}
)});
  main.variable(observer("alphanumericStep")).define("alphanumericStep", ["getAlphanumericValue","md","binaryEncode","groupString","html"], function(getAlphanumericValue,md,binaryEncode,groupString,html){return(
function alphanumericStep(phrase, step) {
  
  const pair = step > 0 ? phrase.slice(2*(step-1), 2*(step-1)+2) : ""
  
  const toEncoding = pair => {
    const values = Array.from(pair, letter => getAlphanumericValue(letter))
    const convertStep = pair.length == 1 
      ? md`${pair} &rarr; ${values[0]} &rarr; ${binaryEncode(values[0], 6)}`
      : md`
  ${pair[0].replace(' ', 'Space')} &rarr; ${values[0]}

  ${pair[1].replace(' ', 'Space')} &rarr; ${values[1]}

  (45 * ${values[0]}) + ${values[1]} = ${45*values[0]+values[1]}

  ${45*values[0]+values[1]} &rarr; ${binaryEncode(45*values[0]+values[1], 11)}
        `
    return md`
  Pair: (${pair.split('').map(x => x == ' ' ? 'Space' : x).join(', ')})

  ${convertStep}
    `
  }
  
  const initSplit = () => {
    const pairs = groupString(phrase, 2)
    
    return md`
  Split the data into pairs: 

  <br />
  ${pairs.join(',')}
  `
  }
  
  return html`
    <div>
      <div id="main">
        ${step == 0 ? initSplit().innerHTML : toEncoding(pair).innerHTML}
      </div>
    </div>
  `
}
)});
  main.variable(observer("getAlphanumericValue")).define("getAlphanumericValue", function(){return(
function getAlphanumericValue(letter) {
  if (letter.match(/^\d$/)) {
    return parseInt(letter)
  } else if (letter.match(/^[A-Z]$/)) {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 10
  } else {
    let index = 36;
    for (const c of " $%*+-./:") { 
      if (c == letter) {
        return index
      }
      index++;
    }
    return -1;
  }
}
)});
  main.variable(observer("numericStep")).define("numericStep", ["binaryEncode","md","html"], function(binaryEncode,md,html){return(
function numericStep(phrase, step) {
  
  const group = step > 0 ? phrase.slice(3*(step-1), Math.min(3*(step-1)+3, phrase.length)) : ""
  
  const toEncoding = group => {
    const value = parseInt(group)
    const toBits = value => binaryEncode(value, value > 99 ? 10 : value > 9 ? 7 : 4)
    
    const convertStep = group[0] != null
      ? md`${group} &rarr; ${toBits(value)}`
      : md`${group} &rarr; ${value} &rarr; ${toBits(value)}}`
    
    return md`
  Group: ${group}

  ${convertStep}
    `
  }
  
  const initSplit = () => {
    const groups = Array.from({length: Math.ceil(phrase.length / 3)}, (_, i) => {
      return phrase.slice(3*i, Math.min(3*i+3, phrase.length))
    })
    
    return md`
  Split the data into groups of 3:

  <br />
  ${groups.join(', ')}
    `
  }
  
  return html`
    <div>
      <div id="main">
        ${step == 0 ? initSplit().innerHTML : toEncoding(group).innerHTML}
      </div>
    </div>
  `
}
)});
  main.variable(observer("dataEncoding")).define("dataEncoding", ["mode","errorCorrectionsEntry","getCharacterCountBits","version","bitEncodedData","phrase"], function(mode,errorCorrectionsEntry,getCharacterCountBits,version,bitEncodedData,phrase)
{
  const m = mode.mode
  const indicator = m == "numeric" ? 0b0001 
    : m == "alphanumeric" ? 0b0010 
    : m == "byte" ? 0b0100 
    : m == "kanji" ? 0b1000
    : undefined
  
  const totalDataBits = errorCorrectionsEntry.dataCodewordsCount * 8
  const characterCountBits = getCharacterCountBits(version, m)
  const unpaddedEncodedDataLength = 4 + characterCountBits + bitEncodedData.bits
  const terminatorBitsCount = Math.min(totalDataBits - unpaddedEncodedDataLength, 4)
  const multipleEightBitsCount = Math.ceil((unpaddedEncodedDataLength+terminatorBitsCount)/8)*8 - (unpaddedEncodedDataLength+terminatorBitsCount)
  const padBits = totalDataBits - (unpaddedEncodedDataLength+terminatorBitsCount+multipleEightBitsCount)
  
  return {
    data: {
      indicator,
      characterCount: { length: phrase.length, bits: characterCountBits },
      payload: bitEncodedData,
      bits: unpaddedEncodedDataLength,
    },
    
    padding: {
      terminatorBitsCount,
      multipleEightBitsCount,
      padBits,
      bits: totalDataBits - unpaddedEncodedDataLength
    },
    
    totalDataBits
  }
  
}
);
  main.variable(observer("errorCorrectionsEntry")).define("errorCorrectionsEntry", ["getErrorCorrectionsEntry","version","recoveryLevel"], function(getErrorCorrectionsEntry,version,recoveryLevel){return(
getErrorCorrectionsEntry(version, recoveryLevel)
)});
  main.variable(observer("bitEncodedData")).define("bitEncodedData", ["mode","phrase","groupString","getAlphanumericValue","getShiftCode","sum"], function(mode,phrase,groupString,getAlphanumericValue,getShiftCode,sum)
{
  let results;
  
  if (mode.mode == "numeric") {
    
    results = Array.from({length: Math.ceil(phrase.length / 3)}, (_, i) => {
      let number = parseInt(phrase.substring(3*i, 3*i+3))
      return { data: number, bits: number > 99 ? 10 : number > 9 ? 7 : 4 }
    })
    
  } else if (mode.mode == "alphanumeric") {
    results = groupString(phrase, 2).map(x => {
      return {
        data: x.length == 1 ? getAlphanumericValue(x[0]) : 45 * getAlphanumericValue(x[0]) + getAlphanumericValue(x[1]),
        bits: x.length == 1 ? 6 : 11
      }
    })
    
  } else if (mode.mode == "byte") {
    results = Array.from(phrase, x => ({ data: x.codePointAt(0), bits: 8}))
  } else if (mode.mode == "kanji") {
    results = Array.from(phrase, x => {
      const shiftCode = getShiftCode(x)
      const subResult = shiftCode - (shiftCode >= 0x8140 && shiftCode <= 0x9FFC ? 0x8140 : 0xC140)
      const msb = (subResult >> 8) & 0xFF
      const lsb = subResult & 0xFF
      
      return { data: msb * 0xC0 + lsb, bits: 13 }
    })
  }
  
  return {
    encoding: results,
    bits: sum(results.map(x => x.bits))
  }
  
}
);
  main.variable(observer("version")).define("version", ["getMinVersion","recoveryLevel","mode","phrase"], function(getMinVersion,recoveryLevel,mode,phrase){return(
getMinVersion(recoveryLevel, mode.mode, phrase.length)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("getShiftCode", child1);
  main.import("isShiftCharacter", child1);
  main.import("getAlignmentPatternCenters", child1);
  main.import("getAlignmentPatternCenterCoordinates", child1);
  main.import("getFinalRemainderBits", child1);
  main.import("getFormatString", child1);
  main.import("getVersionString", child1);
  main.import("getErrorCorrectionsEntry", child1);
  main.import("getMinVersion", child1);
  main.import("getCharacterCountBits", child1);
  main.import("getAllVersions", child1);
  const child2 = runtime.module(define2);
  main.import("binaryEncode", child2);
  main.import("makeArray", child2);
  main.import("makeMultiColumnTable", child2);
  main.import("sum", child2);
  main.import("range", child2);
  main.import("groupString", child2);
  main.import("instructionRange", child2);
  main.import("stylizeMarkdownValue", child2);
  main.import("generatorControls", child2);
  main.import("showTruncatedData", child2);
  const child3 = runtime.module(define3);
  main.import("form", child3);
  return main;
}
