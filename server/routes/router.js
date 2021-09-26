import express from 'express';

import AdminRoutes from '@cubeartisan/server/routes/admin.js';
import {
  browseArticles,
  browseContent,
  browsePodcastEpisodes,
  browsePodcasts,
  browseVideos,
  createNewArticle,
  createNewPodcast,
  createNewVideo,
  editArticle,
  editPodcast,
  editVideo,
  fetchPodcast,
  getJsonUserArticles,
  getJsonUserPodcasts,
  getJsonUserVideos,
  submitArticle,
  submitPodcast,
  submitVideo,
  viewArticle,
  viewCreatorDashboard,
  viewEditArticle,
  viewEditPodcast,
  viewEditVideo,
  viewPodcastEpisode,
  viewVideo,
} from '@cubeartisan/server/routes/content.js';

import {
  showDowntimePage,
  redirectToLandingOrDash,
  getChildComments,
  exploreCubes,
  showRandomCube,
  viewDashboard,
  viewSearchPage,
  getVersion,
  viewLanding,
  getDashboardDecks,
  submitLostPassword,
  logoutUser,
  loginUser,
  browsePackages,
  showLeavePage,
  searchResultsPage,
  resetPassword,
  showErrorPage,
  viewLostPasswordPage,
  viewLoginPage,
} from '@cubeartisan/server/routes/misc.js';
import {
  exportDeckToXmage,
  exportDeckToForge,
  exportDeckToPlaintext,
  exportDeckToMtgo,
  exportDeckToArena,
  exportDeckToCockatrice,
  viewDeckbuilder,
  rebuildDeck,
  redraftDeck,
  viewDeck,
  deleteDeck,
  updateDeck,
} from '@cubeartisan/server/routes/deck.js';
import {
  viewContactPage,
  viewTos,
  viewFiltersPage,
  viewMarkdownPage,
  viewPrivacyPolicy,
  viewCookiePolicy,
  viewStoryPage,
  viewFaq,
} from '@cubeartisan/server/routes/info.js';
import { getDraftPage, redraftDraft, saveDraft, submitDraft } from '@cubeartisan/server/routes/draft.js';
import { getGridDraftPage, saveGridDraft, submitGridDraft } from '@cubeartisan/server/routes/griddraft.js';
import {
  getCardPageForId,
  getCardObj,
  getImageForId,
  getImageRedirectForId,
  getFlipImageById,
  getAllVersionsForId,
  getVersionsFromIds,
  viewCardSearchPage,
  doCardSearch,
  redirectToRandomCard,
  getDetailsForCards,
  listCardNames,
  getCardImageUrls,
  getImageDict,
  getFullNames,
} from '@cubeartisan/server/routes/card.js';
import { redirectToFirstDevBlogPage, browseDevBlog, postToDevBlog } from '@cubeartisan/server/routes/dev.js';
import { postComment, viewComment, editComment, reportComment } from '@cubeartisan/server/routes/comment.js';
import {
  submitPackage,
  deletePackage,
  viewPackage,
  unapprovePackage,
  approvePackage,
  downvotePackage,
  upvotePackage,
  getAllPackages,
  getApprovedPackages,
  getPendingPackages,
} from '@cubeartisan/server/routes/package.js';
import {
  createUser,
  viewRegisterPage,
  viewUserPage,
  updateUserInfo,
  viewAccountPage,
  redirectToFirstPageOfUserBlogPosts,
  viewUserBlog,
  confirmUser,
  getUserCubes,
  redirectToFirstPageOfUserDecks,
  viewUserDecks,
  updateDisplaySettings,
  updateEmail,
  getFeedItems,
  unfollowUser,
  followUser,
  viewNotification,
  clearNotifications,
  viewNotifications,
  getUserPackages,
  changePassword,
  viewResetPassword,
  saveShowTagColors,
  viewSocialPage,
} from '@cubeartisan/server/routes/user.js';
import {
  exportCubeToMtgo,
  exportCubeToCsv,
  exportCubeToCubeCobra,
  exportCubeToForge,
  exportCubeToJson,
  exportCubeToPlaintext,
  exportCubeToPlaintextLower,
  exportCubeToXmage,
} from '@cubeartisan/server/routes/cube/export.js';
import {
  deleteBlogPost,
  getBlogPage,
  getBlogPost,
  postToBlog,
  updateBlogPost,
} from '@cubeartisan/server/routes/cube/blog.js';
import {
  importFromCubeTutor,
  importFromFile,
  importFromPaste,
  replaceFromFile,
} from '@cubeartisan/server/routes/cube/import.js';
import {
  createCube,
  deleteCube,
  viewOverview,
  editCube,
  viewAnalytics,
  updateCubeBasics,
  redirectToFirstPageOfCubeBlog,
  getCardImageById,
  updateCardInCube,
  getCardInCubeByName,
  getDefaultPrinting,
  addCardsToCube,
  updateCardsInCube,
  getCardNamesForCube,
  getCardTagsForCube,
  cloneCube,
  viewCubeComparison,
  getDateCubeUpdated,
  setDefaultFormat,
  unfeatureCube,
  featureCube,
  addFormat,
  deleteFormat,
  viewCubeList,
  getMaybeboard,
  updateMaybeboard,
  updateMaybeboardCard,
  editCubeOverview,
  viewPlaytest,
  uploadDeckList,
  viewCubeDecks,
  startDraft,
  startGridDraft,
  addSeedToP1P1,
  generateP1P1,
  viewSamplePack,
  redirectToSamplePackWithSeed,
  viewSamplePackImage,
  redirectToFirstPageOfCubeDecks,
  getRecommendations,
  resizeCube,
  getRss,
  updateCubeSettings,
  updateCubeSorts,
  getTagColors,
  updateTagColors,
} from '@cubeartisan/server/routes/cube/index.js';
import { followCube, unfollowCube } from '@cubeartisan/server/routes/cube/social.js';
import { importDraftLog } from '@cubeartisan/server/routes/integrations.js';
import { redirect } from '@cubeartisan/server/serverjs/util.js';

