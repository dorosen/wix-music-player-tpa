
var player = {
    init: function(display_type) {
        var playlist_array = getFromLocalStorage('playlist');
        var jplayer_playlist = player.generatePlaylistForjPlayer(playlist_array);
        player.buildMusicPlayer(jplayer_playlist, display_type);
    },
    generatePlaylistForjPlayer: function(playlist) {

        var j_playlist = [];
        var song = {};
        var this_song = {};

        var playlist_len = playlist.length;

        for ( var i = 0; i < playlist_len; i++ ) {
            this_song = playlist[i];

            song = {
                title: this_song.song_name,
                mp3: this_song.song_file
            };

            j_playlist.push(song);
        }

        return j_playlist;

    },
    buildMusicPlayer: function (playlist, display_type) {
        var css = {
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        };

        var options = {
            playlistOptions: {
                enableRemoveControls: false
            },
            supplied: "mp3, oga",
            smoothPlayBar: true,
            keyEnabled: true,
            audioFullScreen: true,
            ready: function() {
                if( display_type === 'editor' ) {
                    console.log("In Editor Mode");
                    addEditButtons( getFromLocalStorage('playlist') );
                }
                else {
                    addBuyButtons( getFromLocalStorage('playlist') );
                }
            }
        };
        new jPlayerPlaylist(css, playlist, options);
    },
    testSavePlaylistToLocalStorage: function(playlist_obj) {
        sessionStorage.setItem('music_player_tpa_playlist', JSON.stringify(playlist_obj));
    },
    testSaveSettingsToLocalStorage: function(settings_obj) {
        sessionStorage.setItem('music_player_tpa_settings', JSON.stringify(settings_obj));
    }



};