var mvvm = new Mvvm({
    el: '#app',
    data: { 
        song: '发如雪',
        album: {
            name: '十一月的萧邦',
            theme: '夜曲'
        },
        singer: '周杰伦'
    },
    computed: {
        primeMusic: function() {
            return this.album.theme + ', ' + this.song + ' etc'
        }
    }
});