# RGBDex

A front-end-only data exploration tool for [PureRGB](https://github.com/Vortyne/pureRGB), a Pokemon Gen 1 hack. **This is a serious work in progress (insofar as it's very quick and dirty)** - see the below list of TODOs.

## TODO
 - Linting, deployment, tests, etc.
 - Handle data fetching more intelligently. CORS prevents pulling `zipblob` - investigate `git clone` in browser via library?
 - Tighten up state management and use Preact [Signals](https://preactjs.com/guide/v10/signals)
 - Add Tailwind and style this ugly thing
 - Smart formatting for names (pretty print, incorporate comments for when things have been renamed)
 - Generate proper AST from asm source and ditch janky Regex parsing?  
 - Flesh out data for monsters and types
 - Add ability to populate your roster and indicate ideal type matchups
 - ...then add ability to set movesets
 - Cache downloaded data in LocalStorage
 - Filters, sorts, etc. in route
 - Allow change of branch from Github for source data