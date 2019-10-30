const { google } = require('googleapis');
const avatarsStorage = require('./storages/avatarsStorage');
const articlesImagesStorage = require('./storages/articlesImagesStorage');

const youtubeApi = google.youtube({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY
});

module.exports = {
  async getYoutubeVideo(url) {
    videoId = url.split('v=')[1];
    const result = await youtubeApi.videos.list({
      id: videoId,
      part: 'player, snippet, contentDetails'
    });
    const videoData = result.data.items[0];
    return {
      title: videoData.snippet.title,
      headline: '',
      description: videoData.snippet.description,
      training: {
        id: '',
        title: ''
      },
      thumbnails: videoData.snippet.thumbnails,
      video: {
        youtubeId: videoId,
        publishedAt: videoData.snippet.publishedAt,
        duration: videoData.contentDetails.duration
      }
    }
  },
  async getYoutubePlaylist(url) {
    playlistId = url.split('list=')[1];
    const result = await youtubeApi.playlistItems.list({
      playlistId: playlistId,
      part: 'snippet, contentDetails',
      maxResults: 50
    });
    const playlistData = result.data.items;
    return playlistData.map(item => {
      return {
        title: item.snippet.title,
        headline: '',
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        video: {
          youtubeId: item.contentDetails.videoId,
          publishedAt: item.contentDetails.videoPublishedAt,
          duration: ''
        }
      }
    });
  },
  avatarsStorage,
  articlesImagesStorage
};

