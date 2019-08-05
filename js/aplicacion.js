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
            let timerInterval
            Swal.fire({
              type: 'success',
              title: 'Registrado en la lista!',
              html: 'Se aviso se cierra en: <strong></strong> segundos.',
              timer: 3000,
              onBeforeOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {
                  Swal.getContent().querySelector('strong')
                    .textContent = Swal.getTimerLeft()
                }, 100)
              },
              onClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              if (
                // Read more about handling dismissals
                result.dismiss === Swal.DismissReason.timer
              ) {
                console.log('I was closed by the timer')
              }
            })
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
