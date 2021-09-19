# CubeArtisan

## Releases

### v1.0.0

#### v1.0.1

- PR: #130

##### Features

- Add caching to most of the card queries

##### Bug Fixes

- Fix error in DevBlogPage where `user.roles` could be null causing a server error.
- Handle the case that there are no known card versions in BlankCardHistory
  removing a crash on card info pages.

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

##### Bug Fixes

- Handle cases where a card name isn't found in the card database.

#### v1.0.4

##### Bug Fixes

- Have the Add to Cube Modal handle when the user doesn't have any cubes.
- Fix caching to more precisely specify how to cache.

#### v1.0.5

##### Bug Fixes

- Fix an occasional crash when exporting a built deck or cube to MTGO.

### v1.1.0

#### Features

- Allow fine-grained specifications of how many cards to show in a single row.
- Allow the site to use more horizontal space on high resolution monitors.
- Add a new recommender model.

#### Bug Fixes

- Fix occasional error when an invalid card appears in a url.
- Make Customize Basics show the correct basic lands.
- Fix occasional error where the site would get confused on draft state.
- Allow deleting cubes.
- Make sure names match seats in pick by pick breakdown and draftbot analysis.

#### Infrastructure

- Update how routes are stored in the code to be easier to debug, find, and change.
- Move kubernetes configs to a separate repository.
- Speedup recovery from a crash.
- Update card analytics each night
- Anonymously export drafts, decks, and cubes weekly.

#### v1.1.2

##### Bug Fixes

- Allow editing individual cards in cubes.
- Allow cloning cubes.

#### v1.1.3

##### Bug Fixes

- Fix crash caused by invalid P1P1 links.
- Make server more resistant to errors.
- Prevent Markdown errors from cascading so it doesn't break the OverviewPage.

#### v1.1.4

##### Bug Fixes

- Add a note about being a fork of CubeCobra to the Our Story page.

#### v1.1.5


##### Features

- Speed up p1p1 image generation.

##### Bug Fixes

- Increase the response timeout time to try and help out p1p1 requests.
- Fix server crash from error saving a draft.

### v1.2.0

#### Features

 - Update the Info Pages for the site.
 - Update the content creator system and remove the review requirement.
 - Better optimize the code sent to the client for faster load times and less data transferred.
 - Have a useful message on the page if javascript is not enabled. Ported from CubeCobra.
 - Add is:reprint and is:firstprint filters. Ported from CubeCobra.
 - Show and and cut counts when editing a cube. Ported from CubeCobra.
 - Allow setting default seat count for a custom draft format. Ported from CubeCobra.

#### Bug Fixes

 - Handle excel formatting maybeboard values as TRUE not true. Ported from CubeCobra.
 - Fix mass editing CMC values and display errors better. Ported from CubeCobra.
 - Correctly escape card urls. Ported from CubeCobra.

## Known Issues

- On Firefox Drag and Drop in the DraftPage and the DeckbuilderPage causes the browser to navigate to the image url for the card. 
