const diasSemana = [

    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'

];

const meses = [

    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'

];

const espacios = document.querySelectorAll( '.count-content span' );
const mostrarFecha = document.querySelector( '.future-date h1' );
const espaciosContainer = document.querySelector( '.counters' );
const fechaActual = new Date();
const fechaFutura = new Date( 2022, 04, 20 );


//Mostrando la fecha en el h1
let yearMuestra = fechaFutura.getFullYear();
let mesMuestra = meses[ fechaFutura.getMonth() ];
let diaSemMuestra = diasSemana[ fechaFutura.getDay() ];
let diaMuestra = fechaFutura.getDate();
mostrarFecha.textContent = `Lanzamiento: ${diaSemMuestra} ${diaMuestra} de ${mesMuestra} del ${yearMuestra}`;


function timerCountDown(){

    const momentoActual = new Date(); //Declarada aquí para que se obtenga la fecha exacta en términos de minutos y segundos
    let final = fechaFutura - momentoActual; //obteniendo fecha final en milisegundos

    if( final < 0 ){ //verificando si aún queda tiempo entre las dos fechas, si no es así, se detiene el intervalo, se muestra un mensaje de terminación y se detiene la ejecución de la función

        clearInterval(countDown); //limpiando el intervalor, deteniendo su ejecución
        espaciosContainer.innerHTML = '<h3 class="terminado text-center">El tiempo para el lanzamiento ha sido consumido, en breve se mostrarán los cambios</h3> '; //Mensaje de terminación de plazo

        return; //terminando la ejecución de la función

    }

    //Magnitudes de conversión
    let unDia = 24 * 60 * 60 * 1000; //Un día = 24horas x 60minutos X 60Segundos x 1000milisegundos
    let unaHora =  60 * 60 * 1000;
    let unMinuto = 60 * 1000;
    let unSegundo = 1000;
    
    //Calculando tiempos reales restantes
    let diasFinal = Math.floor( final / unDia ); //Convirtiendo el tiempo restante en días
    let horasFinal = Math.floor( ( final % unDia ) / unaHora ); //Tiempo restante en dias, residuo es horas
    let minutosFinal = Math.floor( ( final % unaHora ) / unMinuto );
    let segundosFinal = Math.floor( ( final % unMinuto ) / unSegundo );
    
    const fechaVista = [ diasFinal, horasFinal, minutosFinal, segundosFinal ];

    //Estableciendo los respectivos valores de tiempo en los elementos seleccionados
    espacios.forEach( (elemento, index) => {

        elemento.textContent = formatoEspacios( fechaVista[index] ); //pasando al HTML los valores de actualización de fecha

    } );

}

function formatoEspacios( tiempo ){

    if( tiempo < 10 ){ //si el valor es de un solo digito
        return `0${tiempo}`; //regresar el valor con un cero a su izquierda
    } else {
        return tiempo;
    }

}


//Creando el intervalo, invocando función
let countDown = setInterval( timerCountDown, 1000 ); //activa el intervalo, definido de esta forma para poder limpiar el intervalo una vez se termine el conteo
timerCountDown(); //lanzando la función en cuanto carga el dom, ya que los intervalos siempre se ejecutan al final, así se evita la visualización de "espacios" como elementos vacíos

