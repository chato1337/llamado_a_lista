var app = new Vue({
    el: '#app',
    data: {
        listado: [],
        estudiante: 'sin definir',

    },
    methods: {
        pasarLista: function(){
            var fecha = new Date();
            var fecha_actual = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
            var hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
            this.listado.push({estudiante:this.estudiante, fecha:fecha_actual, hora:hora});
            this.estudiante = 'sin definir';
            console.log(fecha_actual);
            console.log(hora);
        },
        llamarLista: function(){
          let me = this;
          let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
          scanner.addListener('scan', function (content) {
            //aqui sucede la magia cuando detecta el qr
            console.log(content);
            // var numero = parseInt(content);
            me.estudiante = content;
            me.pasarLista();
          });
          Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
              scanner.start(cameras[0]);
            } else {
              console.error('No cameras found.');
            }
          }).catch(function (e) {
            console.error(e);
          });
        }
    },
    mounted() {
      this.llamarLista();
    }
})
