# RGBDex

[Try it out!](https://rgbdex.alexplant.org).

A research and data exploration tool for players of [PureRGB](https://github.com/Vortyne/pureRGB), a Pokemon Gen 1 hack. This tool compiles monster, move, type, and other data from source and makes it searchable in an effort to help you on your play-throughs. **This is a serious work in progress (insofar as it's very quick and dirty)** - see the below list of TODOs.

## TODO
 - Linting, tests, etc.
 - Handle data fetching more intelligently. CORS prevents pulling `zipblob` - investigate `git clone` in browser via library?
 - Add Tailwind and style this ugly thing
 - Smart formatting for names (pretty print, incorporate comments for when things have been renamed)
 - Generate proper AST from asm source and ditch janky Regex parsing?  
 - Flesh out data for monsters and types
 - Add ability to populate your roster and indicate ideal type matchups
 - ...then add ability to set movesets
 - Cache downloaded data in LocalStorage
 - Filters, sorts, etc. in URL routes
 - Investigate using this for original `pret` RBY disassembly
 - Allow change of branch from Github for source data
