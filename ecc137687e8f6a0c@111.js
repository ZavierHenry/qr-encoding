// https://observablehq.com/@zavierhenry/qr-code-tables@111
import define1 from "./1cbffd19a7aa736e@94.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["capabilities.csv",new URL("./files/f6b74c026be3dc5c3e439737177ec87c82f013eafa240d0324563aa0190402520d7d6a52a43e0d02743f0fca332b8b87805735752c8e47c54d457d55064d19fd",import.meta.url)],["error_corrections.csv",new URL("./files/dcafecc6f422b0dc3b02c2a25679f5ca594427463e0b272ad8686105d2d28bf6331ea5b965f0dd2d1f752cc873e8e3d4887a5236beaf61b7e32d441a5ec9f6d1",import.meta.url)],["shift_mapping.csv",new URL("./files/dc1a4c7144017172f04087d81d4ad098ab5da58bb9e8f0938380dd684622c8e670d3753051ea236da9fcc58c772345b3dc83397c20daca306f25ee81ade03a77",import.meta.url)],["version_table.csv",new URL("./files/1c9d55875b614d02975665cb5c435157ce8a5ce3bdc0bec7f87fd914547c4531ccecb22f5c4ec66f0de9634ad41f8ba6a36955f7b3aae07ebd67fa4366d4ec1c",import.meta.url)],["format_table.csv",new URL("./files/79ef4dc2f0d92513f1666ef825e23799817bdf2b56ac93f06a83a53f89e572f1fbc593f7da213fd5fe8812cc5a38bf80bcc256db8a8e6ea3e8275c02c6df7a7b",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# QR Code Tables`
)});
  main.variable(observer("getFormatString")).define("getFormatString", ["formatTable"], function(formatTable){return(
function getFormatString(ecc, pattern) {
  const entry = formatTable.find(x => x.ecc == ecc && x.pattern == pattern)
  
  return entry == null ? "" : entry.bits
}
)});
  main.variable(observer("formatTable")).define("formatTable", ["FileAttachment"], async function(FileAttachment)
{
  const entries = await FileAttachment("format_table.csv").csv()
  
  for (const entry of entries) {
    entry.pattern = parseInt(entry.pattern)
  }
  
  return entries
}
);
  main.variable(observer("getVersionString")).define("getVersionString", ["versionTable"], function(versionTable){return(
function getVersionString(version) {
  const entry = versionTable.find(v => v.version == version)
  
  return entry == null ? "" : entry.infostring
}
)});
  main.variable(observer("versionTable")).define("versionTable", ["FileAttachment"], async function(FileAttachment)
{
  const entries = await FileAttachment("version_table.csv").csv()
  
  for (const entry of entries) {
    entry.version = parseInt(entry.version)
  }
  
  return entries
}
);
  main.variable(observer("getShiftCode")).define("getShiftCode", ["shiftMapping"], function(shiftMapping){return(
function getShiftCode(unicode) {
  return shiftMapping.get(unicode)
}
)});
  main.variable(observer("isShiftCharacter")).define("isShiftCharacter", ["shiftMapping"], function(shiftMapping){return(
function isShiftCharacter(character) {
  return shiftMapping.has(character.codePointAt(0))
}
)});
  main.variable(observer("shiftMapping")).define("shiftMapping", ["FileAttachment"], async function(FileAttachment)
{
  const mapping = await FileAttachment("shift_mapping.csv").csv({typed: true})
  return new Map(mapping.map(({character, shift}) => [character, shift]))
}
);
  main.variable(observer("getErrorCorrectionsEntry")).define("getErrorCorrectionsEntry", ["errorCorrections"], function(errorCorrections){return(
function getErrorCorrectionsEntry(version, errorLevel) {
  return errorCorrections.find(entry => {
    const {version: v, errorLevel: level } = entry;
    return (v == version) && (level == errorLevel)
  })
}
)});
  main.variable(observer("errorCorrections")).define("errorCorrections", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("error_corrections.csv").csv({typed: true})
)});
  main.variable(observer("getMinVersion")).define("getMinVersion", ["capabilities"], function(capabilities){return(
function getMinVersion(errorLevel, mode, phraseLength) {
  const minVersionEntry = capabilities.find(entry => {
    const {errorLevel: level, mode: m, maxCharacters} = entry;
    return (level == errorLevel) && (m == mode) && (maxCharacters >= phraseLength)
  })
  
  return minVersionEntry == null ? 0 : minVersionEntry.version
}
)});
  main.variable(observer("getAllVersions")).define("getAllVersions", ["capabilities"], function(capabilities){return(
function getAllVersions(errorLevel, mode) {
  return capabilities.filter(({errorLevel: level, mode: m}) => (level == errorLevel) && (m == mode))
}
)});
  main.variable(observer()).define(["getAllVersions"], function(getAllVersions){return(
getAllVersions('H', 'numeric')
)});
  main.variable(observer("capabilities")).define("capabilities", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("capabilities.csv").csv({typed: true})
)});
  main.variable(observer("getCharacterCountBits")).define("getCharacterCountBits", ["characterCountBitsTable"], function(characterCountBitsTable){return(
function getCharacterCountBits(version, mode) {
  const entry = characterCountBitsTable.find(entry => {
    const {minVersion, maxVersion, mode: m} = entry
    return (version >= minVersion) && (version <= maxVersion) && (m == mode)
  })
  
  return entry == null ? 0 : entry.countLength                                         
}
)});
  main.variable(observer("characterCountBitsTable")).define("characterCountBitsTable", function(){return(
[
  {minVersion: 1, maxVersion: 9, mode: "numeric", countLength: 10},
  {minVersion: 1, maxVersion: 9, mode: "alphanumeric", countLength: 9},
  {minVersion: 1, maxVersion: 9, mode: "byte", countLength: 8},
  {minVersion: 1, maxVersion: 9, mode: "kanji", countLength: 8},
  {minVersion: 10, maxVersion: 26, mode: "numeric", countLength: 12},
  {minVersion: 10, maxVersion: 26, mode: "alphanumeric", countLength: 11},
  {minVersion: 10, maxVersion: 26, mode: "byte", countLength: 16},
  {minVersion: 10, maxVersion: 26, mode: "kanji", countLength: 10},
  {minVersion: 27, maxVersion: 40, mode: "numeric", countLength: 14},
  {minVersion: 27, maxVersion: 40, mode: "alphanumeric", countLength: 13},
  {minVersion: 27, maxVersion: 40, mode: "byte", countLength: 16},
  {minVersion: 27, maxVersion: 40, mode: "kanji", countLength: 12},
]
)});
  main.variable(observer("getAlignmentPatternCenterCoordinates")).define("getAlignmentPatternCenterCoordinates", ["alignmentPatternLocations","makeArray"], function(alignmentPatternLocations,makeArray){return(
function getAlignmentPatternCenterCoordinates(version, showOverlappedCoordinates = false) {
  const centers = alignmentPatternLocations[version-2]
  
  const coordinates = makeArray(centers.length * centers.length, (_, i) => [centers[Math.floor(i/centers.length)], centers[i % centers.length]])
  
  if (!showOverlappedCoordinates) {
    return coordinates.filter(([x, y]) => {
      const topLeft = (x == centers[0]) && (y == centers[0])
      const topRight = (x == centers[0]) && (y == centers[centers.length-1])
      const bottomLeft = (x == centers[centers.length-1]) && (y == centers[0])
      return !(topLeft || topRight || bottomLeft)
    })
  } else {
    return coordinates
  }
  
}
)});
  main.variable(observer("getAlignmentPatternCenters")).define("getAlignmentPatternCenters", ["alignmentPatternLocations"], function(alignmentPatternLocations){return(
function getAlignmentPatternCenters(version) {
  return alignmentPatternLocations[version-2]
}
)});
  main.variable(observer("alignmentPatternLocations")).define("alignmentPatternLocations", function(){return(
[
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 32, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
]
)});
  main.variable(observer("getFinalRemainderBits")).define("getFinalRemainderBits", ["finalRemainderBitsTable"], function(finalRemainderBitsTable){return(
function getFinalRemainderBits(version) {
  return finalRemainderBitsTable[version-1]
}
)});
  main.variable(observer("finalRemainderBitsTable")).define("finalRemainderBitsTable", function(){return(
[ 0,7,7,7,7,7,0,0,0,0,0,0,0,3,3,3,3,3,3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,0,0,0,0,0,0
]
)});
  const child1 = runtime.module(define1);
  main.import("makeArray", child1);
  return main;
}
