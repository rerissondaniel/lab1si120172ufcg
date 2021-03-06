angular.module("labsi").controller("ShowArtistCtrl",
    ["$stateParams", "UserArtistsService", function ($stateParams, userArtistsService) {

        const self = this;

        const _artistName = $stateParams.name;

        userArtistsService.getByName(_artistName).then((response) => {
            self.userArtist = response.data;
            self.musics = [];
            self.userArtist.artist.albuns.forEach(elem => {
                elem.musics.forEach(music => self.musics.push(music));
            });
        }).catch(() => {
            self.responseError = 'Erro na comunicação com o servidor';
        });

        self.update = function (userArtist) {
            userArtistsService.update(userArtist).then(() => {
                self.responseError = null;
                self.responseSuccess = 'Preferências salvas';
            }).catch(() => {
                self.responseSuccess = null;
                self.responseError = 'Erro na comunicação com o servidor';
            });
        }
    }]);