# CubeArtisan

## Releases

### v1.0.0

#### v1.0.1

 - PR: #130

##### Features
 
 - Add caching to most of the card queries

##### Bug Fixes
 
 - Fix error in DevBlogPage where `user.roles` could be null causing a server error.
 - Handle the case that there are no known card versions in BlankCardHistory removing a crash on card info pages. 

#### v1.0.2
 
 - PR: #132

##### Features

 - Add the Customize Basics Modal to the CubeListPage.

##### Bug Fixes

 - Fix the format of the favicon so it shows up correctly in browsers.
 - Fix editing tag colors for a cube.
 - Remove a missed piece of CubeCobra branding from the FAQ
 - Officially remove the beta moniker from the site name.

#### v1.0.3

 - PR: #135

##### Bug Fixes

 - Handle cases where a card name isn't found in the card database.

#### v1.0.4

##### Bug Fixes
 
 - Have the Add to Cube Modal handle when the user doesn't have any cubes.
 - Fix caching to more precisely specify how to cache.

#### v1.0.5

 - PR: #143

##### Bug Fixes

 - Fix an occasional crash when exporting a built deck or cube to MTGO.

### v1.1.0

 - PR: #141
 - PR: #147

#### Features
  
 - Allow fine-grained specifications of how many cards to show in a single row.
 - Allow the site to use more horizontal space on high resolution monitors.

#### Bug Fixes

 - Fix occasional bug when an invalid card appears in a url. 

#### Infrastructure

- Update how routes are stored in the code to be easier to debug, find, and change.

## Known Issues

 - On Firefox Drag and Drop in the DraftPage and the DeckbuilderPage causes the browser to navigate to the image url for the card. 