const router = express.Router();

// check for downtime
if (process.env.DOWNTIME_ACTIVE === 'true') {
  router.use(showDowntimePage);
}

router.get('/', redirectToLandingOrDash);
router.get('/404', showErrorPage);
router.use('/admin', AdminRoutes);
router.get('/card/:id', getCardPageForId);
router.get('/card/:id/details', getCardObj);
router.get('/card/:id/image', getImageForId);
router.get('/card/:id/image/flip', getFlipImageById);
router.get('/card/:id/image/redirect', getImageRedirectForId);
router.get('/card/:id/versions', getAllVersionsForId);
router.post('/cards/versions', getVersionsFromIds);
router.get('/cards/search', viewCardSearchPage);
router.get('/cards/search/query', doCardSearch);
router.get('/cards/random', redirectToRandomCard);
router.post('/cards/details', getDetailsForCards);
router.get('/cards/names', listCardNames);
router.get('/cards/images', getCardImageUrls);
router.get('/cards/images/dict', getImageDict);
router.get('/cards/names/full', getFullNames);
router.post('/comment', postComment);
router.get('/comment/:id', viewComment);
router.put('/comment/:id', editComment);
router.post('/comment/:id/report', reportComment);
router.get('/comments/:parent/:type', getChildComments);
router.get('/contact', viewContactPage);
router.get('/cookies', viewCookiePolicy);
router.post('/creators/article', createNewArticle);
router.get('/creators/article/:id', viewArticle);
router.post('/creators/article/:id', editArticle);
router.get('/creators/article/:id/edit', viewEditArticle);
router.post('/creators/article/:id/submit', submitArticle);
router.get('/creators/articles', redirect('/articles/0'));
router.get('/creators/articles/:page', browseArticles);
router.get('/creators/browse', browseContent);
router.get('/creators/dashboard', viewCreatorDashboard);
router.post('/creators/podcast', createNewPodcast);
router.get('/creators/podcast/:id', browsePodcastEpisodes);
router.post('/creators/podcast/:id', editPodcast);
router.get('/creators/podcast/:id/edit', viewEditPodcast);
router.get('/creators/podcast/:podcastid/episode/:episodeid', viewPodcastEpisode);
router.put('/creators/podcast/:id/fetch', fetchPodcast);
router.post('/creators/podcast/:id/submit', submitPodcast);
router.get('/creators/podcasts', redirect('/podcasts/0'));
router.get('/creators/podcasts/:page', browsePodcasts);
router.post('/creators/video', createNewVideo);
router.get('/creators/video/:id', viewVideo);
router.post('/creators/video/:id', editVideo);
router.get('/creators/video/:id/edit', viewEditVideo);
router.post('/creators/video/:id/submit', submitVideo);
router.get('/creators/videos', redirect('/videos/0'));
router.get('/creators/videos/:page', browseVideos);
router.post('/cube', createCube);
router.delete('/cube/:id', deleteCube);
router.get('/cube/:id', viewOverview);
router.post('/cube/:id', editCube);
router.get('/cube/:id/analytics', viewAnalytics);
router.put('/cube/:id/basics', updateCubeBasics);
router.get('/cube/:id/blog/', redirectToFirstPageOfCubeBlog);
router.get('/cube/:id/blog/page/:page', getBlogPage);
router.post('/cube/:id/blog/post', postToBlog);
router.delete('/cube/:id/blog/post/:postid', deleteBlogPost);
router.get('/cube/:id/blog/post/:postid', getBlogPost);
router.post('/cube/:id/blog/post/:postid', updateBlogPost);
router.get('/cube/:id/card/:cardid/image', getCardImageById);
// TODO: -This uses a different meaning for the id field for put requests vs get. I'm not sure that's good.
router.put('/cube/:id/card/:cardid', updateCardInCube);
router.get('/cube/:id/card/:name', getCardInCubeByName);
router.get('/cube/:id/card/:name/default', getDefaultPrinting);
router.post('/cube/:id/cards', addCardsToCube);
router.put('/cube/:id/cards', updateCardsInCube);
router.get('/cube/:id/cards/names', getCardNamesForCube);
router.get('/cube/:id/cards/tags', getCardTagsForCube);
router.post('/cube/:id/clone', cloneCube);
router.get('/cube/:id/compare/:idB', viewCubeComparison);
router.get('/cube/:id/date_updated', getDateCubeUpdated);
router.put('/cube/:id/defaultformat/:formatId', setDefaultFormat);
router.get('/cube/:id/export/csv', exportCubeToCsv);
router.get('/cube/:id/export/cubecobra', exportCubeToCubeCobra);
router.get('/cube/:id/export/forge', exportCubeToForge);
router.get('/cube/:id/export/json', exportCubeToJson);
router.get('/cube/:id/export/mtgo', exportCubeToMtgo);
router.get('/cube/:id/export/plaintext', exportCubeToPlaintext);
router.get('/cube/:id/export/plaintext/lower', exportCubeToPlaintextLower);
router.get('/cube/:id/export/xmage', exportCubeToXmage);
router.delete('/cube/:id/feature', unfeatureCube);
router.post('/cube/:id/feature', featureCube);
router.delete('/cube/:id/follow', unfollowCube);
router.post('/cube/:id/follow', followCube);
router.post('/cube/:id/format', addFormat);
router.delete('/cube/:id/format/:index', deleteFormat);
router.post('/cube/:id/import/cubetutor', importFromCubeTutor);
router.post('/cube/:id/import/file', importFromFile);
router.post('/cube/:id/import/file/replace', replaceFromFile);
router.post('/cube/:id/import/paste', importFromPaste);
router.get('/cube/:id/list', viewCubeList);
router.get('/cube/:id/maybe', getMaybeboard);
router.put('/cube/:id/maybe', updateMaybeboard);
router.put('/cube/:id/maybe/:cardid', updateMaybeboardCard);
router.get('/cube/:id/overview', viewOverview);
router.put('/cube/:id/overview', editCubeOverview);
router.get('/cube/:id/playtest', viewPlaytest);
router.post('/cube/:id/playtest/deck/import/plaintext', uploadDeckList);
router.get('/cube/:id/playtest/decks/:page', viewCubeDecks);
router.post('/cube/:id/playtest/draft', startDraft);
router.post('/cube/:id/playtest/griddraft', startGridDraft);
router.get('/cube/:id/playtest/p1p1', addSeedToP1P1);
router.get('/cube/:id/playtest/p1p1/:seed', generateP1P1);
router.get('/cube/:id/playtest/sample', redirectToSamplePackWithSeed);
router.get('/cube/:id/playtest/sample/:seed', viewSamplePack);
router.get('/cube/:id/playtest/sample/:seed/image', viewSamplePackImage);
router.get('/cube/:id/playtst/decks', redirectToFirstPageOfCubeDecks);
router.get('/cube/:id/recommend', getRecommendations);
router.post('/cube/:id/resize/:size', resizeCube);
router.get('/cube/:id/rss', getRss);
router.put('/cube/:id/settings', updateCubeSettings);
router.put('/cube/:id/sorts', updateCubeSorts);
router.get('/cube/:id/tags/colors', getTagColors);
router.put('/cube/:id/tags/colors', updateTagColors);
router.get('/cubes/explore', exploreCubes);
router.get('/cubes/random', showRandomCube);
router.get('/cubes/search', viewSearchPage);
router.get('/cubes/search/:query/:page', searchResultsPage);
router.get('/dashboard', viewDashboard);
router.get('/dashboard/decks/:page', getDashboardDecks);
router.delete('/deck/:id', deleteDeck);
router.get('/deck/:id', viewDeck);
router.post('/deck/:id', updateDeck);
router.get('/deck/:id/build', viewDeckbuilder);
router.get('/deck/:id/export/:seat/arena', exportDeckToArena);
router.get('/deck/:id/export/:seat/cockatrice', exportDeckToCockatrice);
router.get('/deck/:id/export/:seat/forge', exportDeckToForge);
router.get('/deck/:id/export/:seat/mtgo', exportDeckToMtgo);
router.get('/deck/:id/export/:seat/plaintext', exportDeckToPlaintext);
router.get('/deck/:id/export/:seat/xmage', exportDeckToXmage);
// TODO: Update client code to post to rebuild.
router.post('/deck/:id/rebuild/:index', rebuildDeck);
router.get('/deck/:id/redraft/:seat', redraftDeck);
router.get('/dev/blog', redirectToFirstDevBlogPage);
router.post('/dev/blog', postToDevBlog);
router.get('/dev/blog/:id', browseDevBlog);
router.get('/draft/:id', getDraftPage);
router.put('/draft/:id', saveDraft);
router.post('/draft/:id/:seat/redraft', redraftDraft);
router.post('/draft/:id/submit/:seat', submitDraft);
router.get('/griddraft/:id', getGridDraftPage);
router.put('/griddraft/:id', saveGridDraft);
router.post('/griddraft/:id/submit', submitGridDraft);
router.get('/faq', viewFaq);
router.get('/filters', viewFiltersPage);
router.post('/integrations/draftlog', importDraftLog);
router.get('/landing', viewLanding);
router.get('/leave', showLeavePage);
router.get('/login', viewLoginPage);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/lostpassword', viewLostPasswordPage);
router.post('/lostpassword', submitLostPassword);
router.post('/lostpassword/reset', resetPassword);
router.get('/markdown', viewMarkdownPage);
router.get('/ourstory', viewStoryPage);
router.post('/package', submitPackage);
router.delete('/package/:id', deletePackage);
router.get('/package/:id', viewPackage);
router.delete('/package/:id/approve', unapprovePackage);
router.post('/package/:id/approve', approvePackage);
router.delete('/package/:id/vote', downvotePackage);
router.post('/package/:id/vote', upvotePackage);
router.get('/packages/all/:page/:sort/:direction', getAllPackages);
router.get('/packages/approved/:page/:sort/:direction', getApprovedPackages);
router.get('/packages/pending/:page/:sort/:direction', getPendingPackages);
router.get('/privacy', viewPrivacyPolicy);
router.get('/packages', browsePackages);
router.get('/tos', viewTos);
router.post('/user', createUser);
router.get('/user', viewRegisterPage);
router.get('/user/:userid', viewUserPage);
router.post('/user/:userid', updateUserInfo);
router.get('/user/:userid/account', viewAccountPage);
router.get('/user/:user/articles/:page', getJsonUserArticles);
router.get('/user/:userid/blog', redirectToFirstPageOfUserBlogPosts);
router.get('/user/:userid/blog/:page', viewUserBlog);
router.get('/user/:userid/confirm', confirmUser);
router.get('/user/:userid/cubes', getUserCubes);
router.get('/user/:userid/decks', redirectToFirstPageOfUserDecks);
router.get('/user/:userid/decks/:page', viewUserDecks);
router.post('/user/:userid/display', updateDisplaySettings);
router.post('/user/:userid/email', updateEmail);
router.get('/user/:userid/feeditems/:skip', getFeedItems);
router.delete('/user/:userid/follow', unfollowUser);
router.put('/user/:userid/follow', followUser);
router.get('/user/:userid/notification/:index', viewNotification);
router.delete('/user/:userid/notifications', clearNotifications);
router.get('/user/:userid/notifications', viewNotifications);
router.get('/user/:userid/packages/:page/:sort/:direction', getUserPackages);
router.post('/user/:userid/password', changePassword);
router.get('/user/:userid/password/reset', viewResetPassword);
router.get('/user/:user/podcasts/:page', getJsonUserPodcasts);
router.put('/user/:userid/showtagcolors', saveShowTagColors);
router.get('/user/:userid/social', viewSocialPage);
router.get('/user/:user/videos/:page', getJsonUserVideos);
router.get('/version', getVersion);

export default router;
